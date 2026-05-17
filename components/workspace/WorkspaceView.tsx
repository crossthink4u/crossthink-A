'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DragDropContext, Droppable, Draggable,
} from '@hello-pangea/dnd';
import {
  ArrowLeft, Hexagon, Users, Code2, ChevronDown, ChevronUp,
  Github, Linkedin, Globe, CheckCircle2, XCircle, Clock,
  Briefcase, Mail, GraduationCap, Loader2, ShieldAlert,
  FolderOpen, Layout, MessageCircle, FileText, Plus,
  MoreHorizontal, MessageSquare, Paperclip, X,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useDashboard } from '@/context/DashboardContext';
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

// ─── Priority badge ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    High:   'bg-red-900/30 text-red-400',
    Medium: 'bg-amber-900/30 text-amber-400',
    Low:    'bg-green-900/30 text-green-400',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[priority] ?? colors.Medium}`}>
      {priority}
    </span>
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
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
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
                  <p className="text-xs text-amber-400">Applicant applied without an account. They'll get member access once they register with <strong>{app.email}</strong>.</p>
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
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
        {initials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white truncate">{name}</p>
        {member.role && <p className="text-xs text-cyan-400">{member.role}</p>}
        {email && <p className="text-xs text-gray-600 truncate">{email}</p>}
      </div>
      <span className="text-[10px] text-gray-600">{fmtDate(member.created_at)}</span>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

type Tab = 'board' | 'applications' | 'team' | 'chat' | 'files' | 'mentors';
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

export default function WorkspaceView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const { workspace, setWorkspaceBoard, addWorkspaceTask } = useDashboard();

  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<DbProject | null>(null);
  const [applications, setApplications] = useState<DbApplication[]>([]);
  const [members, setMembers] = useState<DbProjectMember[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [tab, setTab] = useState<Tab>('board');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [addForColumn, setAddForColumn] = useState<string | null>(null);
  const [draft, setDraft] = useState({ content: '', priority: 'Medium' });

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

      setIsMember(member);

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

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = workspace.columns[source.droppableId];
    const finish = workspace.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setWorkspaceBoard({ ...workspace, columns: { ...workspace.columns, [start.id]: { ...start, taskIds: newTaskIds } } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    setWorkspaceBoard({
      ...workspace,
      columns: {
        ...workspace.columns,
        [start.id]: { ...start, taskIds: startTaskIds },
        [finish.id]: { ...finish, taskIds: finishTaskIds },
      },
    });
  };

  const submitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForColumn || !draft.content.trim()) return;
    addWorkspaceTask(addForColumn, { content: draft.content.trim(), priority: draft.priority });
    setDraft({ content: '', priority: 'Medium' });
    setAddForColumn(null);
  };

  // ── loading / access ────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
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
        <button onClick={() => router.push('/feed')} className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
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
    { id: 'board',        label: 'Kanban Board', icon: Layout },
    ...(isOwner ? [{ id: 'applications' as Tab, label: 'Applications', icon: FolderOpen, count: pendingCount }] : []),
    { id: 'team',         label: 'Team',         icon: Users,         count: members.length },
    { id: 'chat',         label: 'Team Chat',    icon: MessageCircle },
    { id: 'files',        label: 'Shared Files', icon: FileText },
    { id: 'mentors',      label: 'Mentor Access', icon: Users },
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
            <Hexagon className="w-5 h-5 text-cyan-400" fill="currentColor" fillOpacity={0.12} />
            <span className="font-display font-bold text-sm text-white hidden sm:block">
              Cross<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Think</span>
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
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
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
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
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

        {/* ── Kanban Board ──────────────────────────────────────── */}
        {tab === 'board' && (
          <div className="flex-1 overflow-x-auto pb-6 pt-6 px-4 sm:px-6 max-w-7xl mx-auto w-full">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-6 min-w-max h-full">
                {workspace.columnOrder.map((columnId) => {
                  const column = workspace.columns[columnId];
                  const tasks = column.taskIds.map((taskId: string) => workspace.tasks[taskId]);

                  return (
                    <div key={column.id} className="w-80 flex flex-col bg-[#121212]/50 rounded-2xl p-4 border border-white/5">
                      <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          {column.title}
                          <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-400">{tasks.length}</span>
                        </h3>
                        <button type="button" className="text-gray-500 hover:text-white transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 transition-colors rounded-xl min-h-[150px] ${snapshot.isDraggingOver ? 'bg-blue-900/10' : ''}`}
                          >
                            {tasks.map((task: any, index: number) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(dragProvided, dragSnapshot) => (
                                  <div
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    {...dragProvided.dragHandleProps}
                                    className={`mb-3 outline-none ${dragSnapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                                  >
                                    <GlassCard className="p-4 cursor-grab active:cursor-grabbing hover:border-cyan-500/30">
                                      <div className="flex justify-between items-start mb-3">
                                        <PriorityBadge priority={task.priority} />
                                      </div>
                                      <p className="text-sm font-medium text-white mb-4 leading-snug">{task.content}</p>
                                      <div className="flex items-center justify-between text-gray-400">
                                        <div className="flex items-center gap-3">
                                          {task.comments > 0 && (
                                            <span className="flex items-center gap-1 text-xs">
                                              <MessageSquare className="w-3.5 h-3.5" /> {task.comments}
                                            </span>
                                          )}
                                          {task.attachments > 0 && (
                                            <span className="flex items-center gap-1 text-xs">
                                              <Paperclip className="w-3.5 h-3.5" /> {task.attachments}
                                            </span>
                                          )}
                                        </div>
                                        <img src="https://i.pravatar.cc/150?img=11" className="w-6 h-6 rounded-full" alt="assignee" />
                                      </div>
                                    </GlassCard>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      <button
                        type="button"
                        onClick={() => setAddForColumn(column.id)}
                        className="w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                      >
                        <Plus className="w-4 h-4" /> Add Task
                      </button>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          </div>
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

        {/* ── Team Chat ────────────────────────────────────────────── */}
        {tab === 'chat' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-2xl flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Team Chat</h3>
                <p className="text-gray-400">Inline project discussion channel — coming soon.</p>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── Shared Files ─────────────────────────────────────────── */}
        {tab === 'files' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-2xl flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Shared Files</h3>
                <p className="text-gray-400">Project resources and assets — coming soon.</p>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── Mentor Access ─────────────────────────────────────────── */}
        {tab === 'mentors' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-2xl flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Mentor Access</h3>
                <p className="text-gray-400">Directly consult with assigned mentors — coming soon.</p>
              </div>
            </GlassCard>
          </div>
        )}
      </div>

      {/* ── Add Task Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {addForColumn && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={submitTask}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">New task</h2>
                <button type="button" className="p-2 rounded-full hover:bg-white/10 transition-colors" onClick={() => setAddForColumn(null)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div>
                <label className="text-xs text-gray-500">Title</label>
                <input
                  autoFocus
                  className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 transition-colors"
                  value={draft.content}
                  onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Priority</label>
                <select
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 transition-colors"
                  value={draft.priority}
                  onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setAddForColumn(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Add
                </Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
