'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, Users, Cpu, Palette, FlaskConical, Briefcase, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ParticleField from './ParticleField';

const floatingNodes = [
  { label: 'Engineering', icon: Cpu, color: 'from-cyan-400 to-blue-500', x: '15%', y: '20%', delay: 0 },
  { label: 'Design', icon: Palette, color: 'from-pink-400 to-rose-500', x: '80%', y: '15%', delay: 0.5 },
  { label: 'Research', icon: FlaskConical, color: 'from-purple-400 to-violet-500', x: '75%', y: '70%', delay: 1 },
  { label: 'Business', icon: Briefcase, color: 'from-amber-400 to-orange-500', x: '10%', y: '65%', delay: 1.5 },
  { label: 'Faculty', icon: GraduationCap, color: 'from-green-400 to-emerald-500', x: '50%', y: '80%', delay: 2 },
];

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Layered Background */}
      <div className="absolute inset-0">
        <ParticleField density={60} color="0, 240, 255" connectionDistance={150} speed={0.2} />
      </div>

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.08]" />

      {/* Floating department nodes (desktop only) */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {floatingNodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + node.delay * 0.3, duration: 0.6, ease: 'backOut' }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0, 10, 0],
                x: [0, 8, 0, -8, 0],
              }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08]"
            >
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                <node.icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-400">{node.label}</span>
            </motion.div>
          </motion.div>
        ))}

        {/* Connecting lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <motion.line x1="18%" y1="24%" x2="50%" y2="50%" stroke="url(#hero-grad)" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 2.5 }} />
          <motion.line x1="82%" y1="19%" x2="50%" y2="50%" stroke="url(#hero-grad)" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 2.8 }} />
          <motion.line x1="77%" y1="73%" x2="50%" y2="50%" stroke="url(#hero-grad)" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 3.1 }} />
          <motion.line x1="13%" y1="69%" x2="50%" y2="50%" stroke="url(#hero-grad)" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 3.4 }} />
          <defs>
            <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#8a2be2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-cyan-400 text-sm font-medium mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>The Operating System for Student Innovation</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-[0.95]"
        >
          <span className="text-white">Where Ideas</span>
          <br />
          <span className="text-gradient">Meet Talent</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          CrossThink connects students, faculty, developers, designers, researchers, and innovators
          into one intelligent collaboration ecosystem.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/register')}
            className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all duration-300 border border-cyan-400/30"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-base font-semibold text-gray-300 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
          >
            Explore Projects
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 text-base font-semibold text-gray-300 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <div className="flex -space-x-3">
            {[
              'from-cyan-400 to-blue-500',
              'from-purple-400 to-pink-500',
              'from-amber-400 to-orange-500',
              'from-green-400 to-emerald-500',
              'from-rose-400 to-red-500',
            ].map((gradient, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                className={`w-9 h-9 rounded-full border-2 border-[#050505] bg-gradient-to-br ${gradient}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Join <span className="font-semibold text-gray-300">2,000+</span> innovators already building.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 scroll-indicator"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
