'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Bookmark, Sparkles, Users, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useDashboard } from '@/context/DashboardContext';

const ProjectCard = ({ project, bookmarked, onBookmark, onApply }) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <GlassCard className="p-0 overflow-hidden h-full flex flex-col group">
        <div className="h-32 relative" style={{ background: project.image }}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1 border border-white/30 shadow-lg">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            {project.match}% Match
          </div>
          <button
            type="button"
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
            onClick={() => onBookmark(project.id)}
            className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors border border-white/30 ${bookmarked ? 'bg-white/30 text-yellow-200' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{project.dept}</p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{project.title}</h3>

          <div className="flex-1">
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Looking for:</p>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{project.role}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tech || []).map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{project.size} Filled</span>
            </div>
            <Button size="sm" className="py-1.5 px-4 text-xs" onClick={() => onApply(project)}>
              Apply
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const ProjectsPage = () => {

  const router = useRouter();
  const { projects, bookmarks, toggleBookmark, applyToProject, addProject } = useDashboard();
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minMatch, setMinMatch] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: '', dept: '', role: '', tech: '', tags: '' });
  const openCreateHandled = useRef(false);

  // Note: In Next.js, there's no location.state. Create modal is opened via the Create Project button.

  const filters = ['All', 'Computer Science', 'Design', 'Business', 'Engineering'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if ((p.match ?? 0) < minMatch) return false;
      if (activeFilter !== 'All' && !(p.tags || []).includes(activeFilter)) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.dept} ${p.role} ${(p.tech || []).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [projects, query, activeFilter, minMatch]);

  const submitCreate = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.dept.trim() || !form.role.trim()) return;
    addProject(form);
    setForm({ title: '', dept: '', role: '', tech: '', tags: '' });
    setCreateOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Find the perfect team to join based on your skills.</p>
        </div>
        <Button variant="primary" className="flex-shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <GlassCard className="p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keyword, skill, or department..."
            className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500 dark:text-white"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />
        <Button variant="outline" className="w-full md:w-auto" type="button" onClick={() => setShowFilters((v) => !v)}>
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </GlassCard>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <GlassCard className="p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                Minimum match score: <span className="font-semibold text-gray-900 dark:text-white">{minMatch}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={minMatch}
                  onChange={(e) => setMinMatch(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600"
                />
              </label>
              <Button variant="ghost" size="sm" type="button" onClick={() => setMinMatch(0)}>
                Reset
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === filter
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            bookmarked={bookmarks.includes(project.id)}
            onBookmark={toggleBookmark}
            onApply={applyToProject}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard className="p-10 text-center text-gray-500 dark:text-gray-400 text-sm">No projects match your filters.</GlassCard>
      )}

      <AnimatePresence>
        {createOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create project</h2>
                <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => setCreateOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={submitCreate}>
                <div>
                  <label className="text-xs text-gray-500">Title</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Department / focus</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                    value={form.dept}
                    onChange={(e) => setForm((f) => ({ ...f, dept: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Role you are hiring for</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Tech stack (comma-separated)</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                    value={form.tech}
                    onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))}
                    placeholder="React, Python, …"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Filter tags (comma-separated)</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm dark:text-white outline-none focus:border-blue-500"
                    value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder="Computer Science, Design, …"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    Publish
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;


