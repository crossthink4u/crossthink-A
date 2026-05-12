import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';

const GlassCard = ({ children, className, hover = true, glow = false, ...props }) => {
  return (
    <motion.div
      className={cn(
        "glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300",
        hover && "hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-[0_8px_30px_rgba(0,240,255,0.1)]",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute -inset-[100%] z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 pointer-events-none group-hover:animate-[shimmer_2s_infinite]" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
