import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, GitPullRequest, Calendar, CheckCircle, Clock } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Command Center"
          subtitle="A unified workspace to track progress, manage code, and communicate with your team."
        />

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden bg-white dark:bg-[#0a0a0a]"
        >
          {/* Mockup Header */}
          <div className="h-12 bg-gray-100 dark:bg-[#121212] border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-md px-32 py-1 text-xs text-gray-400 font-mono">
              crossthink.app/dashboard/neural-optimizer
            </div>
          </div>

          {/* Mockup Body */}
          <div className="flex h-[500px]">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 dark:border-white/10 p-4 hidden md:block">
              <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  NO
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Neural Optimizer</h4>
                  <p className="text-xs text-gray-500">Workspace</p>
                </div>
              </div>
              
              <div className="space-y-1">
                {[
                  { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", active: true },
                  { icon: <CheckCircle className="w-4 h-4" />, label: "Tasks" },
                  { icon: <GitPullRequest className="w-4 h-4" />, label: "GitHub" },
                  { icon: <MessageSquare className="w-4 h-4" />, label: "Chat" },
                  { icon: <Calendar className="w-4 h-4" />, label: "Meetings" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${item.active ? 'bg-blue-50 dark:bg-white/10 text-blue-600 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 dark:bg-[#050505] overflow-hidden flex flex-col gap-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Overview</h3>
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#050505] bg-gray-300 dark:bg-gray-700" />
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#050505] bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center text-xs text-gray-500">
                     +2
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <GlassCard className="p-4" glow={false} hover={false}>
                  <p className="text-xs text-gray-500 mb-1">Sprint Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">68%</p>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="w-[68%] h-full bg-blue-500" />
                  </div>
                </GlassCard>
                <GlassCard className="p-4" glow={false} hover={false}>
                  <p className="text-xs text-gray-500 mb-1">Open PRs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  <p className="text-xs text-green-500 mt-2">↑ 1 since yesterday</p>
                </GlassCard>
                <GlassCard className="p-4" glow={false} hover={false}>
                  <p className="text-xs text-gray-500 mb-1">Upcoming Meeting</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">Mentor Review</p>
                  <p className="text-xs text-blue-500 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> In 2 hours</p>
                </GlassCard>
              </div>

              <div className="flex-1 bg-white dark:bg-[#121212] rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {[
                    { user: "Sarah J.", action: "merged PR #42", time: "10 min ago", color: "text-purple-500", dot: "bg-purple-500" },
                    { user: "Alex T.", action: "completed task 'Design System'", time: "1 hour ago", color: "text-green-500", dot: "bg-green-500" },
                    { user: "Dr. Chen", action: "left a comment on 'Architecture Draft'", time: "3 hours ago", color: "text-amber-500", dot: "bg-amber-500" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${act.dot}`} />
                      <p className="text-gray-900 dark:text-gray-200">
                        <span className="font-medium">{act.user}</span> {act.action}
                      </p>
                      <span className="text-gray-500 text-xs ml-auto">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
