import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Search, Repeat, GraduationCap, BrainCircuit, LayoutDashboard } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const features = [
  {
    title: 'User Authentication',
    description: 'Secure, seamless login for students and faculty using university credentials.',
    icon: <Fingerprint className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
    delay: 0.1
  },
  {
    title: 'Project Discovery',
    description: 'Browse innovative ideas across departments. Find exactly what sparks your interest.',
    icon: <Search className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600',
    delay: 0.2
  },
  {
    title: 'Cross-Department Collaboration',
    description: 'Break silos. Engineers meet designers, business meets biology.',
    icon: <Repeat className="w-6 h-6" />,
    color: 'from-cyan-400 to-cyan-600',
    delay: 0.3
  },
  {
    title: 'Mentor Integration',
    description: 'Get guidance from experienced faculty and industry professionals.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-green-400 to-emerald-600',
    delay: 0.4
  },
  {
    title: 'AI Smart Matching',
    description: 'Our proprietary algorithm connects you with the perfect teammates based on skills.',
    icon: <BrainCircuit className="w-6 h-6" />,
    color: 'from-pink-400 to-rose-600',
    delay: 0.5
  },
  {
    title: 'Collaboration Dashboard',
    description: 'Track progress, share files, and manage tasks all in one unified workspace.',
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: 'from-orange-400 to-red-600',
    delay: 0.6
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Powered by Innovation"
          subtitle="Everything you need to turn abstract ideas into functional prototypes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <GlassCard className="h-full group hover:border-transparent transition-all duration-300">
                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-md pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-${feature.color.split('-')[1]}/30 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
