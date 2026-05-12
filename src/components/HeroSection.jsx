import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Network } from 'lucide-react';
import Button from './ui/Button';
import GlassCard from './ui/GlassCard';

import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="mesh-bg">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800/50">
              <Sparkles className="w-4 h-4" />
              <span>CrossThink Team A Platform v2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              Where Ideas <br />
              <span className="text-gradient">Meet Talent</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
              CrossThink connects students, faculty, and innovators into one collaborative ecosystem. Build multidisciplinary projects that change the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="group" onClick={() => navigate('/dashboard')}>
                Start Building
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Projects
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-gradient-to-br from-blue-400 to-purple-500" />
                ))}
              </div>
              <p>Join <span className="font-semibold text-gray-900 dark:text-gray-200">2,000+</span> innovators already building.</p>
            </div>
          </motion.div>

          {/* Cinematic Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-20"
            >
              <GlassCard glow className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Neural Optimizer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science & Bio Dept</p>
                  </div>
                  <div className="px-2 py-1 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    Active
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">75%</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">5 Members</span>
                  </div>
                  <Button variant="ghost" size="sm">Join Team</Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Nodes */}
            <motion.div
              animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-0 w-48 z-10"
            >
              <GlassCard className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Match found</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">98% Compatibility</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              animate={{ y: [-20, 20, -20], x: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 left-0 w-56 z-30"
            >
              <GlassCard className="p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Recent Collaboration</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <div className="w-6 h-6 rounded-full bg-pink-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Design + Engineering</p>
                </div>
              </GlassCard>
            </motion.div>
            
            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-20 dark:opacity-40" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,150 C200,200 300,100 400,300" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M400,300 C300,450 150,350 50,500" fill="none" stroke="currentColor" className="text-purple-500" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
