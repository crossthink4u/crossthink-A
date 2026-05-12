import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Activity } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const AIMatching = () => {
  return (
    <section id="ai-matching" className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Dark section specifically for AI pop effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Core Orb */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 60px -15px rgba(0,240,255,0.5)",
                  "0 0 100px -10px rgba(138,43,226,0.6)",
                  "0 0 60px -15px rgba(0,240,255,0.5)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 blur-[2px] z-20 flex items-center justify-center"
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 rounded-full border border-white/10 border-dashed"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#121212] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-[#121212] border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] rounded-full border border-white/5"
            >
               <GlassCard className="absolute top-1/4 -left-4 w-32 p-3 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                 <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 rounded-full bg-green-400" />
                   <span className="text-xs text-gray-300 font-medium">Developer</span>
                 </div>
                 <p className="text-[10px] text-gray-500">Match: 99%</p>
               </GlassCard>

               <GlassCard className="absolute bottom-1/4 -right-4 w-32 p-3 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                 <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 rounded-full bg-pink-400" />
                   <span className="text-xs text-gray-300 font-medium">Designer</span>
                 </div>
                 <p className="text-[10px] text-gray-500">Match: 95%</p>
               </GlassCard>
            </motion.div>
          </div>

          {/* Text Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-sm font-medium mb-6 border border-purple-800/50">
              <Sparkles className="w-4 h-4" />
              <span>Proprietary Algorithm</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Don't search for talent.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Let it find you.</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our AI analyzes project requirements, parses technical skills, and evaluates complementary soft skills to form the ultimate dream team.
            </p>

            <div className="space-y-6">
              {[
                { title: "Skill Gap Analysis", desc: "Automatically identifies missing expertise in your current roster." },
                { title: "Cross-Discipline Synergy", desc: "Prioritizes matches outside your department for diverse perspectives." },
                { title: "Availability Sync", desc: "Matches based on schedules to ensure timezone and meeting compatibility." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIMatching;
