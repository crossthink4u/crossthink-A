import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, UserPlus, FileEdit, Rocket } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const steps = [
  {
    num: "01",
    title: "Post an Idea",
    description: "Got a brilliant concept? Draft a quick proposal outlining the problem you're solving.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "text-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/20"
  },
  {
    num: "02",
    title: "Find Skilled Teammates",
    description: "Our AI matches your project with students who have the exact skills you need.",
    icon: <UserPlus className="w-8 h-8" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10 dark:bg-blue-500/20"
  },
  {
    num: "03",
    title: "Collaborate Efficiently",
    description: "Use the integrated dashboard to assign tasks, share files, and hold meetings.",
    icon: <FileEdit className="w-8 h-8" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10 dark:bg-purple-500/20"
  },
  {
    num: "04",
    title: "Build Real Projects",
    description: "Launch your prototype, present to mentors, and even attract seed funding.",
    icon: <Rocket className="w-8 h-8" />,
    color: "text-green-500",
    bg: "bg-green-500/10 dark:bg-green-500/20"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="From Concept to Launch"
          subtitle="A streamlined pipeline designed to turn your late-night thoughts into tangible products."
        />

        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Number Watermark */}
                <span className="absolute -top-10 -right-4 text-8xl font-bold text-gray-200 dark:text-white/[0.03] select-none pointer-events-none font-display">
                  {step.num}
                </span>

                <div className="bg-white dark:bg-[#121212] rounded-2xl p-8 border border-gray-100 dark:border-white/5 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${step.bg} ${step.color}`}>
                    {step.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
