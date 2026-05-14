'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Eye, EyeOff, Mail, User, Lock, ArrowRight, GitBranch, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ParticleField from '@/components/landing/ParticleField';

const LoginPage = () => {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-[#050505] relative overflow-hidden">
      {/* Left Panel — Animated visual */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0">
          <ParticleField density={50} color="138, 43, 226" connectionDistance={120} speed={0.2} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="relative z-10 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Hexagon className="w-10 h-10 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
              <span className="font-display font-bold text-3xl text-white">Cross<span className="text-gradient">Think</span></span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Welcome Back</h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">Continue building the future with your team. Your projects are waiting.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/50 pointer-events-none lg:hidden" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Hexagon className="w-8 h-8 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
            <span className="font-display font-bold text-xl text-white">Cross<span className="text-gradient">Think</span></span>
          </div>

          <h1 className="text-2xl font-display font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your account</p>

          {/* Login mode toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
            {[
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'username', label: 'Username', icon: User },
            ].map((mode) => (
              <button key={mode.id} onClick={() => setLoginMode(mode.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${loginMode === mode.id ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                <mode.icon className="w-3.5 h-3.5" /> {mode.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identifier field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                {loginMode === 'email' ? 'Email Address' : 'Username'}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                  {loginMode === 'email' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <input
                  type={loginMode === 'email' ? 'email' : 'text'}
                  placeholder={loginMode === 'email' ? 'you@university.edu' : 'your_username'}
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  className="auth-input pl-11"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-gray-400">Password</label>
                <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot Password?</button>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"><Lock className="w-4 h-4" /></div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="auth-input pl-11 pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 bg-transparent'}`}>
                {rememberMe && <span className="text-white text-[8px]">✓</span>}
              </button>
              <span className="text-xs text-gray-400">Remember me</span>
            </div>

            {/* Submit */}
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-sm">
              Sign In <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
              <Globe className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
              <GitBranch className="w-4 h-4" /> GitHub
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <button onClick={() => router.push('/register')} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Create one</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

