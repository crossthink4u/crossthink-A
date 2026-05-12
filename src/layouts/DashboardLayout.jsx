import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Settings } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#050505] selection:bg-blue-500/30 selection:text-blue-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-100 overflow-hidden">
      
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-blue-900/20 blur-[150px] rounded-full" />
      </div>

      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-20 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 sticky top-0 z-30">
          
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects, skills, mentors..." 
                className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500/50 dark:focus:border-cyan-500/50 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none transition-all dark:text-white shadow-inner focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <ThemeToggle />
            
            <button className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0a0a0a]" />
            </button>
            
            <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-2" />

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">Alex Turner</p>
                <p className="text-xs text-gray-500">Computer Science</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
