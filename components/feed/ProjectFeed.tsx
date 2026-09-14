'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Clock, ArrowRight, Zap, Hexagon,
  FolderOpen, Sparkles, User as UserIcon, LogOut, ExternalLink,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DbProject } from '@/types/database';

// ─── accent helpers ──────────────────────────────────────────────────────────

// ─── Discover card ───────────────────────────────────────────────────────────
function DiscoverCard({ project, index }: { project: DbProject; index: number }) {
  const router = useRouter();
  const openCount = project.open_roles.reduce((s, r) => s + r.count, 0);
  const accentHex = '#a855f7';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      layout
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group flex flex-col rounded-xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 overflow-hidden cursor-pointer hover:bg-[#111]"
    >
      <div className="relative h-36 w-full overflow-hidden bg-[#0a0a0a] flex-shrink-0">
        <img
          src={project.image_url || '/placeholder-project.jpg'}
          alt={project.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/10 to-transparent" />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm"
          style={{ color: accentHex }}>
          <Zap className="w-3 h-3" />{openCount} open
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1">{project.dept}</p>
          <h3 className="font-display font-semibold text-[14px] text-white leading-snug line-clamp-2">{project.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-500 font-medium">{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-600 font-medium">+{project.tech.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-600">
          {project.open_roles.reduce((sum, role) => sum + role.count, 0)}/{project.team_size_capacity}
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.duration}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/projects/${project.id}`); }}
          className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border border-white/[0.08] text-gray-300 hover:text-white hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-150"
        >
          View / Apply <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── My project card ─────────────────────────────────────────────────────────

function MyProjectCard({ project, onWorkspace }: { project: DbProject; onWorkspace: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col rounded-xl bg-[#0d0d0d] border border-purple-500/20 hover:border-purple-500/35 transition-all duration-200 p-4 gap-3"
    >
      {project.image_url && (
        <div className="h-28 rounded-lg overflow-hidden -mx-0">
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-70" />
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-0.5">{project.dept || 'Project'}</p>
          <h3 className="font-display font-semibold text-sm text-white leading-snug truncate">{project.title}</h3>
        </div>
        <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">Owner</span>
      </div>
      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-500 font-medium">{t}</span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
        <button
          onClick={onWorkspace}
          className="flex items-center gap-1 text-xs font-semibold text-white bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] px-3 py-1.5 rounded-lg transition-all"
        >
          <ExternalLink className="w-3 h-3" /> Workspace
        </button>
      </div>
    </motion.div>
  );
}
// ─── Main Feed ────────────────────────────────────────────────────────────────

export default function ProjectFeed() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [myProjects, setMyProjects] = useState<DbProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [publicProjects, setPublicProjects] = useState<DbProject[]>([]);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loadMyProjects = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', uid)
        .order('created_at', { ascending: false });

      if (error) {
        setProjectsError(error.message);
      } else {
        setProjectsError(null);
        setMyProjects((data as DbProject[]) ?? []);
      }
    } catch (err) {
      setProjectsError(err instanceof Error ? err.message : 'Failed to load projects.');
    }
    setProjectsLoading(false);
  };

  const loadPublicProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      setProjectsError(error.message);
      return;
    }

    setPublicProjects((data as DbProject[]) ?? []);
  } catch (err) {
    setProjectsError(
      err instanceof Error ? err.message : 'Failed to load public projects.'
    );
  }
};

  useEffect(() => {
  loadPublicProjects();

  supabase.auth.getUser()
    .then(({ data: { user } }) => {
      setUser(user);

      if (user) {
        loadMyProjects(user.id);
      } else {
        setProjectsLoading(false);
      }
    })
      .catch((err: Error) => {
        setProjectsError(err.message);
        setProjectsLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadMyProjects(session.user.id);
    });

    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-feed-menu]')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => { subscription.unsubscribe(); document.removeEventListener('mousedown', handleClick); };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };


const filteredPublic = publicProjects.filter((p) => {
  if (!search) return true;

  const q = search.toLowerCase();

  return (
    p.title.toLowerCase().includes(q) ||
    (p.dept ?? '').toLowerCase().includes(q) ||
    p.tech.some((t) => t.toLowerCase().includes(q))
  );
});
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 group flex-shrink-0">
            <motion.div whileHover={{ rotate: 120 }} transition={{ duration: 0.4 }}>
              <Hexagon className="w-6 h-6 text-purple-400" fill="currentColor" fillOpacity={0.12} />
            </motion.div>
            <span className="font-display font-bold text-base text-white">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>

          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects, tech..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none focus:border-white/[0.16] transition-colors" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => router.push('/projects/new')}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Post Project
            </button>

            {user && (
              <div className="relative" data-feed-menu>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  {user.user_metadata?.full_name
                    ? <span className="text-sm font-semibold text-white">{user.user_metadata.full_name.charAt(0).toUpperCase()}</span>
                    : <UserIcon className="w-4 h-4 text-gray-300" />}
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1.5 z-50">
                      <div className="px-4 py-2.5 border-b border-white/5 mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button onClick={() => { setDropdownOpen(false); router.push('/profile'); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                        <UserIcon className="w-3.5 h-3.5" /> Profile
                      </button>
                      <button onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors mt-0.5 border-t border-white/5">
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* ── YOUR PROJECTS ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-display font-bold text-white">Hey {firstName} — Your Projects</h2>
              <p className="text-xs text-gray-500 mt-0.5">Projects you&apos;ve posted on CrossThink</p>
            </div>
            <button onClick={() => router.push('/projects/new')}
              className="flex items-center gap-1.5 text-xs font-semibold text-white border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2 rounded-lg transition-all">
              <Plus className="w-3.5 h-3.5" /> New Project
            </button>
          </div>

          {projectsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            </div>
          ) : projectsError ? (
            <div className="flex flex-col items-center justify-center py-14 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] text-center">
              <p className="text-sm font-medium text-rose-400 mb-1">Couldn&apos;t load your projects</p>
              <p className="text-xs text-gray-600 max-w-xs">{projectsError}</p>
            </div>
          ) : myProjects.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-14 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] text-center">
              <FolderOpen className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-sm font-medium text-gray-400 mb-1">No projects yet</p>
              <p className="text-xs text-gray-600 mb-5 max-w-xs">Post your first project and start finding collaborators.</p>
              <button onClick={() => router.push('/projects/new')}
                className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Sparkles className="w-4 h-4" /> Post a Project
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence>
                {myProjects.map((p) => (
                  <MyProjectCard key={p.id} project={p} onWorkspace={() => router.push(`/workspace/${p.id}`)} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ── DISCOVER ───────────────────────────────────────────────── */}
        <section>
          {projectsError ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] text-center">
              <p className="text-sm font-medium text-rose-400 mb-1">Couldn&apos;t load projects</p>
              <p className="text-xs text-gray-600 max-w-xs">{projectsError}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    Discover Projects <Sparkles className="w-4 h-4 text-purple-400" />
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">

                    {filteredPublic.reduce(
                      (a, p) => a + p.open_roles.reduce((s, r) => s + r.count, 0),
                      0
                    )} open roles across {filteredPublic.length} project
                  </p>
                </div>
              </div>

              {/* Mobile search */}
              <div className="sm:hidden mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects, tech..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-white/[0.16] transition-colors" />
              </div>

              {filteredPublic.length > 0 ? (
                <motion.div key={search} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <AnimatePresence>
                    {filteredPublic.map((p, i) => <DiscoverCard key={p.id} project={p} index={i} />)}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-sm mb-2">No projects match your search.</p>
                  <button onClick={() => setSearch('')} className="text-sm text-purple-500 hover:text-purple-400 transition-colors">Clear search</button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

    </div>
  );
}
