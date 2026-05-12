import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, Target, Zap } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const skillData = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 60, fullMark: 100 },
  { subject: 'Design', A: 85, fullMark: 100 },
  { subject: 'Data Science', A: 40, fullMark: 100 },
  { subject: 'Management', A: 75, fullMark: 100 },
  { subject: 'Marketing', A: 65, fullMark: 100 },
];

const AIMatchPage = () => {
  return (
    <div className="space-y-6 pb-20 relative">
      
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-12">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
        >
          <BrainCircuit className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Neural Optimizer Engine</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Our proprietary algorithm has analyzed your skill gaps and found the perfect synergies.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Radar Chart */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6 h-[400px] flex flex-col justify-center border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <h3 className="text-center font-bold text-gray-900 dark:text-white mb-2">Your Skill Topology</h3>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skills" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/50 pointer-events-none" />
            </div>
          </GlassCard>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Top Synergy Matches
          </h3>

          {[
            { name: "David Kim", role: "Backend Architect", match: 99, missing: "Data Science", synergy: "Fills your technical gaps perfectly." },
            { name: "Jessica Wong", role: "UX Researcher", match: 95, missing: "Design", synergy: "Complements your frontend skills." }
          ].map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <GlassCard className="p-5 flex flex-col sm:flex-row items-center gap-6 group hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(138,43,226,0.15)] transition-all">
                <div className="relative">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200 dark:text-white/10" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 226 }}
                      animate={{ strokeDashoffset: 226 - (226 * rec.match) / 100 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                      strokeDasharray="226" 
                      className="text-cyan-400" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{rec.match}%</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{rec.name}</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">{rec.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><Target className="w-3 h-3 inline mr-1 text-amber-500" /> {rec.synergy}</p>
                </div>

                <Button variant="outline" className="border-cyan-500/50 text-cyan-600 dark:text-cyan-400">
                  <Zap className="w-4 h-4 mr-2" /> Connect
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIMatchPage;
