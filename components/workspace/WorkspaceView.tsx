'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Hexagon, Users, ChevronDown, ChevronUp,
  Github, Linkedin, Globe, CheckCircle2, XCircle, Clock,
  Briefcase, Mail, GraduationCap, Loader2, ShieldAlert,
  FolderOpen, FileText, Plus, Trash2, Save, Upload, Image as ImageIcon,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DbProject, DbApplication, DbProjectMember } from '@/types/database';

// ─── helpers ─────────────────────────────────────────────────────────────────

const statusMeta = {
  pending:  { label: 'Pending',  cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  approved: { label: 'Approved', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  rejected: { label: 'Rejected', cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

const inputProps = {
  className: 'w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40 transition-all disabled:opacity-60',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-400 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Section({ title, hint, action, children }: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {hint && <p className="text-xs text-gray-600 mt-0.5">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

// ─── Application card ────────────────────────────────────────────────────────

function ApplicationCard({
  app, isOwner, onApprove, onReject, actionLoading,
}: {
  app: DbApplication;
  isOwner: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  actionLoading: string | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = statusMeta[app.status as keyof typeof statusMeta] ?? statusMeta.pending;
  const busy = actionLoading === app.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/[0.07] bg-[#0d0d0d] overflow-hidden"
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {initials(app.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{app.name}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${meta.cls}`}>{meta.label}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>
            {app.role && <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{app.role}</span>}
            {app.major && <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{app.major}</span>}
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fmtDate(app.created_at)}</span>
          </div>
          {app.tech_stack && (
            <div className="flex flex-wrap gap-1 mt-2">
              {app.tech_stack.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-500 border border-white/[0.06]">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.04]"
          >
            Details {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isOwner && app.status === 'pending' && (
            <>
              <button
                onClick={() => onReject(app.id)}
                disabled={busy}
                className="flex items-center gap-1 text-xs font-medium text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-500/20 hover:bg-rose-500/10 transition-all disabled:opacity-40"
              >
                {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                Reject
              </button>
              <button
                onClick={() => onApprove(app.id)}
                disabled={busy}
                className="flex items-center gap-1 text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-all disabled:opacity-40"
              >
                {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                Approve
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-white/[0.05] space-y-3">
              <div className="flex flex-wrap gap-3 pt-3">
                {app.github && (
                  <a href={app.github.startsWith('http') ? app.github : `https://${app.github}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Github className="w-3.5 h-3.5" /> {app.github}
                  </a>
                )}
                {app.linkedin && (
                  <a href={app.linkedin.startsWith('http') ? app.linkedin : `https://${app.linkedin}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" /> {app.linkedin}
                  </a>
                )}
                {app.portfolio && (
                  <a href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                    <Globe className="w-3.5 h-3.5" /> {app.portfolio}
                  </a>
                )}
              </div>
              {app.prev_projects && (
                <div>
                  <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1">Previous Projects</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{app.prev_projects}</p>
                </div>
              )}
              {app.motivation && (
                <div>
                  <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1">Why this project?</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{app.motivation}</p>
                </div>
              )}
              {!app.applicant_user_id && app.status === 'approved' && (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/[0.06] border border-amber-500/15">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-400">Applicant applied without an account. They&apos;ll get member access once they register with <strong>{app.email}</strong>.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Member card ─────────────────────────────────────────────────────────────

function MemberCard({ member }: { member: DbProjectMember }) {
  const name = member.profiles?.full_name || 'Member';
  const email = member.profiles?.email || '';
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-white/[0.07]">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        {initials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white truncate">{name}</p>
        {member.role && <p className="text-xs text-purple-400">{member.role}</p>}
        {email && <p className="text-xs text-gray-600 truncate">{email}</p>}
      </div>
      <span className="text-[10px] text-gray-600">{fmtDate(member.created_at)}</span>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

type Tab = 'listing' | 'applications' | 'team';
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';
type OpenRole = { title: string; skills: string[]; count: number };

export default function WorkspaceView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<DbProject | null>(null);
  const [applications, setApplications] = useState<DbApplication[]>([]);
  const [members, setMembers] = useState<DbProjectMember[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [tab, setTab] = useState<Tab>('listing');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [form, setForm] = useState<DbProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  const loadApplications = useCallback(async () => {
    const { data } = await supabase
      .from('applications')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    setApplications((data as DbApplication[]) ?? []);
  }, [projectId]);

  const loadMembers = useCallback(async () => {
    const { data } = await supabase
      .from('project_members')
      .select('*, profiles(*)')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });
    setMembers((data as DbProjectMember[]) ?? []);
  }, [projectId]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/login?redirectTo=/workspace/${projectId}`); return; }
      setUser(user);

      const { data: proj, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error || !proj) { setAccessDenied(true); setLoading(false); return; }
      setProject(proj as DbProject);
      setForm(proj as DbProject);

      const owner = proj.owner_id === user.id;
      setIsOwner(owner);

      const { data: membership } = await supabase
        .from('project_members')
        .select('id')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .maybeSingle();

      let member = !!membership;

      if (!owner && !member) {
        const { data: matchedApp } = await supabase
          .from('applications')
          .select('id, role')
          .eq('project_id', projectId)
          .eq('email', user.email!)
          .eq('status', 'approved')
          .maybeSingle();

        if (matchedApp) {
          await supabase.from('project_members').upsert({
            project_id: projectId,
            user_id: user.id,
            application_id: matchedApp.id,
            role: matchedApp.role,
          });
          await supabase.from('applications').update({ applicant_user_id: user.id }).eq('id', matchedApp.id);
          member = true;
        }
      }

      if (!owner && !member) { setAccessDenied(true); setLoading(false); return; }

      if (owner) await loadApplications();
      await loadMembers();
      setLoading(false);
    };

    init();
  }, [projectId]);

  const handleApprove = async (appId: string) => {
    setActionLoading(appId);
    const app = applications.find((a) => a.id === appId);
    if (!app) { setActionLoading(null); return; }

    await supabase.from('applications').update({ status: 'approved' }).eq('id', appId);

    if (app.applicant_user_id) {
      await supabase.from('project_members').upsert({
        project_id: projectId,
        user_id: app.applicant_user_id,
        application_id: appId,
        role: app.role,
      });
      await loadMembers();
    }

    await loadApplications();
    setActionLoading(null);
  };

  const handleReject = async (appId: string) => {
    setActionLoading(appId);
    await supabase.from('applications').update({ status: 'rejected' }).eq('id', appId);
    await loadApplications();
    setActionLoading(null);
  };

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !user) return;

    setUploading(true);
    setSaveMsg(null);
    const path = `${user.id}/${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('project-images').upload(path, file, { upsert: true });
    setUploading(false);

    if (error) { setSaveMsg(error.message); return; }
    patch({ image_url: supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl });
  };

  const saveListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaveMsg(null);

    const { error } = await supabase
      .from('projects')
      .update({
        title: form.title.trim(),
        dept: form.dept?.trim() || null,
        description: form.description?.trim() || null,
        tech: form.tech,
        open_roles: form.open_roles.filter((r) => r.title.trim()),
        image_url: form.image_url?.trim() || null,
        difficulty: form.difficulty,
        duration: form.duration?.trim() || null,
        deadline: form.deadline?.trim() || null,
        team_size_capacity: form.team_size_capacity,
        is_public: form.is_public,
      })
      .eq('id', projectId);

    setSaving(false);
    if (error) { setSaveMsg(error.message); return; }
    setProject(form);
    setSaveMsg('Saved');
    setTimeout(() => setSaveMsg(null), 2500);
  };

  const deleteProject = async () => {
    setDeleting(true);
    setSaveMsg(null);

    // applications carry project_id as plain text with no FK, so nothing cascades
    // them — clear them first (needs the owner-delete policy from the migration).
    await supabase.from('applications').delete().eq('project_id', projectId);

    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    if (error) {
      setDeleting(false);
      setConfirmDelete(false);
      setSaveMsg(error.message);
      return;
    }
    router.push('/feed');
  };

  const patch = (p: Partial<DbProject>) => setForm((f) => (f ? { ...f, ...p } : f));

  const patchRole = (i: number, r: Partial<OpenRole>) =>
    patch({ open_roles: form!.open_roles.map((role, j) => (j === i ? { ...role, ...r } : role)) });

  // ── loading / access ────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (accessDenied || !project) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 px-4">
        <ShieldAlert className="w-12 h-12 text-rose-400" />
        <h1 className="text-xl font-bold">Access denied</h1>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          This workspace is only accessible to the project owner and approved members.
        </p>
        <button onClick={() => router.push('/feed')} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Feed
        </button>
      </div>
    );
  }

  // ── derived ─────────────────────────────────────────────────

  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const filteredApps = statusFilter === 'all'
    ? applications
    : applications.filter((a) => a.status === statusFilter);

  const statusCounts = {
    all:      applications.length,
    pending:  applications.filter((a) => a.status === 'pending').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const allTabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'listing', label: 'Project Listing', icon: FileText },
    ...(isOwner ? [{ id: 'applications' as Tab, label: 'Applications', icon: FolderOpen, count: pendingCount }] : []),
    { id: 'team',    label: 'Team',            icon: Users, count: members.length },
  ];

  // ── render ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button onClick={() => router.push('/feed')} className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button onClick={() => router.push('/')} className="flex items-center gap-2 flex-shrink-0">
            <Hexagon className="w-5 h-5 text-purple-400" fill="currentColor" fillOpacity={0.12} />
            <span className="font-display font-bold text-sm text-white hidden sm:block">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>

          <div className="w-px h-5 bg-white/[0.08] flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate">{project.title} Workspace</h1>
            {project.dept && <p className="text-xs text-gray-600 hidden sm:block">{project.dept}</p>}
          </div>

          <span className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
            isOwner
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
          }`}>
            {isOwner ? 'Owner' : 'Member'}
          </span>
        </div>
      </header>

      {/* Tab bar */}
      <div className="border-b border-white/[0.06] bg-[#080808]/60 backdrop-blur-sm sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide p-1 bg-transparent">
            {allTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-violet-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
                {typeof t.count === 'number' && t.count > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    t.id === 'applications' && t.count > 0
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-white/[0.08] text-gray-400'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Project Listing ────────────────────────────────────── */}
        {tab === 'listing' && form && (
          <motion.form
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={saveListing}
            className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6"
          >
            {/* Cover */}
            <input ref={coverRef} type="file" accept="image/*" onChange={uploadCover} className="hidden" />
            <div className="relative h-56 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d0d] group">
              {form.image_url ? (
                <img src={form.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center bg-[radial-gradient(120%_120%_at_20%_0%,#a855f7_0%,transparent_55%)] opacity-30">
                  <ImageIcon className="w-9 h-9 text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-1">
                    {form.dept || 'Project'}
                  </p>
                  <p className="font-display font-semibold text-xl text-white truncate">{form.title || 'Untitled project'}</p>
                </div>

                {isOwner && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {form.image_url && (
                      <button type="button" onClick={() => patch({ image_url: null })}
                        className="p-2 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:text-rose-400 backdrop-blur-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button type="button" onClick={() => coverRef.current?.click()} disabled={uploading}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-black/60 border border-white/10 text-white hover:bg-black/80 backdrop-blur-md transition-colors disabled:opacity-60">
                      {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      {form.image_url ? 'Change cover' : 'Upload cover'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isOwner && (
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Only the project owner can edit this listing.
              </p>
            )}

            {/* Basics */}
            <Section title="Basics" hint="How the project reads on its card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title">
                  <input {...inputProps} value={form.title} required disabled={!isOwner}
                    onChange={(e) => patch({ title: e.target.value })} />
                </Field>
                <Field label="Department / Focus area">
                  <input {...inputProps} value={form.dept ?? ''} disabled={!isOwner}
                    onChange={(e) => patch({ dept: e.target.value })} />
                </Field>
              </div>

              <Field label="Description">
                <textarea {...inputProps} rows={4} value={form.description ?? ''} disabled={!isOwner}
                  onChange={(e) => patch({ description: e.target.value })} />
              </Field>

              <Field label="Tech stack (comma-separated)">
                <input {...inputProps} value={form.tech.join(', ')} disabled={!isOwner}
                  onChange={(e) => patch({ tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
              </Field>

              {form.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-gray-400 font-medium">{t}</span>
                  ))}
                </div>
              )}
            </Section>

            {/* Details */}
            <Section title="Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Field label="Difficulty">
                  <select {...inputProps} value={form.difficulty} disabled={!isOwner}
                    onChange={(e) => patch({ difficulty: e.target.value })}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </Field>
                <Field label="Duration">
                  <input {...inputProps} value={form.duration ?? ''} placeholder="e.g. 3 months" disabled={!isOwner}
                    onChange={(e) => patch({ duration: e.target.value })} />
                </Field>
                <Field label="Deadline">
                  <input {...inputProps} value={form.deadline ?? ''} placeholder="e.g. June 30, 2026" disabled={!isOwner}
                    onChange={(e) => patch({ deadline: e.target.value })} />
                </Field>
                <Field label="Team size">
                  <input {...inputProps} type="number" min={1} value={form.team_size_capacity} disabled={!isOwner}
                    onChange={(e) => patch({ team_size_capacity: Number(e.target.value) || 1 })} />
                </Field>
              </div>
            </Section>

            {/* Open roles */}
            <Section
              title="Open roles"
              hint="What the “N open” badge counts"
              action={isOwner && (
                <button type="button"
                  onClick={() => patch({ open_roles: [...form.open_roles, { title: '', skills: [], count: 1 }] })}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add role
                </button>
              )}
            >
              {form.open_roles.length === 0 ? (
                <p className="text-xs text-gray-600 rounded-xl border border-dashed border-white/[0.08] px-4 py-6 text-center">
                  No roles listed — the card shows team size instead.
                </p>
              ) : (
                <div className="space-y-2">
                  {form.open_roles.map((role, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-2 rounded-xl border border-white/[0.07] bg-[#0a0a0a] p-3">
                      <input {...inputProps} className={`${inputProps.className} flex-1`} placeholder="Role title"
                        value={role.title} disabled={!isOwner}
                        onChange={(e) => patchRole(i, { title: e.target.value })} />
                      <input {...inputProps} className={`${inputProps.className} flex-1`} placeholder="Skills (comma-separated)"
                        value={role.skills.join(', ')} disabled={!isOwner}
                        onChange={(e) => patchRole(i, { skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
                      <input {...inputProps} className={`${inputProps.className} sm:w-20`} type="number" min={1}
                        value={role.count} disabled={!isOwner}
                        onChange={(e) => patchRole(i, { count: Number(e.target.value) || 1 })} />
                      {isOwner && (
                        <button type="button" onClick={() => patch({ open_roles: form.open_roles.filter((_, j) => j !== i) })}
                          className="p-2 rounded-lg text-gray-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* Visibility */}
            <Section title="Visibility">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_public} disabled={!isOwner}
                  onChange={(e) => patch({ is_public: e.target.checked })}
                  className="w-4 h-4 mt-0.5 accent-purple-500" />
                <span>
                  <span className="block text-sm text-white">Public listing</span>
                  <span className="block text-xs text-gray-600">Show this project on the home page so people can apply.</span>
                </span>
              </label>
            </Section>

            {/* Danger zone */}
            {isOwner && (
              <section className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-5">
                <h3 className="text-sm font-semibold text-white mb-0.5">Delete this project</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Removes the listing from the site along with its applications and team. This can&apos;t be undone.
                </p>

                {confirmDelete ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-rose-300">Delete &ldquo;{project.title}&rdquo; permanently?</span>
                    <button type="button" onClick={deleteProject} disabled={deleting}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 transition-colors">
                      {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Yes, delete it
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-colors">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-rose-400 border border-rose-500/25 hover:bg-rose-500/10 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete project
                  </button>
                )}
              </section>
            )}

            {isOwner && (
              <div className="sticky bottom-0 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-[#080808]/90 backdrop-blur-xl border-t border-white/[0.06] flex items-center gap-3">
                <button type="submit" disabled={saving || uploading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white text-sm font-semibold shadow-[0_0_24px_rgba(168,85,247,0.35)] disabled:opacity-50 transition-all">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save changes
                </button>
                <button type="button" onClick={() => setForm(project)}
                  className="px-4 py-2.5 rounded-xl border border-white/[0.10] text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                  Reset
                </button>
                {saveMsg && (
                  <span className={`text-xs ${saveMsg === 'Saved' ? 'text-emerald-400' : 'text-rose-400'}`}>{saveMsg}</span>
                )}
              </div>
            )}
          </motion.form>
        )}

        {/* ── Applications Tab (owner only) ──────────────────────── */}
        {tab === 'applications' && isOwner && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    statusFilter === s
                      ? 'bg-white/[0.08] border-white/[0.16] text-white'
                      : 'border-white/[0.08] text-gray-500 hover:text-gray-300 hover:border-white/[0.12]'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  <span className="text-[10px] font-bold">{statusCounts[s]}</span>
                </button>
              ))}
            </div>

            {filteredApps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-white/[0.08]">
                <FolderOpen className="w-10 h-10 text-gray-700 mb-3" />
                <p className="text-sm text-gray-500">No {statusFilter === 'all' ? '' : statusFilter} applications yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {filteredApps.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      app={app}
                      isOwner={isOwner}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      actionLoading={actionLoading}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Team Tab ────────────────────────────────────────────── */}
        {tab === 'team' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-purple-500/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {user ? initials(user.user_metadata?.full_name || user.email || 'O') : 'O'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.user_metadata?.full_name || user?.email}
                  </p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Owner</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>

            {members.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-dashed border-white/[0.08] mt-4">
                <Users className="w-10 h-10 text-gray-700 mb-3" />
                <p className="text-sm text-gray-500 mb-1">No members yet</p>
                <p className="text-xs text-gray-700">
                  {isOwner ? 'Approve applications to add team members.' : 'Team members will appear here once approved.'}
                </p>
              </div>
            ) : (
              members.map((m) => <MemberCard key={m.id} member={m} />)
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
