'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Zap, Calendar, ArrowRight, Layers } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

export default function HeroSection() {
  const router = useRouter();
  const { user, enhancedProjects, overviewTasks, calendarEvents, productivity } = useDashboard();

  const activeTasks = overviewTasks.filter((t: { status: string }) => t.status !== 'done').length;
  const focusProject = enhancedProjects[0];

  const now = new Date();
  const nearest = calendarEvents
    .map((e: { title: string; date: string }) => ({ ...e, dt: new Date(e.date) }))
    .filter((e) => e.dt > now)
    .sort((a, b) => a.dt.getTime() - b.dt.getTime())[0];

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const nearestLabel = nearest
    ? `${nearest.title} — ${nearest.dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}`
    : 'No upcoming events';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0d0d1a] via-[#0a0a0f] to-[#0d0d1a] p-6 md:p-8"
    >
      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" style={{ animation: 'hero-glow 6s ease-in-out infinite' }} />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/15 blur-[80px] rounded-full pointer-events-none" style={{ animation: 'hero-glow 8s ease-in-out infinite 2s' }} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            {greeting},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400">
              {user.firstName}
            </span>
          </h1>
          <p className="text-sm text-gray-400 mb-5">Here&apos;s your mission control for today.</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mb-5">
            {[
              { label: 'Active Projects', value: enhancedProjects.length, icon: <Layers className="w-3.5 h-3.5" /> },
              { label: 'Pending Tasks', value: activeTasks, icon: <Zap className="w-3.5 h-3.5" /> },
              { label: 'Streak', value: `${productivity.contributionStreak}d`, icon: <Zap className="w-3.5 h-3.5" /> },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <span className="text-purple-400">{s.icon}</span>
                <span className="text-white font-semibold text-sm">{s.value}</span>
                <span className="text-gray-500 text-xs">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Nearest deadline */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Next up: {nearestLabel}</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/dashboard/workspace')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(0,200,255,0.3)] transition-all"
            >
              Continue Working <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => router.push('/dashboard/projects')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/5 transition-all"
            >
              View Workspace
            </button>
          </div>
        </div>

        {/* Right — Focus Project */}
        {focusProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-full lg:w-72 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg" style={{ background: focusProject.image }} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{focusProject.title}</p>
                <p className="text-[11px] text-gray-500">{focusProject.currentSprint}</p>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                <span>Progress</span>
                <span>{focusProject.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${focusProject.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-500">
              {focusProject.taskCompletion}/{focusProject.totalTasks} tasks · Due{' '}
              {new Date(focusProject.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
