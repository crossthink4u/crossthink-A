'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Clock,
  Calendar,
  Zap,
  CheckCircle2,
  Hexagon,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { getProjectById } from '@/data/projects';
import { publicProjects } from '@/data/projects';

const accentMap: Record<string, {
  badge: string; dot: string; dotText: string; border: string; glow: string;
  heading: string; btnBg: string; btnShadow: string; tag: string;
}> = {
  cyan:    { badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',    dot: 'bg-cyan-400',    dotText: 'text-cyan-400',    border: 'border-cyan-500/30',   glow: 'shadow-[0_0_60px_rgba(0,240,255,0.08)]',   heading: 'from-cyan-400 to-blue-500',     btnBg: 'from-cyan-500 to-blue-600',     btnShadow: 'shadow-[0_0_24px_rgba(0,240,255,0.35)]',   tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400', dotText: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-[0_0_60px_rgba(16,185,129,0.08)]', heading: 'from-emerald-400 to-teal-500',   btnBg: 'from-emerald-500 to-teal-600',  btnShadow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)]', tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  amber:   { badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',  dot: 'bg-amber-400',   dotText: 'text-amber-400',   border: 'border-amber-500/30',  glow: 'shadow-[0_0_60px_rgba(245,158,11,0.08)]', heading: 'from-amber-400 to-orange-500',   btnBg: 'from-amber-500 to-orange-600',  btnShadow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]', tag: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  violet:  { badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20', dot: 'bg-violet-400',  dotText: 'text-violet-400',  border: 'border-violet-500/30', glow: 'shadow-[0_0_60px_rgba(139,92,246,0.08)]', heading: 'from-violet-400 to-purple-500',  btnBg: 'from-violet-500 to-purple-600', btnShadow: 'shadow-[0_0_24px_rgba(139,92,246,0.35)]', tag: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  pink:    { badge: 'bg-pink-500/10 text-pink-300 border-pink-500/20',    dot: 'bg-pink-400',    dotText: 'text-pink-400',    border: 'border-pink-500/30',   glow: 'shadow-[0_0_60px_rgba(236,72,153,0.08)]', heading: 'from-pink-400 to-rose-500',     btnBg: 'from-pink-500 to-rose-600',     btnShadow: 'shadow-[0_0_24px_rgba(236,72,153,0.35)]', tag: 'bg-pink-500/10 text-pink-300 border-pink-500/20' },
  sky:     { badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',      dot: 'bg-sky-400',     dotText: 'text-sky-400',     border: 'border-sky-500/30',    glow: 'shadow-[0_0_60px_rgba(14,165,233,0.08)]',  heading: 'from-sky-400 to-cyan-500',      btnBg: 'from-sky-500 to-cyan-600',      btnShadow: 'shadow-[0_0_24px_rgba(14,165,233,0.35)]',  tag: 'bg-sky-500/10 text-sky-300 border-sky-500/20' },
};

const difficultyColor: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced:     'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-6">
        <p className="text-gray-400 text-lg">Project not found.</p>
        <button
          onClick={() => router.push('/#discover-projects')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </button>
      </div>
    );
  }

  const accent = accentMap[project.accentColor] ?? accentMap.cyan;
  const openCount = project.openRoles.reduce((s, r) => s + r.count, 0);
  const fillPct = Math.round((project.teamSize.filled / project.teamSize.capacity) * 100);

  const related = publicProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* Top gradient bar */}
      <div className="h-0.5 w-full" style={{ background: project.gradient }} />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 group"
          >
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Hexagon className="w-7 h-7 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
            </motion.div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Cross<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Think</span>
            </span>
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,240,255,0.06), transparent)`,
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <button onClick={() => router.push('/')} className="hover:text-gray-400 transition-colors">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button onClick={() => router.push('/#discover-projects')} className="hover:text-gray-400 transition-colors">Projects</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400 truncate max-w-[200px]">{project.title}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${accent.badge}`}>
                {project.category}
              </span>
              <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${difficultyColor[project.difficulty]}`}>
                {project.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-gray-400">
                <Zap className="w-3 h-3 text-amber-400" />
                {openCount} open {openCount === 1 ? 'role' : 'roles'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className={`text-xl font-medium bg-gradient-to-r ${accent.heading} bg-clip-text text-transparent mb-6`}>
              {project.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <img
                  src={project.ownerAvatar}
                  alt={project.owner}
                  className="w-5 h-5 rounded-full object-cover"
                />
                {project.owner} · {project.ownerRole}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Deadline: {project.deadline}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {project.teamSize.filled}/{project.teamSize.capacity} members
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7"
            >
              <h2 className="font-display text-xl font-semibold text-white mb-4">About this project</h2>
              <p className="text-gray-400 leading-relaxed text-[15px]">{project.description}</p>
            </motion.div>

            {/* Open roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7"
            >
              <h2 className="font-display text-xl font-semibold text-white mb-5">Open roles</h2>
              <div className="space-y-4">
                {project.openRoles.map((role) => (
                  <div
                    key={role.title}
                    className={`flex items-start justify-between gap-4 p-4 rounded-xl border ${accent.border} bg-white/[0.03]`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${accent.dot}`} />
                        <span className="font-semibold text-white text-sm">{role.title}</span>
                        {role.count > 1 && (
                          <span className="text-xs text-gray-500">({role.count} spots)</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 ml-4">
                        {role.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs px-2 py-0.5 rounded-md border ${accent.tag}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/projects/${project.id}/apply?role=${encodeURIComponent(role.title)}`)}
                      className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r ${accent.btnBg} text-white transition-all hover:opacity-90`}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7"
            >
              <h2 className="font-display text-xl font-semibold text-white mb-4">Highlights</h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accent.dotText}`} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7"
            >
              <h2 className="font-display text-xl font-semibold text-white mb-4">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 text-sm font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">

            {/* Apply CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-2xl border ${accent.border} bg-white/[0.025] p-6 ${accent.glow}`}
            >
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Team filled</span>
                  <span>{fillPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${fillPct}%`, background: project.gradient }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1.5">
                  {project.teamSize.capacity - project.teamSize.filled} spot{project.teamSize.capacity - project.teamSize.filled !== 1 ? 's' : ''} remaining
                </p>
              </div>

              <button
                onClick={() => router.push(`/projects/${project.id}/apply`)}
                className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${accent.btnBg} ${accent.btnShadow} hover:opacity-90 transition-all duration-200 text-sm mb-3`}
              >
                Apply to this project
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </button>
              <p className="text-center text-xs text-gray-600">
                No account required · Takes 2 minutes
              </p>
            </motion.div>

            {/* Project info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 space-y-4"
            >
              <h3 className="font-display font-semibold text-white">Project details</h3>
              {[
                { label: 'Department', value: project.dept },
                { label: 'Duration', value: project.duration },
                { label: 'Deadline', value: project.deadline },
                { label: 'Difficulty', value: project.difficulty },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-3">
                  <span className="text-xs text-gray-600 flex-shrink-0">{label}</span>
                  <span className="text-xs text-gray-300 text-right">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Perks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"
            >
              <h3 className="font-display font-semibold text-white mb-4">What you get</h3>
              <ul className="space-y-2.5">
                {project.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Project lead */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"
            >
              <h3 className="font-display font-semibold text-white mb-4">Project lead</h3>
              <div className="flex items-center gap-3">
                <img
                  src={project.ownerAvatar}
                  alt={project.owner}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-sm font-medium text-white">{project.owner}</p>
                  <p className="text-xs text-gray-500">{project.ownerRole}</p>
                </div>
              </div>
            </motion.div>

            {/* Related projects */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"
              >
                <h3 className="font-display font-semibold text-white mb-4">Related projects</h3>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <button
                      key={rp.id}
                      onClick={() => router.push(`/projects/${rp.id}`)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all text-left group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex-shrink-0"
                        style={{ background: rp.gradient }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate group-hover:text-cyan-200 transition-colors">
                          {rp.title}
                        </p>
                        <p className="text-xs text-gray-600">{rp.dept}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
