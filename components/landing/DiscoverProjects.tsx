'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Clock, Zap, ChevronRight } from 'lucide-react';
import { publicProjects } from '@/data/projects';

const CATEGORIES = ['All', 'Machine Learning', 'Sustainability', 'FinTech', 'XR / Immersive', 'EdTech', 'IoT / Infrastructure'];

const accentMap: Record<string, { badge: string; dot: string; border: string; glow: string }> = {
  cyan:    { badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',    dot: 'bg-cyan-400',    border: 'border-cyan-500/30',   glow: 'shadow-[0_0_30px_rgba(0,240,255,0.12)]' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.12)]' },
  amber:   { badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',  dot: 'bg-amber-400',   border: 'border-amber-500/30',  glow: 'shadow-[0_0_30px_rgba(245,158,11,0.12)]' },
  violet:  { badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20', dot: 'bg-violet-400',  border: 'border-violet-500/30', glow: 'shadow-[0_0_30px_rgba(139,92,246,0.12)]' },
  pink:    { badge: 'bg-pink-500/10 text-pink-300 border-pink-500/20',    dot: 'bg-pink-400',    border: 'border-pink-500/30',   glow: 'shadow-[0_0_30px_rgba(236,72,153,0.12)]' },
  sky:     { badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',      dot: 'bg-sky-400',     border: 'border-sky-500/30',    glow: 'shadow-[0_0_30px_rgba(14,165,233,0.12)]' },
};

const difficultyColor: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced:     'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

export default function DiscoverProjects() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? publicProjects
      : publicProjects.filter((p) => p.category === activeCategory);

  const totalOpen = publicProjects.reduce(
    (acc, p) => acc + p.openRoles.reduce((s, r) => s + r.count, 0),
    0
  );

  return (
    <section
      id="discover-projects"
      className="py-32 relative overflow-hidden bg-[#050505]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {totalOpen} open roles across {publicProjects.length} projects
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Discover{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Live Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Real teams building real products — no login required. Find your next challenge and apply in minutes.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => {
              const accent = accentMap[project.accentColor] ?? accentMap.cyan;
              const openCount = project.openRoles.reduce((s, r) => s + r.count, 0);
              const fillPct = Math.round((project.teamSize.filled / project.teamSize.capacity) * 100);

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className={`group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${accent.glow} hover:bg-white/[0.05]`}
                >
                  {/* Preview image */}
                  <div className="relative h-44 w-full overflow-hidden flex-shrink-0 bg-[#0a0a0a]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    {/* gradient fade into card body */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                    {/* category badge overlaid on image */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${accent.badge}`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${difficultyColor[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 gap-4 -mt-2">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-semibold text-white text-lg leading-snug group-hover:text-cyan-100 transition-colors flex-1">
                        {project.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                    </div>

                    {/* Tagline */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Open roles */}
                    <div className="flex flex-col gap-1.5">
                      {project.openRoles.slice(0, 2).map((role) => (
                        <div
                          key={role.title}
                          className="flex items-center gap-2 text-xs text-gray-400"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
                          <span className="font-medium text-gray-300">{role.title}</span>
                          <span className="text-gray-600">·</span>
                          <span>{role.skills.slice(0, 2).join(', ')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-gray-500">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-white/[0.06] my-1" />

                    {/* Bottom stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {project.teamSize.filled}/{project.teamSize.capacity} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {project.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-medium text-amber-400/80">
                          {openCount} open {openCount === 1 ? 'role' : 'roles'}
                        </span>
                      </div>
                    </div>

                    {/* Team fill bar */}
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${fillPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: project.gradient }}
                      />
                    </div>

                    {/* CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/projects/${project.id}`);
                      }}
                      className={`w-full mt-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 border ${accent.border} bg-white/[0.04] hover:bg-white/[0.10] group-hover:border-white/20`}
                    >
                      View Project
                      <ArrowRight className="inline-block ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm mb-4">
            All projects are real — built by students, mentored by faculty.
          </p>
          <button
            onClick={() => router.push('/register?role=student')}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all duration-300 text-sm"
          >
            Join CrossThink — it&apos;s free
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
