import React from 'react';
import { motion } from 'framer-motion';
import {
  Search, BrainCircuit, GraduationCap, MessageSquare,
  GitBranch, LayoutGrid, BarChart3, ListTodo, Users
} from 'lucide-react';

const features = [
  {
    title: 'Project Discovery',
    description: 'Browse and filter projects by tech stack, domain, team size, or department. Find the perfect project to join or get inspired to create your own.',
    icon: Search,
    color: 'from-cyan-400 to-blue-500',
    span: 'bento-wide',
  },
  {
    title: 'AI Smart Matching',
    description: 'Our proprietary algorithm connects you with perfect teammates based on skills, interests, and availability.',
    icon: BrainCircuit,
    color: 'from-purple-400 to-violet-500',
    span: '',
  },
  {
    title: 'Mentor Integration',
    description: 'Get guidance from experienced faculty and industry professionals who actively mentor student teams.',
    icon: GraduationCap,
    color: 'from-green-400 to-emerald-500',
    span: '',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Chat, share files, and hold meetings — all within your project workspace. Stay connected with your team 24/7.',
    icon: MessageSquare,
    color: 'from-pink-400 to-rose-500',
    span: '',
  },
  {
    title: 'GitHub Integration',
    description: 'Connect your repositories. Track commits, PRs, and issues directly from your CrossThink dashboard.',
    icon: GitBranch,
    color: 'from-gray-400 to-gray-500',
    span: 'bento-wide',
  },
  {
    title: 'Team Workspaces',
    description: 'Dedicated workspaces for every project with Kanban boards, document storage, and collaboration tools.',
    icon: LayoutGrid,
    color: 'from-blue-400 to-indigo-500',
    span: '',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track project progress, team productivity, and individual contributions with beautiful visualizations.',
    icon: BarChart3,
    color: 'from-amber-400 to-orange-500',
    span: '',
  },
  {
    title: 'Task Management',
    description: 'Create, assign, and track tasks with priority levels, due dates, and sprint planning capabilities.',
    icon: ListTodo,
    color: 'from-red-400 to-rose-500',
    span: '',
  },
  {
    title: 'Cross-Department Teams',
    description: 'Build diverse teams spanning multiple departments. Engineers, designers, business students — all working together.',
    icon: Users,
    color: 'from-teal-400 to-cyan-500',
    span: '',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/[0.05] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-cyan-400 text-xs font-medium mb-6 uppercase tracking-wider"
          >
            Platform Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight"
          >
            Everything You Need to{' '}
            <span className="text-gradient">Innovate</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A comprehensive toolkit designed for modern student teams building real-world products.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative ${feature.span}`}
            >
              <div className="relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                {/* Shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
