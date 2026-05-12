import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Code, Palette, ChartBar, Bookmark, Sparkles } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const projects = [
  { id: 1, title: 'Neural Optimizer Framework', dept: 'CS + Biology', size: '5/6', match: 98, role: 'Frontend Engineer', tech: ['React', 'Python', 'TensorFlow'], image: 'linear-gradient(135deg, #00f0ff 0%, #0055ff 100%)' },
  { id: 2, title: 'Eco-Tracking App', dept: 'Design + Env Sci', size: '2/4', match: 85, role: 'UI/UX Designer', tech: ['Figma', 'Swift'], image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { id: 3, title: 'FinTech Market Predictor', dept: 'Finance + CS', size: '3/5', match: 92, role: 'Data Scientist', tech: ['Python', 'Pandas', 'AWS'], image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { id: 4, title: 'Virtual Reality Campus Tour', dept: 'Arts + Engineering', size: '4/8', match: 78, role: '3D Artist', tech: ['Unity', 'Blender', 'C#'], image: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
];

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard className="p-0 overflow-hidden h-full flex flex-col group">
        <div className="h-32 relative" style={{ background: project.image }}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1 border border-white/30 shadow-lg">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            {project.match}% Match
          </div>
          <button className="absolute bottom-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors border border-white/30">
            <Bookmark className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{project.dept}</p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Looking for:</p>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{project.role}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, i) => (
                <span key={i} className="px-2 py-1 text-[10px] rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">
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
            <Button size="sm" className="py-1.5 px-4 text-xs">Apply</Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Re-import Users here since it was missing in the top imports
import { Users } from 'lucide-react';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Computer Science', 'Design', 'Business', 'Engineering'];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Find the perfect team to join based on your skills.</p>
        </div>
        <Button variant="primary" className="flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <GlassCard className="p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by keyword, skill, or department..." 
            className="w-full bg-transparent border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500 dark:text-white"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </GlassCard>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg' 
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
