'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Hexagon,
  User,
  Mail,
  Code2,
  BookOpen,
  Github,
  Linkedin,
  Globe,
  Sparkles,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { getProjectById } from '@/data/projects';
import { createClient } from '@/utils/supabase/client';

const accentMap: Record<string, { gradient: string; btnBg: string; btnShadow: string; ring: string; dot: string }> = {
  cyan:    { gradient: 'from-purple-400 to-violet-500',     btnBg: 'from-purple-500 to-violet-600',     btnShadow: 'shadow-[0_0_24px_rgba(168,85,247,0.35)]',   ring: 'focus:ring-purple-500/40',    dot: 'bg-purple-400' },
  emerald: { gradient: 'from-emerald-400 to-teal-500',  btnBg: 'from-emerald-500 to-teal-600',  btnShadow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)]',  ring: 'focus:ring-emerald-500/40', dot: 'bg-emerald-400' },
  amber:   { gradient: 'from-amber-400 to-orange-500',  btnBg: 'from-amber-500 to-orange-600',  btnShadow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',  ring: 'focus:ring-amber-500/40',   dot: 'bg-amber-400' },
  violet:  { gradient: 'from-violet-400 to-purple-500', btnBg: 'from-violet-500 to-purple-600', btnShadow: 'shadow-[0_0_24px_rgba(139,92,246,0.35)]',  ring: 'focus:ring-violet-500/40',  dot: 'bg-violet-400' },
  pink:    { gradient: 'from-pink-400 to-rose-500',     btnBg: 'from-pink-500 to-rose-600',     btnShadow: 'shadow-[0_0_24px_rgba(236,72,153,0.35)]',  ring: 'focus:ring-pink-500/40',    dot: 'bg-pink-400' },
  sky:     { gradient: 'from-violet-400 to-purple-500',      btnBg: 'from-violet-500 to-purple-600',      btnShadow: 'shadow-[0_0_24px_rgba(14,165,233,0.35)]',  ring: 'focus:ring-violet-500/40',     dot: 'bg-violet-400' },
};

type FormData = {
  name: string;
  email: string;
  role: string;
  major: string;
  techStack: string;
  github: string;
  linkedin: string;
  portfolio: string;
  prevProjects: string;
  motivation: string;
};

const STEPS = [
  { id: 1, label: 'You',      icon: User },
  { id: 2, label: 'Skills',   icon: Code2 },
  { id: 3, label: 'Story',    icon: BookOpen },
];

const inputCls = (ring: string) =>
  `w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:ring-2 ${ring} focus:border-transparent transition-all duration-200 hover:border-white/20`;

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const hardcoded = getProjectById(id);
  const prefilledRole = searchParams.get('role') ?? '';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [authedName, setAuthedName] = useState('');
  const [dbTitle, setDbTitle] = useState('');
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    role: prefilledRole,
    major: '',
    techStack: '',
    github: '',
    linkedin: '',
    portfolio: '',
    prevProjects: '',
    motivation: '',
  });

  useEffect(() => {
    // Pre-fill from auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const meta = user.user_metadata ?? {};
      const fullName = meta.full_name || '';
      setAuthedName(fullName);
      setForm((f) => ({
        ...f,
        name: fullName || f.name,
        email: user.email || f.email,
        major: meta.major || f.major,
        techStack: Array.isArray(meta.expertise)
          ? meta.expertise.join(', ')
          : meta.expertise || f.techStack,
      }));
    });

    // If not a hardcoded project, fetch title from Supabase
    if (!hardcoded) {
      supabase.from('projects').select('title').eq('id', id).single()
        .then(({ data }) => { if (data) setDbTitle(data.title); });
    }
  }, []);

  const project = hardcoded;
  const projectTitle = project?.title ?? dbTitle ?? 'this project';
  const accent = accentMap[project?.accentColor ?? 'cyan'] ?? accentMap.cyan;

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const canNext = () => {
    if (step === 1) return form.name.trim().length > 0 && form.email.includes('@');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('applications').insert({
        project_id: id,
        applicant_user_id: user?.id ?? null,
        name: form.name,
        email: form.email,
        role: form.role || null,
        major: form.major || null,
        tech_stack: form.techStack || null,
        github: form.github || null,
        linkedin: form.linkedin || null,
        portfolio: form.portfolio || null,
        prev_projects: form.prevProjects || null,
        motivation: form.motivation || null,
        status: 'pending',
      });
      if (error) throw error;

      // notify the owner — failures here must not fail the application
      fetch('/api/applications/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: id, email: form.email }),
      }).catch(() => {});

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] text-white antialiased flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white mb-3">Application sent!</h1>
          <p className="text-gray-400 mb-2">
            Thanks, <span className="text-white">{form.name}</span>. Your application for{' '}
            <span className="text-white">{projectTitle}</span> is on its way.
          </p>
          <p className="text-sm text-gray-600 mb-10">
            The project lead will reach out at <span className="text-gray-400">{form.email}</span> within a few days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(`/projects/${id}`)}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all text-sm"
            >
              Back to project
            </button>
            <button
              onClick={() => router.push('/')}
              className={`px-6 py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r ${accent.btnBg} ${accent.btnShadow} hover:opacity-90 transition-all`}
            >
              Explore more projects
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-purple-500/30 selection:text-purple-100">
      <div className="h-0.5 w-full" style={{ background: project?.gradient ?? 'linear-gradient(90deg,#06b6d4,#3b82f6)' }} />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Hexagon className="w-7 h-7 text-purple-400" fill="currentColor" fillOpacity={0.15} />
            </motion.div>
            <span className="font-display font-bold text-lg text-white">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>
          <button
            onClick={() => router.push(`/projects/${id}`)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to project
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
            <span className="text-sm text-gray-500 font-medium">{project?.category ?? 'Project'}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Apply to{' '}
            <span className={`bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}>
              {projectTitle}
            </span>
          </h1>
          <p className="text-gray-500 text-sm">No account needed · Takes about 2 minutes · Most fields are optional</p>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          {STEPS.map((s, idx) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 transition-all ${step === s.id ? 'opacity-100' : step > s.id ? 'opacity-60 cursor-pointer hover:opacity-80' : 'opacity-25 cursor-default'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${step >= s.id ? `bg-gradient-to-br ${accent.btnBg} border-transparent text-white` : 'border-white/20 text-gray-600'}`}>
                  {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <span className={`text-sm font-medium ${step === s.id ? 'text-white' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-px transition-all ${step > s.id ? `bg-gradient-to-r ${accent.gradient} opacity-60` : 'bg-white/[0.08]'}`} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-500" />
                    <h2 className="font-semibold text-white text-sm">About you</h2>
                    <span className="ml-auto text-xs text-gray-600">* required</span>
                  </div>

                  {authedName && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                      Signed in as <span className="font-semibold">{authedName}</span> — fields pre-filled from your profile
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Full name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="e.g. Alex Johnson"
                      className={inputCls(accent.ring)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Email address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@university.edu"
                        className={`${inputCls(accent.ring)} pl-10`}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5">Project leads will reach out here. University email preferred but not required.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Which role are you applying for?
                      {(project?.openRoles?.length ?? 0) !== 1 ? ' (optional)' : ''}
                    </label>
                    <select
                      value={form.role}
                      onChange={set('role')}
                      className={`${inputCls(accent.ring)} appearance-none`}
                    >
                      <option value="">I&apos;m open to any role</option>
                      {(project?.openRoles ?? []).map((r) => (
                        <option key={r.title} value={r.title}>{r.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Major / Field of study
                      <span className="ml-1.5 text-gray-600">(optional)</span>
                    </label>
                    <input
                      value={form.major}
                      onChange={set('major')}
                      placeholder="e.g. Computer Science, Biology, Design..."
                      className={inputCls(accent.ring)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <h2 className="font-semibold text-white text-sm">Skills & links</h2>
                    <span className="ml-auto text-xs text-gray-600">all optional</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Tech stack / Skills</label>
                    <input
                      value={form.techStack}
                      onChange={set('techStack')}
                      placeholder="e.g. React, Python, Figma, PyTorch..."
                      className={inputCls(accent.ring)}
                    />
                    {project?.tech?.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1.5">Comma-separated. The project uses: {project.tech.slice(0, 3).join(', ')}{project.tech.length > 3 ? ', ...' : '.'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub</label>
                    <div className="relative">
                      <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        value={form.github}
                        onChange={set('github')}
                        placeholder="github.com/yourhandle"
                        className={`${inputCls(accent.ring)} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        value={form.linkedin}
                        onChange={set('linkedin')}
                        placeholder="linkedin.com/in/yourprofile"
                        className={`${inputCls(accent.ring)} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Portfolio / Personal site</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        value={form.portfolio}
                        onChange={set('portfolio')}
                        placeholder="yoursite.com"
                        className={`${inputCls(accent.ring)} pl-10`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <h2 className="font-semibold text-white text-sm">Your story</h2>
                    <span className="ml-auto text-xs text-gray-600">all optional</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Previous projects</label>
                    <textarea
                      rows={3}
                      value={form.prevProjects}
                      onChange={set('prevProjects')}
                      placeholder="Briefly describe 1-2 projects you've worked on — what you built, what your role was, and what you learned."
                      className={`${inputCls(accent.ring)} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Why this project?</label>
                    <textarea
                      rows={4}
                      value={form.motivation}
                      onChange={set('motivation')}
                      placeholder={`Tell the team what excites you about "${projectTitle}" and what you'd bring to it. Keep it natural.`}
                      className={`${inputCls(accent.ring)} resize-none`}
                    />
                  </div>

                  {/* Summary preview */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-500 font-medium">Application summary</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p><span className="text-gray-600">Name:</span> <span className="text-gray-300">{form.name || '—'}</span></p>
                      <p><span className="text-gray-600">Email:</span> <span className="text-gray-300">{form.email || '—'}</span></p>
                      <p><span className="text-gray-600">Role:</span> <span className="text-gray-300">{form.role || 'Open to any'}</span></p>
                      {form.major && <p><span className="text-gray-600">Major:</span> <span className="text-gray-300">{form.major}</span></p>}
                      {form.techStack && <p><span className="text-gray-600">Tech:</span> <span className="text-gray-300">{form.techStack}</span></p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => step > 1 ? setStep(s => s - 1) : router.push(`/projects/${project.id}`)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {step > 1 ? 'Back' : 'Cancel'}
            </button>

            {step < 3 ? (
              <button
                type="button"
                disabled={!canNext()}
                onClick={() => setStep(s => s + 1)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${accent.btnBg} ${accent.btnShadow} hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !form.name.trim() || !form.email.includes('@')}
                className={`flex items-center gap-2 px-7 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${accent.btnBg} ${accent.btnShadow} hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit application'}
              </button>
            )}
          </div>

          {submitError && (
            <p className="text-center text-sm text-rose-400 mt-4">{submitError}</p>
          )}
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-700 mt-10">
          By applying you agree to have your details shared with the project lead.
          {authedName ? ' Your application will be linked to your CrossThink account.' : ' No account required — you can create one later to track your application.'}
        </p>
      </div>
    </div>
  );
}
