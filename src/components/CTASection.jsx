import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Button from './ui/Button';

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-blue-600 dark:bg-[#050505]">
        <div className="absolute inset-0 opacity-20 dark:opacity-40" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)` , backgroundSize: '40px 40px' }} />
      </div>

      <div className="glow-bg mix-blend-screen opacity-50 dark:opacity-100" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Join the Beta Program</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Build The Future <br/> Together
          </h2>
          
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop waiting for the perfect team. CrossThink brings the talent to you. Join thousands of innovators building the next big thing.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50">
              Request Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
