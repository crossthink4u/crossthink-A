'use client';

import React, { useState } from 'react';
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
  ShieldCheck,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { publicProjects, type Project } from '@/data/projects';

const CATEGORY_TABS = [
  { name: 'All', icon: LayoutGrid, color: 'text-blue-400' },
  { name: 'Machine Learning', icon: Brain, color: 'text-blue-500' },
  { name: 'Sustainability', icon: Leaf, color: 'text-emerald-400' },
  { name: 'FinTech', icon: TrendingUp, color: 'text-purple-400' },
  { name: 'XR / Immersive', icon: Glasses, color: 'text-cyan-400' },
  { name: 'EdTech', icon: GraduationCap, color: 'text-amber-400' },
  { name: 'IoT / Infrastructure', icon: Radio, color: 'text-pink-400' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced: 'text-rose-400',
};

const ACCENT_COLORS: Record<string, string> = {
  cyan: '#00f0ff',
  emerald: '#10b981',
  amber: '#f59e0b',
  violet: '#8b5cf6',
  pink: '#ec4899',
  sky: '#0ea5e9',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  const openCount = project.openRoles.reduce((s, r) => s + r.count, 0);
  const accentHex = ACCENT_COLORS[project.accentColor] ?? '#00f0ff';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      layout
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group flex flex-col rounded-xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 overflow-hidden hover:bg-[#111] cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden flex-shrink-0 bg-[#0a0a0a]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
        {/* open roles badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm" style={{ color: accentHex }}>
          <Zap className="w-3 h-3" />
          {openCount} open
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <div>
          <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1">{project.dept}</p>
          <h3 className="font-display font-semibold text-[14px] text-white leading-snug line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-500 font-medium">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-600 font-medium">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-gray-600">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project.teamSize.filled}/{project.teamSize.capacity}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {project.duration}
          </span>
          <span className={`font-medium ${DIFFICULTY_COLORS[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects/${project.id}`);
          }}
          className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border border-white/[0.08] text-gray-300 hover:text-white hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-150"
        >
          View / Apply
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = publicProjects.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q)) ||
      p.dept.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalOpen = publicProjects.reduce((a, p) => a + p.openRoles.reduce((s, r) => s + r.count, 0), 0);

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased selection:bg-cyan-500/20">

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push('/landing')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <motion.div whileHover={{ rotate: 120 }} transition={{ duration: 0.4 }}>
              <Hexagon className="w-6 h-6 text-cyan-400" fill="currentColor" fillOpacity={0.12} />
            </motion.div>
            <span className="font-display font-bold text-base text-white">
              Cross<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Think</span>
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
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push('/register?role=student')}
              className="text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Join free
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          {/* Left Side */}
          <div className="space-y-4 relative z-10">
            {/* Roles badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a1128] border border-blue-500/20 text-blue-300 text-xs font-medium mb-2">
              <Users className="w-3.5 h-3.5" />
              {totalOpen} roles available
            </div>

            {/* Title */}
            <div className="flex items-center gap-3">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
                Explore <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Open Projects</span>
              </h1>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-base">
              Real teams, real impact — no login required to browse.
            </p>

            {/* Bullet points */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Real-world impact
              </div>
              <div className="w-px h-4 bg-white/[0.1]" />
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Users className="w-4 h-4 text-purple-400" />
                Collaborate remotely
              </div>
              <div className="w-px h-4 bg-white/[0.1]" />
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-blue-400" />
                Build your portfolio
              </div>
            </div>
          </div>

          {/* Right Side CTA */}
          <div className="relative flex-shrink-0 z-10">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-50 pointer-events-none" />
            
            {/* Decorative swoosh */}
            <div className="absolute -left-12 -top-6 w-24 h-24 border-t border-l border-blue-500/30 rounded-tl-full opacity-50" />
            <div className="absolute -left-2 top-8 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

            <button
              onClick={() => router.push('/register?role=student')}
              className="relative flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)]"
            >
              <PlusCircle className="w-5 h-5" />
              Add a Project
            </button>
          </div>
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

        {/* Category filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORY_TABS.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex items-center gap-2 flex-shrink-0 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0a0a1a] text-white border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-transparent text-gray-400 border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? cat.color : 'text-current opacity-70'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={category + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-600 mb-2">No projects match your search.</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); }}
                className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Have a project idea?</p>
            <p className="text-xs text-gray-600">Post your project and find your team in minutes.</p>
          </div>
          <button
            onClick={() => router.push('/register?role=student')}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.18] px-5 py-2.5 rounded-lg transition-all"
          >
            Create an account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
