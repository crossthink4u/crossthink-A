'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, ArrowRight, ArrowLeft, Upload, X, Plus, Brain, Sparkles, Users, FolderOpen, User as UserIcon, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ParticleField from '@/components/landing/ParticleField';

const stepTitles = ['Basic Info', 'Profile Details', 'Technical Profile', 'Collaboration', 'Social Links', 'AI Analysis'];

const roles = ['Developer', 'Designer', 'Researcher', 'Manager', 'AI/ML Engineer', 'Mentor'];
const domains = ['Web Development', 'Mobile Apps', 'AI / Machine Learning', 'Data Science', 'IoT', 'Blockchain', 'Cybersecurity', 'Game Dev', 'Cloud Computing', 'DevOps'];
const lookingFor = ['Team', 'Mentor', 'Projects', 'Contributors'];

const TagInput = ({ tags, setTags, placeholder }) => {
  const [input, setInput] = useState('');
  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) { setTags([...tags, trimmed]); setInput(''); }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="skill-tag">
            {tag}
            <button onClick={() => setTags(tags.filter((_, j) => j !== i))} className="ml-1 hover:text-white"><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder={placeholder} className="auth-input flex-1" />
        <button type="button" onClick={addTag} className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [form, setForm] = useState({
    fullName: '', username: '', email: '', password: '', confirmPassword: '',
    bio: '', department: '', year: '', college: '', location: '',
    techStack: [], skills: [], interests: [], preferredRole: '',
    preferredDomains: [], lookingFor: [],
    github: '', linkedin: '', portfolio: '',
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const next = () => {
    if (step === 4) {
      setStep(5);
      setAnalyzing(true);
      setTimeout(() => { setAnalyzing(false); setAnalysisComplete(true); }, 3500);
    } else if (step < 5) {
      setStep(step + 1);
    }
  };
  const prev = () => step > 0 && setStep(step - 1);

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center py-8 px-4">
      <div className="absolute inset-0"><ParticleField density={30} color="0, 240, 255" connectionDistance={100} speed={0.15} /></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4 cursor-pointer" onClick={() => router.push('/')}>
            <Hexagon className="w-8 h-8 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
            <span className="font-display font-bold text-xl text-white">Cross<span className="text-gradient">Think</span></span>
          </div>
          <h1 className="text-xl font-display font-bold text-white mb-1">Create Your Account</h1>
          <p className="text-gray-500 text-xs">Step {step + 1} of 6 — {stepTitles[step]}</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-6">
          {stepTitles.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 backdrop-blur-sm min-h-[380px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="flex-1">
              {/* Step 0: Basic Info */}
              {step === 0 && (
                <div className="space-y-4">
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label><input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="John Doe" className="auth-input" /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label><input value={form.username} onChange={(e) => update('username', e.target.value)} placeholder="johndoe" className="auth-input" /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@university.edu" className="auth-input" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label><input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" className="auth-input" /></div>
                    <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm</label><input type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="••••••••" className="auth-input" /></div>
                  </div>
                </div>
              )}

              {/* Step 1: Profile Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center mb-2">
                    <div className="w-20 h-20 rounded-full bg-white/[0.04] border-2 border-dashed border-white/[0.1] flex items-center justify-center cursor-pointer hover:border-cyan-500/30 transition-colors">
                      <Upload className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Bio</label><textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} placeholder="Tell us about yourself..." rows={2} className="auth-input resize-none" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Department</label>
                      <select value={form.department} onChange={(e) => update('department', e.target.value)} className="auth-input">
                        <option value="">Select</option>
                        {['Computer Science', 'Design', 'Business', 'Engineering', 'Biology', 'Mathematics', 'Arts', 'Other'].map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Year / Semester</label><input value={form.year} onChange={(e) => update('year', e.target.value)} placeholder="3rd Year" className="auth-input" /></div>
                  </div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">College Name</label><input value={form.college} onChange={(e) => update('college', e.target.value)} placeholder="MIT, Stanford, etc." className="auth-input" /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label><input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="City, Country" className="auth-input" /></div>
                </div>
              )}

              {/* Step 2: Technical Profile */}
              {step === 2 && (
                <div className="space-y-4">
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Tech Stack</label><TagInput tags={form.techStack} setTags={(v) => update('techStack', v)} placeholder="e.g. React, Python..." /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Skills</label><TagInput tags={form.skills} setTags={(v) => update('skills', v)} placeholder="e.g. UI Design, ML..." /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Interests</label><TagInput tags={form.interests} setTags={(v) => update('interests', v)} placeholder="e.g. AI, Web3..." /></div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Preferred Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role) => (
                        <button key={role} type="button" onClick={() => update('preferredRole', role)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${form.preferredRole === role ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/[0.1]'}`}>
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Collaboration */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Preferred Domains</label>
                    <div className="flex flex-wrap gap-2">
                      {domains.map((domain) => (
                        <button key={domain} type="button" onClick={() => {
                          const list = form.preferredDomains.includes(domain) ? form.preferredDomains.filter((d) => d !== domain) : [...form.preferredDomains, domain];
                          update('preferredDomains', list);
                        }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.preferredDomains.includes(domain) ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/[0.1]'}`}>
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Looking For</label>
                    <div className="grid grid-cols-2 gap-2">
                      {lookingFor.map((item) => (
                        <button key={item} type="button" onClick={() => {
                          const list = form.lookingFor.includes(item) ? form.lookingFor.filter((l) => l !== item) : [...form.lookingFor, item];
                          update('lookingFor', list);
                        }} className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs font-medium border transition-all ${form.lookingFor.includes(item) ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/[0.1]'}`}>
                          {item === 'Team' && <Users className="w-3.5 h-3.5" />}
                          {item === 'Mentor' && <UserIcon className="w-3.5 h-3.5" />}
                          {item === 'Projects' && <FolderOpen className="w-3.5 h-3.5" />}
                          {item === 'Contributors' && <Users className="w-3.5 h-3.5" />}
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Social Links */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 mb-2">Optional — add your profiles to showcase your work.</p>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub</label><input value={form.github} onChange={(e) => update('github', e.target.value)} placeholder="https://github.com/username" className="auth-input" /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn</label><input value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" className="auth-input" /></div>
                  <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Portfolio Website</label><input value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} placeholder="https://yourportfolio.com" className="auth-input" /></div>
                </div>
              )}

              {/* Step 5: AI Analysis */}
              {step === 5 && (
                <div className="flex flex-col items-center justify-center py-6">
                  {analyzing ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-16 h-16 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 mx-auto mb-6" />
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3.5, times: [0, 0.1, 0.9, 1] }}>
                        <h3 className="text-lg font-bold text-white mb-2">Analyzing Your Profile</h3>
                        <div className="space-y-2 text-sm text-gray-400">
                          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>🔍 Scanning skills & interests...</motion.p>
                          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>🧠 Running compatibility analysis...</motion.p>
                          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 }}>⚡ Matching with projects & teams...</motion.p>
                          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.8 }}>✨ Generating recommendations...</motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : analysisComplete ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-3">
                          <Check className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Analysis Complete!</h3>
                        <p className="text-xs text-gray-500">Here are your personalized recommendations</p>
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-cyan-500/[0.04] border border-cyan-500/10">
                          <div className="flex items-center gap-2 mb-2"><Users className="w-3.5 h-3.5 text-cyan-400" /><span className="text-xs font-medium text-cyan-400">Recommended Teammates</span></div>
                          <div className="flex gap-2">
                            {['Sarah K. (98%)', 'Alex M. (95%)', 'Raj P. (91%)'].map((t, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/[0.06]">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-500/[0.04] border border-purple-500/10">
                          <div className="flex items-center gap-2 mb-2"><FolderOpen className="w-3.5 h-3.5 text-purple-400" /><span className="text-xs font-medium text-purple-400">Recommended Projects</span></div>
                          <div className="flex gap-2 flex-wrap">
                            {['Neural Optimizer', 'EcoTracker', 'StudyBuddy AI'].map((p, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/[0.06]">{p}</span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/10">
                          <div className="flex items-center gap-2 mb-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /><span className="text-xs font-medium text-amber-400">Recommended Mentors</span></div>
                          <div className="flex gap-2">
                            {['Dr. Chen (AI)', 'Prof. Lee (Design)'].map((m, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/[0.06]">{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-white/[0.06]">
            {step > 0 && step < 5 && (
              <button onClick={prev} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 text-sm font-medium hover:bg-white/[0.06] transition-all">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < 5 && (
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={next}
                className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all text-sm flex items-center justify-center gap-2">
                {step === 4 ? 'Analyze Profile' : 'Continue'} <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
            {step === 5 && analysisComplete && (
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => router.push('/profile')}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all text-sm flex items-center justify-center gap-2">
                Complete Setup <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Login link */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account? <button onClick={() => router.push('/login')} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign In</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

