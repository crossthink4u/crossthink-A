'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ParticleField from '@/components/landing/ParticleField';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  React.useEffect(() => {
    const callbackError = searchParams.get('error');
    if (callbackError === 'auth-callback-failed') {
      setError('Google sign-in could not be completed. Please try again.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.identifier,
      password: form.password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    const redirectTo = searchParams.get('redirectTo') || '/feed';
    router.push(redirectTo);
  };

  const handleForgotPassword = async () => {
    setError(null);
    if (!form.identifier.includes('@')) {
      setError('Enter your email address above first.');
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.identifier, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetSent(true);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    const redirectTo = searchParams.get('redirectTo');
    const callbackUrl = new URL('/auth/callback', window.location.origin);
    if (redirectTo?.startsWith('/')) callbackUrl.searchParams.set('next', redirectTo);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl.toString() },
    });
    if (oauthError) {
      setGoogleLoading(false);
      setError(oauthError.message);
    }
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
              <span className="font-display font-bold text-3xl text-white">Cross<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Think</span></span>
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
            <span className="font-display font-bold text-xl text-white">Cross<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Think</span></span>
          </div>

          <h1 className="text-2xl font-display font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your account</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {resetSent && (
            <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              Password reset email sent. Check your inbox for a link.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identifier field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="you@university.edu"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/40 transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-gray-400">Password</label>
                <button type="button" onClick={handleForgotPassword} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot Password?</button>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/40 transition-all"
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
            <motion.button disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'} {!loading && <ArrowRight className="w-4 h-4" />}
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
            <button type="button" disabled={googleLoading} onClick={handleGoogleSignIn} className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all disabled:opacity-50">
              <span className="font-bold text-base leading-none">G</span> {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <button onClick={() => router.push('/register')} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Create one</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

