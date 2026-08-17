import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { renderApplicationEmail } from '@/lib/email/applicationNotification';

// Notifies a project owner by email that someone applied.
// Called (fire-and-forget) right after an application row is inserted.
//
// The endpoint is public — applicants may be anonymous — so it never trusts the
// request body for email content: it re-reads the application row from the DB
// with the service role and mails whatever is actually stored there. Spamming an
// owner therefore requires really inserting an application, which RLS governs.
//
// It also answers uniformly ({ ok: true }) whatever happens. The service role can
// read every row here, so a response that distinguished "application found" from
// "not found" would let anyone probe whether a given person applied to a given
// project. Real outcomes go to the server log only.

export async function POST(request: Request) {
  const { projectId, email } = await request.json().catch(() => ({}));

  if (typeof projectId !== 'string' || typeof email !== 'string') {
    return NextResponse.json({ error: 'projectId and email are required' }, { status: 400 });
  }

  const ok = () => NextResponse.json({ ok: true });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!serviceKey || !resendKey) {
    console.warn('[notify] SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY not set — skipping email');
    return ok();
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { persistSession: false },
  });

  // the application as actually stored — not what the caller claims
  const { data: app } = await admin
    .from('applications')
    .select('name, email, role, major, tech_stack, motivation, created_at')
    .eq('project_id', projectId)
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!app) {
    console.warn(`[notify] no application for project ${projectId}`);
    return ok();
  }

  const { data: project } = await admin
    .from('projects')
    .select('title, owner_id')
    .eq('id', projectId)
    .maybeSingle();

  if (!project) {
    console.warn(`[notify] project ${projectId} not found`);
    return ok();
  }

  const { data: owner } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('id', project.owner_id)
    .maybeSingle();

  if (!owner?.email) {
    console.warn(`[notify] project ${projectId} owner has no email on file`);
    return ok();
  }

  const origin = new URL(request.url).origin;
  const workspaceUrl = `${origin}/workspace/${projectId}`;

  const html = renderApplicationEmail({
    projectTitle: project.title,
    workspaceUrl,
    applicantName: app.name,
    ownerName: owner.full_name,
    fields: [
      ['Email', app.email],
      ['Applying for', app.role],
      ['Major', app.major],
      ['Skills', app.tech_stack],
    ],
    motivation: app.motivation,
  });

  const text = [
    `${app.name} applied to ${project.title}.`,
    '',
    `Email: ${app.email}`,
    app.role ? `Applying for: ${app.role}` : null,
    app.major ? `Major: ${app.major}` : null,
    app.tech_stack ? `Skills: ${app.tech_stack}` : null,
    app.motivation ? `\nWhy they want in:\n${app.motivation}` : null,
    '',
    `Review and approve: ${workspaceUrl}`,
    '',
    'CrossThink: by Iris',
  ].filter((l) => l !== null).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // ponytail: Resend's shared sender works without a verified domain — swap for
      // your own address once the domain is set up in Resend
      from: process.env.MAIL_FROM || 'CrossThink <onboarding@resend.dev>',
      to: owner.email,
      reply_to: app.email,
      subject: `${app.name} applied to ${project.title}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    // never echo the upstream body back to a public caller
    console.error('[notify] resend failed', res.status, await res.text());
    return ok();
  }

  return ok();
}
