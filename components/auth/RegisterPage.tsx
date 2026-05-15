'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, ArrowRight, Github, Linkedin, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ParticleField from '@/components/landing/ParticleField';

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<'student' | 'mentor'>('student');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'mentor' || roleParam === 'student') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      setTimeout(() => {
        router.push('/feed');
      }, 1500);
    }, 2500);
  };

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
          <p className="text-gray-500 text-xs">Join as a {role === 'student' ? 'Student Innovator' : 'Mentor'}</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 backdrop-blur-sm min-h-[380px] flex flex-col">
          <div className="flex p-1 bg-white/[0.04] rounded-xl mb-6 border border-white/[0.06]">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                role === 'student' ? 'bg-white/[0.08] text-white shadow-sm' : 'text-gray-500 hover:text-white'
              }`}
            >
              I am a Student
            </button>
            <button
              type="button"
              onClick={() => setRole('mentor')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                role === 'mentor' ? 'bg-white/[0.08] text-white shadow-sm' : 'text-gray-500 hover:text-white'
              }`}
            >
              I am a Mentor
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!analyzing && !analysisComplete ? (
              <motion.form key="form" onSubmit={handleSubmit} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="flex-1 space-y-4">
                
                {role === 'student' ? (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                      <input required placeholder="John Doe" className="auth-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Skills & Interests (comma separated)</label>
                      <input required placeholder="React, Python, Machine Learning, Design" className="auth-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Preferred Domains</label>
                      <select required className="auth-input">
                        <option value="">Select Primary Domain</option>
                        <option value="cs">Computer Science</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="engineering">Engineering</option>
                        <option value="biology">Biology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub / Portfolio (Optional)</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input placeholder="https://github.com/username" className="auth-input !pl-9" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                      <input required placeholder="Dr. Jane Smith" className="auth-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Expertise</label>
                        <input required placeholder="AI / Startups" className="auth-input" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Experience (Years)</label>
                        <input required placeholder="10+" className="auth-input" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Availability</label>
                      <select required className="auth-input">
                        <option value="">Select Availability</option>
                        <option value="1-2">1-2 hours / week</option>
                        <option value="3-5">3-5 hours / week</option>
                        <option value="5+">5+ hours / week</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn / Portfolio</label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input required placeholder="https://linkedin.com/in/username" className="auth-input !pl-9" />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-white/[0.06]">
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all text-sm flex items-center justify-center gap-2">
                    Join CrossThink <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.form>
            ) : analyzing ? (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 mx-auto mb-6" />
                <h3 className="text-lg font-bold text-white mb-2">Analyzing Your Profile</h3>
                <p className="text-sm text-gray-400">Finding the best matches...</p>
              </motion.div>
            ) : (
              <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Setup Complete!</h3>
                <p className="text-sm text-gray-400">Redirecting to your workspace...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login link */}
          {!analyzing && !analysisComplete && (
            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account? <button onClick={() => router.push('/login')} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign In</button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <RegisterForm />
    </Suspense>
  );
}

