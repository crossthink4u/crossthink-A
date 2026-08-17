import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Notifies a project owner by email that someone applied.
// Called (fire-and-forget) right after an application row is inserted.
//
// The endpoint is public — applicants may be anonymous — so it never trusts the
// request body for email content: it re-reads the application row from the DB
// with the service role and mails whatever is actually stored there. Spamming an
// owner therefore requires really inserting an application, which RLS governs.

export async function POST(request: Request) {
  const { projectId, email } = await request.json().catch(() => ({}));

  if (typeof projectId !== 'string' || typeof email !== 'string') {
    return NextResponse.json({ error: 'projectId and email are required' }, { status: 400 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!serviceKey || !resendKey) {
    console.warn('[notify] SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY not set — skipping email');
    return NextResponse.json({ skipped: 'not configured' });
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

  if (!app) return NextResponse.json({ error: 'application not found' }, { status: 404 });

  const { data: project } = await admin
    .from('projects')
    .select('title, owner_id')
    .eq('id', projectId)
    .maybeSingle();

  if (!project) return NextResponse.json({ error: 'project not found' }, { status: 404 });

  const { data: owner } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('id', project.owner_id)
    .maybeSingle();

  if (!owner?.email) {
    console.warn(`[notify] project ${projectId} owner has no email on file`);
    return NextResponse.json({ skipped: 'owner has no email' });
  }

  const origin = new URL(request.url).origin;
  const workspaceUrl = `${origin}/workspace/${projectId}`;
  const row = (label: string, value?: string | null) =>
    value ? `<tr><td style="padding:4px 12px 4px 0;color:#8b8b96">${label}</td><td style="padding:4px 0;color:#e7e7ee">${escapeHtml(value)}</td></tr>` : '';

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#0b0b0d;padding:32px">
      <div style="max-width:560px;margin:0 auto;background:#121216;border:1px solid #23232b;border-radius:16px;padding:28px">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a855f7">New application</p>
        <h1 style="margin:0 0 16px;font-size:20px;color:#fff">${escapeHtml(app.name)} applied to ${escapeHtml(project.title)}</h1>
        <table style="border-collapse:collapse;font-size:14px;margin-bottom:24px">
          ${row('Email', app.email)}
          ${row('Role', app.role)}
          ${row('Major', app.major)}
          ${row('Tech stack', app.tech_stack)}
          ${row('Motivation', app.motivation)}
        </table>
        <a href="${workspaceUrl}" style="display:inline-block;background:#8b5cf6;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:10px">
          Review in workspace
        </a>
        <p style="margin:24px 0 0;font-size:12px;color:#6b6b78">CrossThink: by Iris</p>
      </div>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // ponytail: Resend's shared sender works without a verified domain — swap for
      // your own address once the domain is set up in Resend
      from: process.env.MAIL_FROM || 'CrossThink <onboarding@resend.dev>',
      to: owner.email,
      reply_to: app.email,
      subject: `New application for ${project.title} — ${app.name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('[notify] resend failed', res.status, detail);
    return NextResponse.json({ error: 'send failed', detail }, { status: 502 });
  }

  return NextResponse.json({ sent: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
