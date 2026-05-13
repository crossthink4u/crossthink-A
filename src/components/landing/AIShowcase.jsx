import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Activity, Radar, Users, Star } from 'lucide-react';

const matchCards = [
  { name: 'Sarah K.', role: 'Full-Stack Dev', match: 98, color: 'from-cyan-400 to-blue-500', skills: ['React', 'Node.js', 'Python'] },
  { name: 'Alex M.', role: 'UI Designer', match: 95, color: 'from-pink-400 to-rose-500', skills: ['Figma', 'CSS', 'Motion'] },
  { name: 'Dr. Patel', role: 'AI Mentor', match: 92, color: 'from-purple-400 to-violet-500', skills: ['ML', 'Research', 'PyTorch'] },
];

const skills = ['React', 'Python', 'ML', 'Design', 'Node.js', 'Data'];
const skillValues = [0.9, 0.75, 0.6, 0.45, 0.85, 0.7];

const AIShowcase = () => (
  <section id="ai-showcase" className="py-28 relative overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/15 via-[#050505] to-[#050505]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual Side */}
        <div className="relative h-[500px] flex items-center justify-center order-2 lg:order-1">
          {/* Core Orb */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 60px rgba(0,240,255,0.4)', '0 0 100px rgba(138,43,226,0.5)', '0 0 60px rgba(0,240,255,0.4)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center z-20"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>

          {/* Orbit 1 */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute w-72 h-72 rounded-full border border-white/[0.06] border-dashed">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#111] border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 rounded-full bg-[#111] border border-purple-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.4)]">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
          </motion.div>

          {/* Orbit 2 with match cards */}
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute w-[420px] h-[420px] rounded-full border border-white/[0.03]">
            {matchCards.map((card, i) => {
              const angle = (i * 120 - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * 210;
              const y = Math.sin(angle) * 210;
              return (
                <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-1/2 top-1/2" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                  <div className="w-36 p-2.5 rounded-xl bg-[#111]/90 backdrop-blur-md border border-white/[0.08] shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${card.color}`} />
                      <span className="text-[10px] text-white font-medium truncate">{card.name}</span>
                    </div>
                    <p className="text-[9px] text-gray-500 mb-1">{card.role}</p>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${card.color} rounded-full`} style={{ width: `${card.match}%` }} />
                      </div>
                      <span className="text-[9px] text-cyan-400 font-bold">{card.match}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Radar chart SVG */}
          <svg className="absolute w-72 h-72 opacity-20" viewBox="0 0 200 200">
            {[1, 0.75, 0.5, 0.25].map((s, i) => (
              <polygon key={i} points={skills.map((_, j) => {
                const a = (j * 60 - 90) * (Math.PI / 180);
                return `${100 + Math.cos(a) * 80 * s},${100 + Math.sin(a) * 80 * s}`;
              }).join(' ')} fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="0.5" />
            ))}
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              points={skillValues.map((v, j) => {
                const a = (j * 60 - 90) * (Math.PI / 180);
                return `${100 + Math.cos(a) * 80 * v},${100 + Math.sin(a) * 80 * v}`;
              }).join(' ')}
              fill="rgba(0,240,255,0.1)" stroke="rgba(0,240,255,0.5)" strokeWidth="1"
            />
          </svg>
        </div>

        {/* Text Side */}
        <div className="order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/20 text-purple-400 text-xs font-medium mb-6 border border-purple-800/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary AI Engine</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Don't search for talent.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Let it find you.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed">
            Our AI analyzes project requirements, technical skills, and team dynamics to form the ultimate dream team.
          </motion.p>

          <div className="space-y-5">
            {[
              { title: 'Teammate Recommendations', desc: 'AI suggests ideal collaborators based on complementary skills and availability.' },
              { title: 'Project Matching', desc: 'Discover projects that perfectly align with your interests and expertise.' },
              { title: 'Skill Gap Analysis', desc: 'Identifies missing expertise in your team and suggests who can fill the gaps.' },
              { title: 'Mentor Suggestions', desc: 'Get matched with faculty mentors who have relevant domain expertise.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                  <span className="text-white text-[10px]">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AIShowcase;
