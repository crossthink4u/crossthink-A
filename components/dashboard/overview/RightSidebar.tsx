'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Users, StickyNote, Plus, Trash2, Sparkles, Radio } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

export default function RightSidebar() {
  const { rightSidebarOpen, toggleRightSidebar, onlineTeammates, quickNotes, addQuickNote, removeQuickNote, activity } = useDashboard();
  const [noteInput, setNoteInput] = useState('');

  const handleAddNote = () => {
    if (noteInput.trim()) {
      addQuickNote(noteInput.trim());
      setNoteInput('');
    }
  };

  return (
    <AnimatePresence>
      {rightSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleRightSidebar}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0f]/95 backdrop-blur-2xl border-l border-white/[0.06] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white">Control Panel</h3>
              <button onClick={toggleRightSidebar} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto panel-scroll p-4 space-y-6">
              {/* Online Teammates */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium text-gray-400">Online Now</span>
                </div>
                <div className="space-y-2">
                  {onlineTeammates.map((t) => (
                    <div key={t.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <div className="relative">
                        <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0f] ${t.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-white font-medium truncate">{t.name}</p>
                        <p className="text-[10px] text-gray-600">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <StickyNote className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-gray-400">Quick Notes</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <input
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    placeholder="Add a note..."
                    className="flex-1 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-white placeholder-gray-600 outline-none focus:border-purple-500/30"
                  />
                  <button onClick={handleAddNote} className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {quickNotes.map((n) => (
                    <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] group">
                      <p className="flex-1 text-xs text-gray-300">{n.text}</p>
                      <button onClick={() => removeQuickNote(n.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all shrink-0">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-medium text-gray-400">Notifications</span>
                </div>
                <div className="space-y-2">
                  {activity.slice(0, 4).map((a) => (
                    <div key={a.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-xs text-white font-medium">{a.title}</p>
                      <p className="text-[10px] text-gray-600">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assistant Shortcut */}
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-purple-500/20 bg-purple-500/[0.05] hover:bg-purple-500/[0.1] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-white">AI Assistant</p>
                  <p className="text-[10px] text-gray-500">Ask anything about your projects</p>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


