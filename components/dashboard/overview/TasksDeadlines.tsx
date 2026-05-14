'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

const tabs = ['overdue', 'today', 'upcoming'];

function priorityStyle(p) {
  if (p === 'urgent') return { dot: 'bg-red-500', badge: 'bg-red-500/10 text-red-400', label: 'Urgent' };
  if (p === 'medium') return { dot: 'bg-amber-500', badge: 'bg-amber-500/10 text-amber-400', label: 'Medium' };
  return { dot: 'bg-blue-500', badge: 'bg-blue-500/10 text-blue-400', label: 'Planned' };
}

export default function TasksDeadlines() {
  const { overviewTasks, toggleTaskDone } = useDashboard();
  const [tab, setTab] = useState('today');

  const now = new Date();
  const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);

  const categorized = {
    overdue: overviewTasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < todayStart),
    today: overviewTasks.filter((t) => { const d = new Date(t.dueDate); return t.status !== 'done' && d >= todayStart && d <= todayEnd; }),
    upcoming: overviewTasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) > todayEnd),
  };

  const filtered = categorized[tab] || [];
  const overdueCount = categorized.overdue.length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Tasks & Deadlines</h2>
        {overdueCount > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" /> {overdueCount} overdue
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
              tab === t ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t} {categorized[t].length > 0 && <span className="ml-1 text-[10px] opacity-60">({categorized[t].length})</span>}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto panel-scroll">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <Clock className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No {tab} tasks</p>
            </motion.div>
          ) : (
            filtered.map((task) => {
              const ps = priorityStyle(task.priority);
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="group flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                >
                  <button onClick={() => toggleTaskDone(task.id)} className="mt-0.5 shrink-0 text-gray-600 hover:text-cyan-400 transition-colors">
                    {task.status === 'done' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-gray-600' : 'text-white'}`}>
                        {task.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-gray-500">{task.project}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${ps.badge}`}>{ps.label}</span>
                      <span className="text-[10px] text-gray-600">
                        {new Date(task.dueDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex -space-x-1.5 shrink-0">
                    {task.assignees.slice(0, 2).map((a, j) => (
                      <div key={j} className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-[#0a0a0a] flex items-center justify-center text-[8px] text-white font-medium">
                        {a.charAt(0)}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


