import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, FolderKanban, Users, GraduationCap, X, Plus, PanelRightOpen, Command } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
import CommandPalette from '../components/dashboard/overview/CommandPalette';
import RightSidebar from '../components/dashboard/overview/RightSidebar';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

function formatSearchLabel(type) {
  if (type === 'project') return 'Project';
  if (type === 'team') return 'Team';
  if (type === 'mentor') return 'Mentor';
  return '';
}

const createMenuItems = [
  { label: 'New Project', path: '/dashboard/projects', state: { openCreate: true } },
  { label: 'Invite Member', path: '/dashboard/teams' },
  { label: 'Request Mentor', path: '/dashboard/mentors' },
  { label: 'Open Workspace', path: '/dashboard/workspace' },
];

function DashboardShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const {
    user,
    projects,
    teams,
    mentors,
    headerSearch,
    setHeaderSearch,
    notificationCount,
    clearNotifications,
    toast,
    dismissToast,
    toggleRightSidebar,
  } = useDashboard();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const searchWrapRef = useRef(null);
  const createRef = useRef(null);

  const results = useMemo(() => {
    const q = headerSearch.trim().toLowerCase();
    if (q.length < 2) return [];
    const out = [];
    projects.forEach((p) => {
      const hay = `${p.title} ${p.dept} ${p.role} ${(p.tech || []).join(' ')}`.toLowerCase();
      if (hay.includes(q)) out.push({ type: 'project', id: p.id, title: p.title, subtitle: p.dept, to: '/dashboard/projects' });
    });
    teams.forEach((t) => {
      const hay = `${t.name} ${(t.roles || []).join(' ')} ${t.status}`.toLowerCase();
      if (hay.includes(q)) out.push({ type: 'team', id: t.id, title: t.name, subtitle: t.status, to: '/dashboard/teams' });
    });
    mentors.forEach((m) => {
      const hay = `${m.name} ${m.field}`.toLowerCase();
      if (hay.includes(q)) out.push({ type: 'mentor', id: m.id, title: m.name, subtitle: m.field, to: '/dashboard/mentors' });
    });
    return out.slice(0, 8);
  }, [headerSearch, projects, teams, mentors]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!searchWrapRef.current?.contains(e.target)) setSearchOpen(false);
      if (!createRef.current?.contains(e.target)) setCreateMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const handleCmdPalette = useCallback((action) => {
    if (action === 'toggle') setCmdPaletteOpen(true);
    else setCmdPaletteOpen(false);
  }, []);

  const iconFor = (type) => {
    if (type === 'project') return <FolderKanban className="w-4 h-4 text-blue-500" />;
    if (type === 'team') return <Users className="w-4 h-4 text-purple-500" />;
    return <GraduationCap className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#050505] selection:bg-blue-500/30 selection:text-blue-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-100 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-blue-900/20 blur-[150px] rounded-full" />
      </div>

      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        <header className="h-16 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          {/* Search */}
          <div className="flex-1 max-w-md relative" ref={searchWrapRef}>
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => {
                  setHeaderSearch(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500/50 dark:focus:border-cyan-500/50 rounded-lg pl-9 pr-16 py-2 text-sm outline-none transition-all dark:text-white"
              />
              <button
                onClick={() => setCmdPaletteOpen(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-gray-500 font-mono hover:bg-white/[0.1] transition-colors"
              >
                <Command className="w-3 h-3" />K
              </button>
              {headerSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => { setHeaderSearch(''); setSearchOpen(false); }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <AnimatePresence>
              {searchOpen && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-xl overflow-hidden z-50"
                >
                  {results.map((r) => (
                    <Link
                      key={`${r.type}-${r.id}`}
                      to={r.to}
                      onClick={() => { setSearchOpen(false); setHeaderSearch(''); }}
                      className="flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5 last:border-0"
                    >
                      <div className="shrink-0">{iconFor(r.type)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{r.title}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {formatSearchLabel(r.type)} · {r.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {/* Create dropdown */}
            <div className="relative" ref={createRef}>
              <button
                onClick={() => setCreateMenuOpen(!createMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Create
              </button>
              <AnimatePresence>
                {createMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-xl overflow-hidden z-50"
                  >
                    {createMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { navigate(item.path, item.state ? { state: item.state } : undefined); setCreateMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => { clearNotifications(); navigate('/dashboard/applications'); }}
              className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[8px] h-2 px-0.5 bg-red-500 rounded-full border border-white dark:border-[#0a0a0a]" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleRightSidebar}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              title="Control Panel"
            >
              <PanelRightOpen className="w-4.5 h-4.5" />
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1" />

            <Link to="/dashboard/overview" className="flex items-center gap-2 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] text-gray-500">{user.major}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Profile"
                  className="w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
                />
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-6">
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

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[calc(100%-2rem)]"
            >
              <button
                type="button"
                onClick={dismissToast}
                className={`w-full text-left rounded-2xl px-4 py-3 shadow-lg border text-sm font-medium backdrop-blur-xl ${
                  toast.variant === 'warn'
                    ? 'bg-amber-50/95 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-50'
                    : 'bg-white/95 dark:bg-[#0a0a0a]/95 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white'
                }`}
              >
                {toast.message}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Command Palette */}
      <CommandPalette isOpen={cmdPaletteOpen} onClose={handleCmdPalette} />

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardShell />
    </DashboardProvider>
  );
}
