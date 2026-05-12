import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ value, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const duration = 2000;
      const incrementTime = (duration / end) * 5; // Adjust speed
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 font-medium">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 relative border-y border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-200 dark:divide-white/10">
          <StatCounter value="1250" suffix="+" label="Active Projects" />
          <StatCounter value="5000" suffix="+" label="Students Connected" />
          <StatCounter value="300" suffix="+" label="Mentors" />
          <StatCounter value="25" suffix="" label="Departments" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
