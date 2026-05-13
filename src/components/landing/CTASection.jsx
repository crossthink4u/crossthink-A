import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FolderPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleField from './ParticleField';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        <ParticleField density={40} color="138, 43, 226" connectionDistance={100} speed={0.15} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-purple-400 text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Ready to build something amazing?
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Build The Future<br /><span className="text-gradient">Together</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the next generation of student innovators, builders, and mentors.
            Your next breakthrough project starts here.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/register')}
              className="group px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)] transition-all duration-300 border border-cyan-400/30">
              <span className="flex items-center justify-center gap-2">Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 text-base font-semibold text-gray-300 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2">
              <FolderPlus className="w-4 h-4" /> Create Project
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 text-base font-semibold text-gray-300 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Join Community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
