'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus, Users, GraduationCap, SquareKanban, FolderSearch, Sparkles } from 'lucide-react';

const actions = [
  { label: 'Create Project', icon: Plus, color: 'from-purple-500 to-violet-600', path: '/dashboard/projects', state: { openCreate: true } },
  { label: 'Find Teammates', icon: Users, color: 'from-purple-500 to-pink-500', path: '/dashboard/teams' },
  { label: 'Request Mentor', icon: GraduationCap, color: 'from-amber-500 to-orange-500', path: '/dashboard/mentors' },
  { label: 'Open Workspace', icon: SquareKanban, color: 'from-green-500 to-emerald-500', path: '/dashboard/workspace' },
  { label: 'Browse Projects', icon: FolderSearch, color: 'from-violet-500 to-indigo-500', path: '/dashboard/projects' },
  { label: 'AI Match', icon: Sparkles, color: 'from-rose-500 to-purple-500', path: '/dashboard/ai-match' },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.15, duration: 0.3 }}
            onClick={() => router.push(a.path)}
            className="group relative flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden"
          >
            {/* Glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.08] bg-gradient-to-br ${a.color} transition-opacity duration-300 pointer-events-none`} />
            <div className={`relative z-10 w-9 h-9 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg`}>
              <a.icon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="relative z-10 text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center leading-tight">
              {a.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
