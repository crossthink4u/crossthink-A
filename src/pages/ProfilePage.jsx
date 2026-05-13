import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Calendar, GitBranch, Link2, Globe, Edit3, Star, TrendingUp, Users, FolderOpen, Award, ArrowRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockProfile = {
  name: 'John Doe', username: '@johndoe', bio: 'Full-stack developer passionate about AI and cross-disciplinary collaboration. Building the future one project at a time.',
  department: 'Computer Science', college: 'MIT', location: 'Boston, MA', year: '3rd Year',
  skills: ['React', 'Node.js', 'Python', 'TensorFlow', 'TypeScript', 'Figma'],
  techStack: ['React', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  github: 'github.com/johndoe', linkedin: 'linkedin.com/in/johndoe', portfolio: 'johndoe.dev',
  collaborationScore: 92, projectsActive: 3, teamsJoined: 2, mentorSessions: 8,
  achievements: ['🏆 First Project', '🚀 10 Commits', '👥 Team Player', '⭐ Top Contributor', '🧠 AI Pioneer'],
};

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
            return <div key={d} className={`w-[10px] h-[10px] rounded-sm heatmap-cell ${colors[level]}`} />;
          })}
        </div>
      ))}
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const p = mockProfile;

  const timeline = [
    { action: 'Joined CrossThink', time: '2 weeks ago', icon: Star, color: 'text-cyan-400' },
    { action: 'Created project "Neural Optimizer"', time: '1 week ago', icon: FolderOpen, color: 'text-purple-400' },
    { action: 'Joined Team "EcoTracker"', time: '5 days ago', icon: Users, color: 'text-green-400' },
    { action: 'Completed 10 commits', time: '3 days ago', icon: GitBranch, color: 'text-gray-400' },
    { action: 'Mentor session with Dr. Chen', time: 'Yesterday', icon: Award, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-blue-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.1),transparent_70%)]" />
        {/* Nav */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
            ← Back
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
            Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-5 mb-8">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl font-bold border-4 border-[#050505] shadow-xl flex-shrink-0">
            {p.name.charAt(0)}
          </motion.div>
          <div className="flex-1 pt-4">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-display font-bold">{p.name}</h1>
              <button className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
            </div>
            <p className="text-sm text-cyan-400 mb-2">{p.username}</p>
            <p className="text-sm text-gray-400 max-w-lg leading-relaxed mb-3">{p.bio}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{p.department}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{p.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.year}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Collaboration Score', value: p.collaborationScore, suffix: '%', color: 'text-cyan-400' },
                { label: 'Active Projects', value: p.projectsActive, color: 'text-purple-400' },
                { label: 'Teams Joined', value: p.teamsJoined, color: 'text-green-400' },
                { label: 'Mentor Sessions', value: p.mentorSessions, color: 'text-amber-400' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}{stat.suffix || ''}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills & Tech Stack */}
            <div className="grid grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-cyan-400" />Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
                </div>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400" />Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((tech, i) => <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400">{tech}</span>)}
                </div>
              </div>
            </div>

            {/* Contribution Heatmap */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-green-400" />Contribution Activity</h3>
              <div className="overflow-x-auto"><HeatmapGrid /></div>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                <span>Less</span>
                {['bg-white/[0.03]', 'bg-cyan-500/20', 'bg-cyan-500/40', 'bg-cyan-500/60', 'bg-cyan-500/80'].map((c, i) => <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />)}
                <span>More</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" />Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {p.achievements.map((a, i) => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/[0.06] border border-amber-500/15 text-amber-400">{a}</motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Social Links */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-3">Links</h3>
              <div className="space-y-2.5">
                {[
                  { icon: GitBranch, label: p.github, color: 'text-gray-400' },
                  { icon: Link2, label: p.linkedin, color: 'text-blue-400' },
                  { icon: Globe, label: p.portfolio, color: 'text-cyan-400' },
                ].map((link, i) => (
                  <a key={i} href="#" className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.03]">
                    <link.icon className={`w-4 h-4 ${link.color}`} /> {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-sm font-semibold mb-4">Activity Timeline</h3>
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

            {/* Enter Dashboard CTA */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all text-sm flex items-center justify-center gap-2">
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
