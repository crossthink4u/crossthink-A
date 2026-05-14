'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CheckCircle, GitPullRequest, MessageSquare, Calendar,
  Clock, TrendingUp, Users, Star, ChevronRight
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'kanban', label: 'Kanban', icon: CheckCircle },
  { id: 'github', label: 'GitHub', icon: GitPullRequest },
];

const OverviewContent = () => (
  <div className="flex-1 p-5 bg-[#060606] overflow-hidden flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h3 className="text-base font-bold text-white">Project Overview</h3>
      <div className="flex -space-x-2">
        {['from-cyan-400 to-blue-500', 'from-purple-400 to-pink-500', 'from-amber-400 to-orange-500'].map((g, i) => (
          <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#060606] bg-gradient-to-br ${g}`} />
        ))}
        <div className="w-7 h-7 rounded-full border-2 border-[#060606] bg-[#1a1a1a] flex items-center justify-center text-[10px] text-gray-500">+2</div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Sprint Progress', value: '68%', bar: true, barWidth: '68%' },
        { label: 'AI Suggestions', value: '12', sub: '3 new today', subColor: 'text-cyan-400' },
        { label: 'Mentor Review', value: 'In 2h', sub: 'Dr. Chen', subColor: 'text-amber-400' },
      ].map((stat, i) => (
        <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-gray-500 mb-1">{stat.label}</p>
          <p className="text-lg font-bold text-white">{stat.value}</p>
          {stat.bar && (
            <div className="w-full h-1 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: stat.barWidth }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
          )}
          {stat.sub && <p className={`text-[10px] mt-1 ${stat.subColor}`}>{stat.sub}</p>}
        </div>
      ))}
    </div>

    <div className="flex-1 bg-[#0d0d0d] rounded-xl border border-white/[0.06] p-3 overflow-hidden">
      <h4 className="text-xs font-semibold text-white mb-3">Recent Activity</h4>
      <div className="space-y-3">
        {[
          { user: 'Sarah J.', action: 'merged PR #42', time: '10m', dot: 'bg-purple-500' },
          { user: 'Alex T.', action: "completed 'Design System'", time: '1h', dot: 'bg-green-500' },
          { user: 'Dr. Chen', action: 'left feedback on Architecture', time: '3h', dot: 'bg-amber-500' },
        ].map((act, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${act.dot} flex-shrink-0`} />
            <span className="text-gray-300"><span className="font-medium text-white">{act.user}</span> {act.action}</span>
            <span className="text-gray-600 ml-auto text-[10px]">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const KanbanContent = () => (
  <div className="flex-1 p-5 bg-[#060606] overflow-hidden">
    <div className="grid grid-cols-3 gap-3 h-full">
      {[
        { title: 'To Do', count: 4, color: 'bg-gray-500', cards: ['Setup CI/CD', 'Design onboarding', 'API schema'] },
        { title: 'In Progress', count: 3, color: 'bg-cyan-500', cards: ['Dashboard UI', 'Auth flow'] },
        { title: 'Done', count: 7, color: 'bg-green-500', cards: ['Project setup', 'Database design', 'Wireframes'] },
      ].map((col, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${col.color}`} />
            <span className="text-xs font-medium text-white">{col.title}</span>
            <span className="text-[10px] text-gray-500 ml-auto">{col.count}</span>
          </div>
          {col.cards.map((card, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + j * 0.1 }}
              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-gray-300 hover:border-white/10 transition-colors cursor-pointer"
            >
              {card}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const GithubContent = () => (
  <div className="flex-1 p-5 bg-[#060606] overflow-hidden flex flex-col gap-3">
    <div className="flex items-center gap-2 mb-1">
      <GitPullRequest className="w-4 h-4 text-green-400" />
      <span className="text-sm font-bold text-white">Pull Requests</span>
    </div>
    {[
      { title: 'feat: Add AI matching algorithm', author: 'sarah-j', status: 'open', additions: 342, deletions: 12 },
      { title: 'fix: Dashboard performance', author: 'alex-t', status: 'merged', additions: 28, deletions: 45 },
      { title: 'docs: Update API reference', author: 'mentor-chen', status: 'open', additions: 156, deletions: 0 },
    ].map((pr, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + i * 0.15 }}
        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3"
      >
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${pr.status === 'merged' ? 'bg-purple-500' : 'bg-green-500'}`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{pr.title}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">by {pr.author}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] flex-shrink-0">
          <span className="text-green-400">+{pr.additions}</span>
          <span className="text-red-400">-{pr.deletions}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section id="dashboard-preview" className="py-28 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-cyan-400 text-xs font-medium mb-6 uppercase tracking-wider"
          >
            Live Platform Preview
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight"
          >
            Your{' '}
            <span className="text-gradient">Command Center</span>
          </motion.h2>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden bg-[#0a0a0a]"
          style={{ perspective: '1000px' }}
        >
          {/* Browser chrome */}
          <div className="h-11 bg-[#111] border-b border-white/[0.06] flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="mx-auto bg-[#1a1a1a] border border-white/[0.05] rounded-md px-16 md:px-28 py-1 text-[10px] text-gray-500 font-mono">
              crossthink.app/dashboard
            </div>
          </div>

          <div className="flex h-[420px] md:h-[480px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/[0.06] p-3 hidden md:flex flex-col">
              <div className="flex items-center gap-2 mb-6 px-2">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                  NO
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Neural Optimizer</h4>
                  <p className="text-[10px] text-gray-500">Workspace</p>
                </div>
              </div>

              {/* Tab navigation */}
              <div className="space-y-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/[0.08] text-white font-medium'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* AI section */}
              <div className="mt-auto p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Star className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-medium text-white">AI Insights</span>
                </div>
                <p className="text-[9px] text-gray-400 leading-relaxed">3 new teammate recommendations available</p>
              </div>
            </div>

            {/* Main Content - Animated tab switching */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex">
                  <OverviewContent />
                </motion.div>
              )}
              {activeTab === 'kanban' && (
                <motion.div key="kanban" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex">
                  <KanbanContent />
                </motion.div>
              )}
              {activeTab === 'github' && (
                <motion.div key="github" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex">
                  <GithubContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;

