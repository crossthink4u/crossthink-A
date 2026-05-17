'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Calendar, GitBranch, Link2, Globe, Edit3, Star, TrendingUp, Users, FolderOpen, Award, ArrowRight, Activity, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

const HeatmapGrid = () => {
  const weeks = 20;
  const days = 7;
  const levels = [0, 1, 2, 3, 4];
  const colors = ['bg-white/[0.03]', 'bg-cyan-500/20', 'bg-cyan-500/40', 'bg-cyan-500/60', 'bg-cyan-500/80'];
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: days }).map((_, d) => {
            const level = levels[Math.floor(Math.random() * levels.length)];
            return <div key={d} className={`w-[10px] h-[10px] rounded-sm ${colors[level]}`} />;
          })}
        </div>
      ))}
    </div>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const meta = user?.user_metadata ?? {};
  const fullName = meta.full_name || user?.email?.split('@')[0] || 'User';
  const initials = fullName.charAt(0).toUpperCase();
  const role: string = meta.role || 'student';
  const isStudent = role === 'student';

  // Student fields
  const university = meta.university || '';
  const major = meta.major || '';
  const year = meta.year || '';

  // Mentor fields
  const organization = meta.organization || '';
  const expertise: string[] = meta.expertise
    ? (typeof meta.expertise === 'string' ? [meta.expertise] : meta.expertise)
    : [];
  const yearsExp = meta.years_exp || '';

  const skills = isStudent
    ? [major, ...(expertise.length ? expertise : [])].filter(Boolean)
    : expertise;

  const timeline = [
    { action: 'Joined CrossThink', time: 'Recently', icon: Star, color: 'text-cyan-400' },
    { action: 'Profile created', time: 'Just now', icon: FolderOpen, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-blue-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.1),transparent_70%)]" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button onClick={() => router.push('/feed')} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
            ← Feed
          </button>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-5 mb-8">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl font-bold border-4 border-[#050505] shadow-xl flex-shrink-0">
            {initials}
          </motion.div>
          <div className="flex-1 pt-4">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-display font-bold">{fullName}</h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isStudent ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                {isStudent ? 'Student' : 'Mentor'}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{user?.email}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {isStudent ? (
                <>
                  {major && <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{major}</span>}
                  {university && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{university}</span>}
                  {year && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{year}</span>}
                </>
              ) : (
                <>
                  {organization && <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{organization}</span>}
                  {yearsExp && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{yearsExp} yrs experience</span>}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Collaboration Score', value: '—', color: 'text-cyan-400' },
                { label: 'Active Projects', value: 0, color: 'text-purple-400' },
                { label: 'Teams Joined', value: 0, color: 'text-green-400' },
                { label: isStudent ? 'Mentor Sessions' : 'Students Mentored', value: 0, color: 'text-amber-400' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills / Expertise */}
            {skills.length > 0 && (
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400" />
                  {isStudent ? 'Skills & Interests' : 'Areas of Expertise'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Contribution Heatmap */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-green-400" />Contribution Activity</h3>
              <div className="overflow-x-auto"><HeatmapGrid /></div>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                <span>Less</span>
                {['bg-white/[0.03]', 'bg-cyan-500/20', 'bg-cyan-500/40', 'bg-cyan-500/60', 'bg-cyan-500/80'].map((c, i) => (
                  <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />
                ))}
                <span>More</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" />Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {['🏆 First Project', '🚀 Getting Started', '👥 Team Player'].map((a, i) => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/[0.06] border border-amber-500/15 text-amber-400">{a}</motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Account Info */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-3">Account</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="text-gray-300 truncate ml-2 max-w-[160px]">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role</span>
                  <span className={isStudent ? 'text-cyan-400' : 'text-purple-400'}>{isStudent ? 'Student' : 'Mentor'}</span>
                </div>
                {isStudent && university && (
                  <div className="flex justify-between">
                    <span>University</span>
                    <span className="text-gray-300 truncate ml-2 max-w-[160px]">{university}</span>
                  </div>
                )}
                {isStudent && year && (
                  <div className="flex justify-between">
                    <span>Year</span>
                    <span className="text-gray-300">{year}</span>
                  </div>
                )}
                {!isStudent && organization && (
                  <div className="flex justify-between">
                    <span>Organization</span>
                    <span className="text-gray-300 truncate ml-2 max-w-[160px]">{organization}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-4">Activity</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/[0.06]" />
                {timeline.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 relative">
                    <div className={`w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 z-10 ${item.color}`}>
                      <item.icon className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">{item.action}</p>
                      <p className="text-[10px] text-gray-600">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feed CTA */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/feed')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all text-sm flex items-center justify-center gap-2">
              Go to Feed <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
