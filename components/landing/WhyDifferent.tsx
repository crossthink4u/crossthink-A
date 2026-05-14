'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertTriangle, Users, Brain, LayoutGrid, GraduationCap, Zap } from 'lucide-react';

const problems = [
  'Disconnected teams across departments',
  'No platform for cross-discipline collaboration',
  'Difficulty finding teammates with right skills',
  'Zero mentorship infrastructure',
  'Scattered tools — WhatsApp, email, Google Docs',
  'Ideas die before they become projects',
];

const solutions = [
  'Intelligent cross-department collaboration',
  'Centralized innovation ecosystem',
  'AI-powered teammate matching',
  'Built-in mentor integration',
  'Unified workspace with all tools',
  'Structured pipeline from idea to launch',
];

const WhyDifferent = () => (
  <section id="why-different" className="py-28 relative overflow-hidden bg-[#0a0a0a]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px]" />
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-cyan-400 text-xs font-medium mb-6 uppercase tracking-wider">Why CrossThink?</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          The Problem We <span className="text-gradient">Solve</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">College project ecosystems are broken. CrossThink fixes them.</motion.p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="relative p-8 rounded-2xl bg-white/[0.01] border border-red-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><X className="w-5 h-5 text-red-400" /></div>
              <div><h3 className="text-lg font-bold text-white">Traditional Approach</h3><p className="text-xs text-gray-500">How it currently works</p></div>
            </div>
            <div className="space-y-4">
              {problems.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"><X className="w-3 h-3 text-red-400" /></div>
                  <span className="text-sm text-gray-400">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* CrossThink */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.2 }} className="relative p-8 rounded-2xl bg-white/[0.02] border border-cyan-500/15 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-purple-500/[0.03] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"><Check className="w-5 h-5 text-cyan-400" /></div>
              <div><h3 className="text-lg font-bold text-white">CrossThink Way</h3><p className="text-xs text-cyan-400/60">How it should work</p></div>
            </div>
            <div className="space-y-4">
              {solutions.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-cyan-500/10 hover:border-cyan-500/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-cyan-400" /></div>
                  <span className="text-sm text-gray-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyDifferent;

