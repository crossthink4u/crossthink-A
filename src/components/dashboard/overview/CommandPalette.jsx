import { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, FolderKanban, Users, GraduationCap, Sparkles, SquareKanban, Plus } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

const quickActions = [
  { label: 'Create New Project', icon: Plus, path: '/dashboard/projects', state: { openCreate: true } },
  { label: 'Open Workspace', icon: SquareKanban, path: '/dashboard/workspace' },
  { label: 'Find Teammates', icon: Users, path: '/dashboard/teams' },
  { label: 'AI Match', icon: Sparkles, path: '/dashboard/ai-match' },
  { label: 'Browse Mentors', icon: GraduationCap, path: '/dashboard/mentors' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { projects, teams, mentors } = useDashboard();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose(); else onClose('toggle');
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out = [];
    projects.forEach((p) => {
      if (`${p.title} ${p.dept} ${(p.tech || []).join(' ')}`.toLowerCase().includes(q))
        out.push({ type: 'project', icon: FolderKanban, title: p.title, sub: p.dept, path: '/dashboard/projects' });
    });
    teams.forEach((t) => {
      if (`${t.name} ${(t.roles || []).join(' ')}`.toLowerCase().includes(q))
        out.push({ type: 'team', icon: Users, title: t.name, sub: t.status, path: '/dashboard/teams' });
    });
    mentors.forEach((m) => {
      if (`${m.name} ${m.field}`.toLowerCase().includes(q))
        out.push({ type: 'mentor', icon: GraduationCap, title: m.name, sub: m.field, path: '/dashboard/mentors' });
    });
    return out.slice(0, 6);
  }, [query, projects, teams, mentors]);

  const go = (path, state) => { navigate(path, state ? { state } : undefined); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101]"
          >
            <div className="mx-4 rounded-2xl border border-white/[0.08] bg-[#0c0c14]/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, teams, mentors, or type a command..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-gray-500 font-mono">ESC</kbd>
              </div>

              <div className="max-h-[360px] overflow-y-auto panel-scroll">
                {/* Search Results */}
                {results.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] text-gray-600 px-2 py-1 uppercase tracking-wider">Results</p>
                    {results.map((r, i) => (
                      <button key={i} onClick={() => go(r.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-left transition-colors">
                        <r.icon className="w-4 h-4 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{r.title}</p>
                          <p className="text-[10px] text-gray-500">{r.sub}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-600" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                {query.length < 2 && (
                  <div className="p-2">
                    <p className="text-[10px] text-gray-600 px-2 py-1 uppercase tracking-wider">Quick Actions</p>
                    {quickActions.map((a, i) => (
                      <button key={i} onClick={() => go(a.path, a.state)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-left transition-colors">
                        <a.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-300">{a.label}</span>
                        <ArrowRight className="w-3 h-3 text-gray-600 ml-auto" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
