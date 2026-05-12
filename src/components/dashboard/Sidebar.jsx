import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Inbox, 
  GraduationCap, 
  BrainCircuit, 
  SquareKanban,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Bell,
  Search,
  Settings
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { name: 'Overview', path: '/dashboard/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Projects', path: '/dashboard/projects', icon: <FolderKanban className="w-5 h-5" /> },
  { name: 'Teams', path: '/dashboard/teams', icon: <Users className="w-5 h-5" /> },
  { name: 'Applications', path: '/dashboard/applications', icon: <Inbox className="w-5 h-5" /> },
  { name: 'Mentors', path: '/dashboard/mentors', icon: <GraduationCap className="w-5 h-5" /> },
  { name: 'AI Match', path: '/dashboard/ai-match', icon: <BrainCircuit className="w-5 h-5" /> },
  { name: 'Workspace', path: '/dashboard/workspace', icon: <SquareKanban className="w-5 h-5" /> },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen sticky top-0 bg-white/50 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 flex flex-col z-40 transition-all duration-300"
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <Hexagon className="w-8 h-8 text-blue-600 dark:text-cyan-400 flex-shrink-0" fill="currentColor" fillOpacity={0.2} />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-xl tracking-tight whitespace-nowrap"
              >
                Cross<span className="text-gradient">Think</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-cyan-500/10 dark:to-purple-500/10 z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex items-center justify-center ${isCollapsed ? 'mx-auto' : ''}`}>
                  {item.icon}
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="relative z-10 whitespace-nowrap text-sm"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
