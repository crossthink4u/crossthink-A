'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, GitCommit, Clock, Users, CheckSquare } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const num = typeof value === 'string' ? parseInt(value, 10) : value;
        if (isNaN(num)) { setDisplay(value); return; }
        const dur = 800;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const p = Math.min(elapsed / dur, 1);
          setDisplay(Math.round(p * num));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const metrics = [
  { key: 'tasksCompletedThisWeek', label: 'Tasks Done', icon: CheckSquare, color: 'text-green-400', suffix: '' },
  { key: 'projectProgressIncrease', label: 'Progress ↑', icon: TrendingUp, color: 'text-cyan-400', suffix: '%' },
  { key: 'contributionStreak', label: 'Streak', icon: Flame, color: 'text-orange-400', suffix: 'd' },
  { key: 'collaborationScore', label: 'Collab Score', icon: Users, color: 'text-purple-400', suffix: '' },
  { key: 'githubCommits', label: 'Commits', icon: GitCommit, color: 'text-blue-400', suffix: '' },
  { key: 'activeHours', label: 'Active Hrs', icon: Clock, color: 'text-amber-400', suffix: 'h' },
];

export default function ProductivityInsights() {
  const { productivity } = useDashboard();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
      <h2 className="text-base font-semibold text-white mb-4">Productivity Insights</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const val = productivity[m.key];
          return (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.35, duration: 0.3 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center hover:bg-white/[0.04] transition-all"
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${m.color}`} />
              <p className="text-xl font-bold text-white mb-0.5">
                <AnimatedCounter value={val} suffix={m.suffix} />
              </p>
              <p className="text-[10px] text-gray-500">{m.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}


