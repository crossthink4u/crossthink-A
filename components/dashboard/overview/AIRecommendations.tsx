'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Users, GraduationCap } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

export default function AIRecommendations() {
  const { aiRecommendations } = useDashboard();
  const { projects, teammates, mentors, skills } = aiRecommendations;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-base font-semibold text-white">AI Recommendations</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* Recommended Projects */}
        {projects.map((p) => (
          <div key={p.id} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/[0.04] blur-[30px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs text-gray-500">Project</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{p.match}% match</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
            <p className="text-[11px] text-gray-500 mb-3">{p.reason}</p>
            <button className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              {p.action} <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}

        {/* Recommended Teammates */}
        {teammates.map((t) => (
          <div key={t.id} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/[0.04] blur-[30px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs text-gray-500">Teammate</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{t.match}% match</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img src={t.avatar} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                <p className="text-[10px] text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">{t.reason}</p>
            <button className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              Connect <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}

        {/* Recommended Mentor */}
        {mentors.map((m) => (
          <div key={m.id} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-gray-500">Mentor</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{m.match}% match</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{m.name}</h3>
            <p className="text-[10px] text-gray-500 mb-1">{m.field}</p>
            <p className="text-[11px] text-gray-500 mb-3">{m.reason}</p>
            <button className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              Request Intro <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}

        {/* Skills to Learn */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-gray-500">Suggested Skills</span>
          </div>
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="text-[10px] text-gray-500">{s.reason}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${s.priority === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {s.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


