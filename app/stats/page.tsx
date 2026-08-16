'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BarChart2, ArrowLeft, Construction } from 'lucide-react';

export default function StatsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <BarChart2 className="w-10 h-10 text-emerald-400" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Construction className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Coming Soon</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Stats</h1>
        <p className="text-gray-400 mb-8">
          Track your collaboration activity, project views, application stats, and growth over time.
        </p>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-white transition-colors px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>
      </motion.div>
    </div>
  );
}
