'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  icon,
  ...props 
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out overflow-hidden rounded-full";
  
  const variants: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(0,85,255,0.4)] hover:shadow-[0_0_30px_rgba(0,85,255,0.6)] border border-blue-500/50",
    secondary: "glass text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/10 border-gray-200 dark:border-white/10",
    outline: "border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]",
    ghost: "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5",
  };

  const sizes: Record<string, string> = {
    sm: "text-sm px-4 py-2",
    default: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
    icon: "p-3",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="ml-1">{icon}</span>}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;


 
