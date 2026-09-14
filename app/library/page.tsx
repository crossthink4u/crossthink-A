'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Bookmark, ArrowLeft, Construction } from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
          <Bookmark className="w-10 h-10 text-purple-400" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Construction className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Coming Soon</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Library</h1>
        <p className="text-gray-400 mb-8">
          Save and organize your favorite projects. Your bookmarked projects and resources will live here.
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
