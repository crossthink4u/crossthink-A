'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FolderKanban, Users, FileText,
  GraduationCap, BrainCircuit, SquareKanban, ChevronLeft,
  ChevronRight, Hexagon,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard/overview' },
  { label: 'Projects', icon: FolderKanban, href: '/dashboard/projects' },
  { label: 'Teams', icon: Users, href: '/dashboard/teams' },
  { label: 'Applications', icon: FileText, href: '/dashboard/applications' },
  { label: 'Mentors', icon: GraduationCap, href: '/dashboard/mentors' },
  { label: 'AI Match', icon: BrainCircuit, href: '/dashboard/ai-match' },
  { label: 'Workspace', icon: SquareKanban, href: '/dashboard/workspace' },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full flex flex-col border-r border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 gap-3 border-b border-gray-200 dark:border-white/[0.06] flex-shrink-0">
        <div className="flex-shrink-0">
          <Hexagon className="w-8 h-8 text-violet-600 dark:text-purple-400" fill="currentColor" fillOpacity={0.2} />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg tracking-tight whitespace-nowrap">
            Cross<span className="text-gradient">Think</span><span className="font-normal text-gray-500">: by Iris</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard/overview' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-violet-50 dark:bg-white/[0.08] text-violet-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
              {!collapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-gray-200 dark:border-white/[0.06]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
