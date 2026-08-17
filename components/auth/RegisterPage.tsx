'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hexagon,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type Role = 'student' | 'mentor';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role: Role;
  // student
  university: string;
  major: string;
  year: string;
  // mentor
  expertise: string;
  yearsExp: string;
  organization: string;
};

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'PhD'];

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak', color: 'bg-rose-500' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-400' };
  return { score, label: 'Strong', color: 'bg-emerald-400' };
}

const inputCls = 'w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40 transition-all';

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [step, setStep] = useState<1 | 2>(1);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setOauthError(null);
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setGoogleLoading(false);
      setOauthError(error.message);
    }
  };

  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'student',
    university: '',
    major: '',
    year: '',
    expertise: '',
    yearsExp: '',
    organization: '',
  });

  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'mentor') setForm((f) => ({ ...f, role: 'mentor' }));
  }, [searchParams]);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => { const n = { ...er }; delete n[field]; return n; });
  };

  const strength = passwordStrength(form.password);

  const validateStep1 = () => {
    const errs: typeof errors = {};
    if (!form.email.includes('@') || !form.email.includes('.')) errs.email = 'Enter a valid email address';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = () => { if (validateStep1()) setStep(2); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
          university: form.university,
          major: form.major,
          year: form.year,
          expertise: form.expertise,
          years_exp: form.yearsExp,
          organization: form.organization,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrors({ email: error.message });
      setStep(1); // Go back to step 1 to show the error
      return;
    }

    setDone(true);
    setTimeout(() => router.push('/feed'), 1600);
  };

  const slideVariants = {
    enter: { x: 30, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -30, opacity: 0 },
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 240 }}
            className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5"
          >
            <Check className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">You&apos;re in!</h2>
          <p className="text-gray-500 text-sm">Redirecting to your workspace…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-start justify-center py-12 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center gap-2 mb-8 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Hexagon className="w-7 h-7 text-purple-400" fill="currentColor" fillOpacity={0.15} />
          <span className="font-display font-bold text-xl text-white">
            Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
          </span>
        </div>

        <div className="rounded-2xl bg-[#0d0d0d] border border-white/[0.08] overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-lg font-bold text-white">
                  {step === 1 ? 'Create your account' : 'Complete your profile'}
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Step {step} of 2 · {step === 1 ? 'Account details' : 'Profile info'}
                </p>
              </div>
              {/* Step dots */}
              <div className="flex gap-1.5">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? 'w-5 bg-purple-400' : s < step ? 'w-1.5 bg-purple-400/40' : 'w-1.5 bg-white/[0.12]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Role toggle */}
            <div className="flex p-0.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
              {(['student', 'mentor'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, role: r }))}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                    form.role === r
                      ? 'bg-white/[0.10] text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {r === 'student' ? 'Student' : 'Mentor / Faculty'}
                </button>
              ))}
            </div>
          </div>

          {/* Form body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* OAuth */}
                  {oauthError && (
                    <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <p>{oauthError}</p>
                    </div>
                  )}
                  <div className="mb-5">
                    <button
                      type="button"
                      disabled={googleLoading}
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-xs font-medium hover:bg-white/[0.07] hover:border-white/[0.14] transition-all disabled:opacity-50"
                    >
                      <span className="font-bold text-sm leading-none">G</span> {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-[11px] text-gray-600">or with email</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  {/* Full name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Full name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        value={form.fullName}
                        onChange={set('fullName')}
                        placeholder="Jane Smith"
                        className={`${inputCls} pl-10 ${errors.fullName ? 'border-rose-500/50' : ''}`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="jane@university.edu"
                        className={`${inputCls} pl-10 ${errors.email ? 'border-rose-500/50' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={form.password}
                        onChange={set('password')}
                        placeholder="Min. 8 characters"
                        className={`${inputCls} pl-10 pr-10 ${errors.password ? 'border-rose-500/50' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${(strength.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-gray-500">{strength.label}</span>
                      </div>
                    )}
                    {errors.password && (
                      <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={set('confirmPassword')}
                        placeholder="Repeat your password"
                        className={`${inputCls} pl-10 pr-10 ${errors.confirmPassword ? 'border-rose-500/50' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {form.confirmPassword && form.password === form.confirmPassword && (
                        <Check className="absolute right-10 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleStep1}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="step2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {form.role === 'student' ? (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">University / Institution</label>
                        <input
                          value={form.university}
                          onChange={set('university')}
                          placeholder="e.g. MIT, Stanford, IIT Bombay"
                          className={inputCls}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5">Major</label>
                          <input
                            value={form.major}
                            onChange={set('major')}
                            placeholder="Computer Science"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5">Year</label>
                          <select value={form.year} onChange={set('year')} className={`${inputCls} appearance-none`}>
                            <option value="">Select year</option>
                            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Organization / Institution</label>
                        <input
                          value={form.organization}
                          onChange={set('organization')}
                          placeholder="e.g. MIT, Google, Sequoia Capital"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Area of expertise</label>
                        <input
                          value={form.expertise}
                          onChange={set('expertise')}
                          placeholder="e.g. Machine Learning, FinTech, UX Design"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Years of experience</label>
                        <select value={form.yearsExp} onChange={set('yearsExp')} className={`${inputCls} appearance-none`}>
                          <option value="">Select range</option>
                          <option value="1-3">1–3 years</option>
                          <option value="3-7">3–7 years</option>
                          <option value="7-15">7–15 years</option>
                          <option value="15+">15+ years</option>
                        </select>
                      </div>
                    </>
                  )}

                  <p className="text-[11px] text-gray-600">
                    All fields are optional — you can fill these in later from your profile.
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.16] text-sm transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          Creating account…
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 pt-1 border-t border-white/[0.06] text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
            <p className="text-[11px] text-gray-700 mt-2">
              By creating an account you agree to our Terms and Privacy Policy.
            </p>
          </div>
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
