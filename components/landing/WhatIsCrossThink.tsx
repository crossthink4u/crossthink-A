'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, FolderPlus, UserPlus, GraduationCap, BrainCircuit, LayoutGrid } from 'lucide-react';

const concepts = [
  {
    icon: Users,
    title: 'Cross-Department Collaboration',
    description: 'Students from CS, Design, Business, Biology, and more come together to build interdisciplinary projects that no single department could create alone.',
    color: 'from-cyan-400 to-blue-500',
    shadowColor: 'shadow-cyan-500/20',
  },
  {
    icon: FolderPlus,
    title: 'Project Creation',
    description: 'Launch project proposals with detailed briefs, required skills, and timelines. Turn your ideas from rough concepts into structured initiatives.',
    color: 'from-purple-400 to-violet-500',
    shadowColor: 'shadow-purple-500/20',
  },
  {
    icon: UserPlus,
    title: 'Team Recruitment',
    description: 'Recruit the exact talent you need. Post open roles, review applications, and build diverse teams with complementary skill sets.',
    color: 'from-pink-400 to-rose-500',
    shadowColor: 'shadow-pink-500/20',
  },
  {
    icon: GraduationCap,
    title: 'Faculty Mentorship',
    description: 'Faculty members join as mentors, providing guidance, feedback, and industry connections that transform student projects into real innovations.',
    color: 'from-green-400 to-emerald-500',
    shadowColor: 'shadow-green-500/20',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Matching',
    description: 'Our intelligent algorithm analyzes skills, interests, and availability to recommend the perfect teammates, projects, and mentors for you.',
    color: 'from-amber-400 to-orange-500',
    shadowColor: 'shadow-amber-500/20',
  },
  {
    icon: LayoutGrid,
    title: 'Unified Workspaces',
    description: 'Kanban boards, file sharing, GitHub integration, and real-time chat — everything your team needs in one centralized workspace.',
    color: 'from-blue-400 to-indigo-500',
    shadowColor: 'shadow-blue-500/20',
  },
];

const WhatIsCrossThink = () => {
  return (
    <section id="what-is" className="py-28 relative overflow-hidden bg-[#0a0a0a]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-cyan-400 text-xs font-medium mb-6 uppercase tracking-wider"
          >
            What is CrossThink?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight"
          >
            The Operating System for{' '}
            <span className="text-gradient">Student Innovation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            CrossThink is a centralized platform where students, faculty, and innovators converge
            to discover, build, and launch real-world projects together.
          </motion.p>
        </div>

        {/* Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {concepts.map((concept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                {/* Hover glow */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${concept.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 blur-xl`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${concept.color} flex items-center justify-center mb-5 ${concept.shadowColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <concept.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {concept.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {concept.description}
                </p>

                {/* Bottom shine on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {['Students', 'Faculty', 'Designers', 'Developers', 'Researchers'].map((role, i) => (
              <React.Fragment key={role}>
                {i > 0 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                    className="hidden sm:block w-8 h-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50"
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300 font-medium"
                >
                  {role}
                </motion.div>
              </React.Fragment>
            ))}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="hidden sm:block w-8 h-px bg-gradient-to-r from-purple-500/50 to-cyan-500/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.5, type: 'spring' }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-sm text-cyan-400 font-semibold"
            >
              CrossThink ✦
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsCrossThink;

