import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

const testimonials = [
  {
    name: "Dr. Emily Chen",
    role: "Computer Science Professor",
    content: "CrossThink has completely transformed how my students collaborate with the Business department. We're seeing startups form before graduation.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Marcus Johnson",
    role: "Senior Engineering Student",
    content: "I had the code, but needed a designer. The AI matched me with Sarah from the Arts program within minutes. Our prototype just got funded.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Prof. Alan Turing",
    role: "AI Research Lead",
    content: "The proprietary matching algorithm on Team A's platform is genuinely impressive. It accounts for skill gaps that students don't even realize they have.",
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    name: "Jessica Wong",
    role: "MBA Candidate",
    content: "Finding technical co-founders used to be a nightmare. Now I just post a concept, and the right engineering talent applies directly.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "David Smith",
    role: "Industry Mentor",
    content: "The dashboard makes it incredibly easy for me to oversee multiple student projects at once. The GitHub integration is flawless.",
    avatar: "https://i.pravatar.cc/150?img=60"
  }
];

const Testimonials = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Don't Just Take Our Word"
          subtitle="Hear from the students, faculty, and mentors who are building the future on CrossThink."
        />

        <motion.div ref={carousel} className="cursor-grab overflow-hidden">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-6 pt-10 pb-16"
          >
            {testimonials.map((test, index) => (
              <motion.div 
                key={index}
                className="min-w-[350px] md:min-w-[450px]"
              >
                <GlassCard className="h-full p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
                  <div>
                    <Quote className="w-10 h-10 text-gray-200 dark:text-white/10 mb-4 group-hover:text-blue-500/20 transition-colors" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                      "{test.content}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{test.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{test.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <div className="flex justify-center mt-4">
           <div className="flex gap-2">
             <div className="w-3 h-1 bg-blue-500 rounded-full" />
             <div className="w-3 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
             <div className="w-3 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
           </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
