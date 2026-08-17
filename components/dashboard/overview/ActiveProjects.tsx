'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GitBranch, ArrowRight, Users as UsersIcon } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

export default function ActiveProjects() {
  const { enhancedProjects } = useDashboard();
  const router = useRouter();

  if (!enhancedProjects.length) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.04] flex items-center justify-center">
          <GitBranch className="w-7 h-7 text-gray-600" />
        </div>
        <p className="text-white font-semibold mb-1">No active projects yet</p>
        <p className="text-sm text-gray-500 mb-4">Start building something amazing with your team.</p>
        <button onClick={() => router.push('/dashboard/projects')} className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-medium hover:bg-purple-500/20 transition-colors">
          Find Your First Project
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Active Projects</h2>
        <button onClick={() => router.push('/dashboard/projects')} className="text-xs text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid gap-3">
        {enhancedProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i + 0.2, duration: 0.3 }}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all p-4 cursor-pointer"
            onClick={() => router.push('/dashboard/workspace')}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg shrink-0 shadow-lg" style={{ background: p.image }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">{p.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium shrink-0 ml-2">
                    {p.currentSprint}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-1">{p.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>{p.taskCompletion}/{p.totalTasks} tasks</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
                    />
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-3 h-3" /> {p.teamMembers.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" /> {p.githubStatus}
                    </span>
                    {p.mentor && <span className="text-amber-400/70">Mentor: {p.mentor.split(' ').pop()}</span>}
                  </div>

                  {/* Team avatars */}
                  <div className="flex -space-x-2">
                    {p.teamMembers.slice(0, 3).map((m: string, j: number) => (
                      <div key={j} className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-[#0a0a0a] flex items-center justify-center text-[8px] text-white font-medium">
                        {m.charAt(0)}
                      </div>
                    ))}
                    {p.teamMembers.length > 3 && (
                      <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-[#0a0a0a] flex items-center justify-center text-[8px] text-gray-400">
                        +{p.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Latest activity */}
            <div className="mt-3 pt-3 border-t border-white/[0.04] text-[10px] text-gray-500 flex items-center justify-between">
              <span>Latest: {p.latestActivity}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400 flex items-center gap-1">
                Open <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
