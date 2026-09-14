'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, GitPullRequest, Users, Inbox, Sparkles, Clock } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'Yesterday' : `${d}d ago`;
}

const iconMap = {
  check: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  pr: { icon: GitPullRequest, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  users: { icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  inbox: { icon: Inbox, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  spark: { icon: Sparkles, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  clock: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

export default function ActivityFeed() {
  const { activity } = useDashboard();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
      <h2 className="text-base font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-1 max-h-[340px] overflow-y-auto panel-scroll">
        {activity.slice(0, 10).map((item, i) => {
          const cfg = iconMap[item.type] || iconMap.clock;
          const Icon = cfg.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i + 0.3, duration: 0.25 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
            >
              <div className={`w-7 h-7 shrink-0 rounded-full ${cfg.bg} flex items-center justify-center mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{item.title}</p>
                <p className="text-[11px] text-gray-500 truncate">{item.desc}</p>
              </div>
              <span className="text-[10px] text-gray-600 shrink-0 mt-0.5">{formatRelative(item.createdAt)}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}


