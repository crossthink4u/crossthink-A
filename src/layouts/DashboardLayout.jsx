import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, FolderKanban, Users, GraduationCap, X } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

function formatSearchLabel(type) {
  if (type === 'project') return 'Project';
  if (type === 'team') return 'Team';
  if (type === 'mentor') return 'Mentor';
  return '';
}

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
  } = useDashboard();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchWrapRef = useRef(null);

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
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
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
        <header className="h-20 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex-1 max-w-xl relative" ref={searchWrapRef}>
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => {
                  setHeaderSearch(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search projects, skills, mentors..."
                className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500/50 dark:focus:border-cyan-500/50 rounded-full pl-10 pr-10 py-2.5 text-sm outline-none transition-all dark:text-white shadow-inner focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              />
              {headerSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setHeaderSearch('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
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
                      onClick={() => {
                        setSearchOpen(false);
                        setHeaderSearch('');
                      }}
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

          <div className="flex items-center gap-4 ml-8">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => {
                clearNotifications();
                navigate('/dashboard/applications');
              }}
              className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[8px] h-2 px-0.5 bg-red-500 rounded-full border border-white dark:border-[#0a0a0a]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard/overview')}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              title="Workspace settings (demo)"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-2" />

            <Link to="/dashboard/overview" className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.major}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Profile"
                  className="w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
                />
              </div>
            </Link>
          </div>
        </header>

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
