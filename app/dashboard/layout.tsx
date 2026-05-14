'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Bell, Hexagon, PanelRightOpen } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import CommandPalette from '@/components/dashboard/overview/CommandPalette';
import RightSidebar from '@/components/dashboard/overview/RightSidebar';
import { DashboardProvider, useDashboard } from '@/context/DashboardContext';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast, toast, toggleRightSidebar } = useDashboard();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleCmd = useCallback(
    (action?: string) => {
      if (action === 'toggle') setCmdOpen((v) => !v);
      else setCmdOpen(false);
    },
    [],
  );

  /* ---------- search ---------- */
  const { projects, teams, mentors } = useDashboard();

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: { type: string; title: string; sub: string; path: string }[] = [];
    projects.forEach((p: any) => {
      if (`${p.title} ${p.dept} ${(p.tech || []).join(' ')}`.toLowerCase().includes(q))
        out.push({ type: 'project', title: p.title, sub: p.dept, path: '/dashboard/projects' });
    });
    teams.forEach((t: any) => {
      if (`${t.name} ${(t.roles || []).join(' ')}`.toLowerCase().includes(q))
        out.push({ type: 'team', title: t.name, sub: t.status, path: '/dashboard/teams' });
    });
    mentors.forEach((m: any) => {
      if (`${m.name} ${m.field}`.toLowerCase().includes(q))
        out.push({ type: 'mentor', title: m.name, sub: m.field, path: '/dashboard/mentors' });
    });
    return out.slice(0, 5);
  }, [searchQuery, projects, teams, mentors]);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 dark:border-white/[0.06] flex items-center gap-4 px-6 flex-shrink-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl z-30">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, teams, mentors…"
              className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500 dark:focus:border-cyan-500/40 dark:text-white placeholder:text-gray-400"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c14] shadow-xl z-50 overflow-hidden">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => { router.push(r.path); setSearchQuery(''); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.05] text-left border-b border-gray-100 dark:border-white/[0.04] last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.title}</p>
                      <p className="text-xs text-gray-500">{r.sub}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 capitalize">{r.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Command shortcut */}
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Command className="w-3 h-3" /> K
          </button>

          {/* Right side actions */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
          </button>
          <button
            onClick={toggleRightSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={toggleCmd} />

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
