import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UserCircle, Search, Users, MessageSquare, Rocket } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Create Profile',
    description: 'Sign up and build your professional profile. Add your skills, interests, tech stack, and the roles you excel in.',
    icon: UserCircle,
    color: 'from-cyan-400 to-blue-500',
    detail: 'Skills • Tech Stack • Role Preferences',
  },
  {
    num: '02',
    title: 'Discover Projects',
    description: 'Browse active projects across departments. Filter by tech stack, domain, or team size. Find the challenge that excites you.',
    icon: Search,
    color: 'from-purple-400 to-violet-500',
    detail: 'Filters • Categories • AI Suggestions',
  },
  {
    num: '03',
    title: 'Build Teams',
    description: 'Recruit teammates with complementary skills. Our AI recommends the best matches based on your project requirements.',
    icon: Users,
    color: 'from-pink-400 to-rose-500',
    detail: 'AI Matching • Skill Gap Analysis',
  },
  {
    num: '04',
    title: 'Collaborate',
    description: 'Work together in unified workspaces. Kanban boards, GitHub integration, file sharing, and real-time communication.',
    icon: MessageSquare,
    color: 'from-amber-400 to-orange-500',
    detail: 'Workspace • GitHub • Chat • Tasks',
  },
  {
    num: '05',
    title: 'Launch Real Products',
    description: 'Ship your project. Present to mentors, gather feedback, and build portfolio-worthy products before graduation.',
    icon: Rocket,
    color: 'from-green-400 to-emerald-500',
    detail: 'Deploy • Present • Iterate',
  },
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-cyan-400 text-xs font-medium mb-6 uppercase tracking-wider"
          >
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight"
          >
            From Concept to{' '}
            <span className="text-gradient">Launch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A streamlined pipeline designed to turn your ideas into real, impactful products.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated timeline line - center on desktop, left on mobile */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-white/[0.05]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-start gap-8 lg:gap-16 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-${step.color.split(' ')[0].replace('from-', '')}/30 border-4 border-[#050505]`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`flex-1 ml-20 lg:ml-0 ${index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:text-left'}`}>
                  <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group">
                    {/* Step number watermark */}
                    <span className={`absolute ${index % 2 === 0 ? 'lg:-left-4 right-4 lg:right-auto' : 'right-4 lg:-right-4'} -top-4 text-7xl font-display font-bold text-white/[0.03] select-none pointer-events-none`}>
                      {step.num}
                    </span>

                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>

                    <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <span className="text-xs text-cyan-400/60 font-medium px-3 py-1 rounded-full bg-cyan-500/[0.06] border border-cyan-500/10">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
