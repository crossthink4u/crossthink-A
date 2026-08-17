'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Hexagon,
  Search,
  Users,
  Clock,
  ArrowRight,
  Zap,
  X,
  LayoutGrid,
  Brain,
  Leaf,
  TrendingUp,
  Glasses,
  GraduationCap,
  Radio,
  Sparkles,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Rss,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { DbProject } from '@/types/database';

const CATEGORY_TABS = [
  { name: 'All', icon: LayoutGrid, color: 'text-violet-400' },
  { name: 'Machine Learning', icon: Brain, color: 'text-violet-500' },
  { name: 'Sustainability', icon: Leaf, color: 'text-emerald-400' },
  { name: 'FinTech', icon: TrendingUp, color: 'text-purple-400' },
  { name: 'XR / Immersive', icon: Glasses, color: 'text-purple-400' },
  { name: 'EdTech', icon: GraduationCap, color: 'text-amber-400' },
  { name: 'IoT / Infrastructure', icon: Radio, color: 'text-pink-400' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced: 'text-rose-400',
};

// ponytail: id-derived accent so a wall of cards isn't one flat colour — no data needed
const ACCENTS = ['#a855f7', '#8b5cf6', '#d946ef', '#7c3aed'];
function accentFor(id: string) {
  return ACCENTS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % ACCENTS.length];
}


// ponytail: projects created without explicit roles fall back to their team capacity as open spots
function openRoleCount(p: DbProject) {
  return (p.open_roles ?? []).reduce((s, r) => s + r.count, 0) || p.team_size_capacity || 0;
}

// ponytail: loose keyword match — 'XR / Immersive' matches a project tagged 'XR' or 'immersive'
function matchesCategory(haystack: string, category: string) {
  return category
    .split(/[^a-z0-9]+/i)
    .filter((w) => w.length > 1)
    .some((w) => haystack.includes(w.toLowerCase()));
}

function DbProjectCard({ project, index }: { project: DbProject; index: number }) {
  const router = useRouter();
  const openCount = openRoleCount(project);
  const capacity = project.team_size_capacity || openCount;
  const filled = Math.max(0, capacity - openCount);
  const accent = accentFor(project.id);
  const open = () => router.push(`/projects/${project.id}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      layout
      onClick={open}
      onKeyDown={(e) => e.key === 'Enter' && open()}
      tabIndex={0}
      role="link"
      style={{ ['--accent' as string]: accent }}
      className="group flex flex-col rounded-2xl bg-[#0d0d10] border border-white/[0.08] overflow-hidden cursor-pointer transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]/45 hover:shadow-[0_24px_50px_-30px_var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
    >
      {/* Cover */}
      <div className="relative h-40 w-full overflow-hidden flex-shrink-0 bg-[#0a0a0a]">
        {project.image_url ? (
          <img src={project.image_url} alt=""
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full grid place-items-center bg-[radial-gradient(130%_130%_at_25%_0%,var(--accent)_0%,transparent_60%)] opacity-25">
            <Sparkles className="w-8 h-8 text-white/40" />
          </div>
        )}

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-black/55 text-white/85 border border-white/10 backdrop-blur-md">
            {project.dept || 'Project'}
          </span>
          {openCount > 0 && (
            <span
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md"
              style={{ color: accent }}
            >
              <Zap className="w-3 h-3" />{openCount} open
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-semibold text-lg text-white leading-snug line-clamp-2">
          {project.title}
        </h3>

        {project.description && (
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{project.description}</p>
        )}

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/[0.05] text-gray-400 font-medium">{t}</span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[11px] px-2 py-1 text-gray-600 font-medium">+{project.tech.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-[12px] text-gray-500">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{filled}/{capacity}</span>
          {project.duration && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{project.duration}</span>}
          {project.difficulty && (
            <span className={`font-medium ${DIFFICULTY_COLORS[project.difficulty] ?? 'text-gray-400'}`}>{project.difficulty}</span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <button
            onClick={(e) => { e.stopPropagation(); open(); }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold text-gray-300 bg-white/[0.04] border border-white/[0.08] group-hover:text-white group-hover:bg-[var(--accent)] group-hover:border-transparent transition-all duration-200"
          >
            View project
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    // Load community projects from Supabase
    supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .then(
        ({ data, error }) => {
          if (error) {
            setDbError(error.message);
          } else {
            setDbError(null);
            setDbProjects((data as DbProject[]) ?? []);
          }
        },
        (err: Error) => setDbError(err.message)
      );

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-profile-menu]')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  const filteredDb = dbProjects.filter((p) => {
    const haystack = [p.title, p.dept ?? '', p.description ?? '', ...p.tech].join(' ').toLowerCase();
    if (category !== 'All' && !matchesCategory(haystack, category)) return false;
    return !search || haystack.includes(search.toLowerCase());
  });

  const totalOpen = filteredDb.reduce((a, p) => a + openRoleCount(p), 0);
  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased selection:bg-purple-500/20">

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <motion.div whileHover={{ rotate: 120 }} transition={{ duration: 0.4 }}>
              <Hexagon className="w-6 h-6 text-purple-400" fill="currentColor" fillOpacity={0.12} />
            </motion.div>
            <span className="font-display font-bold text-base text-white">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>

          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, tech..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none focus:border-white/[0.16] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <div className="relative" data-profile-menu>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
                >
                  {user.user_metadata?.full_name ? (
                    <span className="text-sm font-semibold text-white">
                      {user.user_metadata.full_name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserIcon className="w-4 h-4 text-gray-300" />
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1.5 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-white/5 mb-1">
                        <p className="text-xs font-semibold text-white truncate">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setDropdownOpen(false); router.push('/feed'); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <Rss className="w-3.5 h-3.5" /> Feed
                      </button>
                      <button
                        onClick={() => { setDropdownOpen(false); router.push('/profile'); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5" /> Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors mt-0.5 border-t border-white/5"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => router.push('/login')}
                  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push('/register?role=student')}
                  className="text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Join free
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-10">

        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="min-w-0 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/[0.08] border border-violet-500/20 text-violet-300 text-xs font-medium">
              <Users className="w-3.5 h-3.5" />
              {totalOpen} roles available
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              Explore <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">Open Projects</span>
              <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
            </h1>

            <p className="text-gray-400 text-[15px]">
              Real teams, real impact — no login required to browse.
            </p>
          </div>

          <button
            onClick={() => router.push('/projects/new')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 transition-all shadow-[0_0_28px_rgba(168,85,247,0.4)] flex-shrink-0 self-start md:self-end"
          >
            <PlusCircle className="w-5 h-5" />
            Add a Project
          </button>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tech..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-white/[0.16] transition-colors"
          />
        </div>

        {/* Community projects from DB */}
        {dbError ? (
          <div className="mb-10 flex flex-col items-center justify-center py-16 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] text-center">
            <p className="text-sm font-medium text-rose-400 mb-1">Couldn&apos;t load community projects</p>
            <p className="text-xs text-gray-600 max-w-xs">{dbError}</p>
          </div>
        ) : (
          <>
            {/* Category filters */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORY_TABS.map((cat) => {
                const Icon = cat.icon;
                const isActive = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center gap-1.5 flex-shrink-0 text-[13px] font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0a0a1a] text-white border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                        : 'bg-transparent text-gray-400 border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? cat.color : 'text-current opacity-70'}`} />
                    {cat.name}
                  </button>
                );
              })}
              <span className="ml-auto flex-shrink-0 text-[11px] text-gray-600 pl-3">
                {filteredDb.length} {filteredDb.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            <div className="mb-10">
              {filteredDb.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredDb.map((p, i) => (
                      <DbProjectCard key={p.id} project={p} index={i} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-white/[0.08] text-center">
                  <Sparkles className="w-7 h-7 text-white/15 mb-3" />
                  <p className="text-sm font-medium text-gray-400 mb-1">No projects to show yet</p>
                  <p className="text-xs text-gray-600">
                    {search || category !== 'All' ? 'Try a different search or category.' : 'Be the first to post one.'}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Have a project idea?</p>
            <p className="text-xs text-gray-600">Post your project and find your team in minutes.</p>
          </div>
          <button
            onClick={() => router.push('/projects/new')}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.18] px-5 py-2.5 rounded-lg transition-all"
          >
            Post a project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
