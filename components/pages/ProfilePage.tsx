'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building, Calendar, GraduationCap, LogOut, Loader2, ArrowRight,
  FolderOpen, Send, ExternalLink, Clock, CheckCircle2, XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DbProject, DbApplication } from '@/types/database';

const statusMeta: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending:  { label: 'Pending',  cls: 'text-amber-400 border-amber-500/20 bg-amber-500/10',    icon: Clock },
  approved: { label: 'Approved', cls: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10', icon: CheckCircle2 },
  rejected: { label: 'Declined', cls: 'text-rose-400 border-rose-500/20 bg-rose-500/10',      icon: XCircle },
};

function Panel({ title, icon: Icon, count, children }: {
  title: string;
  icon: React.ElementType;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 text-purple-400" />
        {title}
        {typeof count === 'number' && count > 0 && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-400">{count}</span>
        )}
      </h2>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-gray-600 rounded-xl border border-dashed border-white/[0.08] px-4 py-6 text-center">
      {children}
    </p>
  );
}

const ProfilePage = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [applications, setApplications] = useState<DbApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;

      if (!user) { router.replace('/login?redirectTo=/profile'); return; }
      setUser(user);
      setLoading(false);

      supabase.from('projects').select('*').eq('owner_id', user.id).order('created_at', { ascending: false })
        .then(({ data }) => { if (!cancelled) setProjects((data as DbProject[]) ?? []); });

      supabase.from('applications').select('*').eq('applicant_user_id', user.id).order('created_at', { ascending: false })
        .then(({ data }) => { if (!cancelled) setApplications((data as DbApplication[]) ?? []); });
    })();

    return () => { cancelled = true; };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
      </div>
    );
  }

  const meta = user.user_metadata ?? {};
  const fullName: string = meta.full_name || user.email?.split('@')[0] || 'User';
  const isStudent = (meta.role || 'student') === 'student';
  const expertise: string[] = Array.isArray(meta.expertise)
    ? meta.expertise
    : meta.expertise ? [meta.expertise] : [];
  const skills = [isStudent ? meta.major : null, ...expertise].filter(Boolean) as string[];

  const facts = isStudent
    ? [
        { icon: GraduationCap, value: meta.major },
        { icon: Building, value: meta.university },
        { icon: Calendar, value: meta.year },
      ]
    : [
        { icon: Building, value: meta.organization },
        { icon: Calendar, value: meta.years_exp ? `${meta.years_exp} yrs experience` : null },
      ];

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased">
      <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push('/feed')} className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Feed
          </button>
          <button onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-400 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">

        {/* Identity */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 grid place-items-center text-2xl font-bold flex-shrink-0">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-display font-bold truncate">{fullName}</h1>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border bg-purple-500/10 border-purple-500/20 text-purple-300">
                {isStudent ? 'Student' : 'Mentor'}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
              {facts.filter((f) => f.value).map((f) => (
                <span key={f.value} className="flex items-center gap-1.5">
                  <f.icon className="w-3.5 h-3.5" />{f.value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-gray-300">{s}</span>
            ))}
          </div>
        )}

        {/* Projects you own */}
        <Panel title="Your projects" icon={FolderOpen} count={projects.length}>
          {projects.length === 0 ? (
            <Empty>
              You haven&apos;t posted a project yet.{' '}
              <button onClick={() => router.push('/projects/new')} className="text-purple-400 hover:text-purple-300 transition-colors">
                Post one
              </button>.
            </Empty>
          ) : (
            <div className="space-y-2">
              {projects.map((p) => (
                <button key={p.id} onClick={() => router.push(`/workspace/${p.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all text-left group">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-violet-500/30 to-purple-600/30" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-xs text-gray-600 truncate">{p.dept || 'Project'}</p>
                  </div>
                  {!p.is_public && (
                    <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-500 border border-white/[0.08]">Private</span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-300 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </Panel>

        {/* Applications you sent */}
        <Panel title="Your applications" icon={Send} count={applications.length}>
          {applications.length === 0 ? (
            <Empty>
              No applications yet.{' '}
              <button onClick={() => router.push('/')} className="text-purple-400 hover:text-purple-300 transition-colors">
                Browse projects
              </button>.
            </Empty>
          ) : (
            <div className="space-y-2">
              {applications.map((a) => {
                const s = statusMeta[a.status] ?? statusMeta.pending;
                return (
                  <button key={a.id} onClick={() => router.push(`/projects/${a.project_id}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all text-left">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{a.role || 'Open to any role'}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1 flex-shrink-0 text-[10px] font-medium px-2 py-1 rounded-full border ${s.cls}`}>
                      <s.icon className="w-3 h-3" />{s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </Panel>

        <button onClick={() => router.push('/feed')}
          className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2">
          Go to feed <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
