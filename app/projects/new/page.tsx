'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Hexagon, Upload, Loader2, Sparkles, Plus, Trash2, X,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { DbProject } from '@/types/database';

type Role = { title: string; skills: string[]; count: number };

const inputCls =
  'w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40 transition-all';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-2">
        {label}
        {hint && <span className="text-gray-600 font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClient();

  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({
    title: '', dept: '', description: '', tech: '',
    duration: '', deadline: '', difficulty: 'Intermediate', capacity: 5,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/login?redirectTo=/projects/new');
      else setChecking(false);
    });
  }, []);

  const set = (p: Partial<typeof form>) => setForm((f) => ({ ...f, ...p }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.dept.trim()) return;
    setLoading(true);
    setError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('You must be signed in.'); setLoading(false); return; }

    let imageUrl: string | null = null;
    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('project-images')
        .upload(path, imageFile, { upsert: true });
      if (!uploadErr) {
        imageUrl = supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
      }
    }

    const { data, error: insertErr } = await supabase
      .from('projects')
      .insert({
        owner_id: user.id,
        title: form.title.trim(),
        dept: form.dept.trim(),
        description: form.description.trim() || null,
        tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
        open_roles: roles.filter((r) => r.title.trim()),
        image_url: imageUrl,
        difficulty: form.difficulty,
        duration: form.duration.trim() || null,
        deadline: form.deadline.trim() || null,
        team_size_capacity: form.capacity,
        is_public: true,
      })
      .select()
      .single();

    setLoading(false);
    if (insertErr || !data) { setError(insertErr?.message ?? 'Failed to create project.'); return; }

    router.push(`/workspace/${(data as DbProject).id}`);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button onClick={() => router.push('/')} className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-purple-400" fill="currentColor" fillOpacity={0.12} />
            <span className="font-display font-bold text-sm text-white hidden sm:block">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>
          <div className="w-px h-5 bg-white/[0.08]" />
          <h1 className="text-sm font-semibold text-white">Post a Project</h1>
        </div>
      </header>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8"
      >
        <div className="space-y-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            Start something
            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">worth joining</span>
            <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
          </h2>
          <p className="text-gray-400 text-[15px]">
            Describe the project and the roles you need. You can edit everything later from the workspace.
          </p>
        </div>

        {/* Cover */}
        <Field label="Cover image" hint="optional">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
          {imagePreview ? (
            <div className="relative h-56 rounded-2xl overflow-hidden group">
              <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:text-white backdrop-blur-md">
                <X className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center text-xs font-medium text-white">
                Change image
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="w-full h-32 rounded-2xl border-2 border-dashed border-white/[0.10] hover:border-purple-500/40 hover:bg-purple-500/[0.03] flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-gray-300 transition-all">
              <Upload className="w-5 h-5" />
              <span className="text-xs">Upload a cover image</span>
            </button>
          )}
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Project title">
            <input className={inputCls} required value={form.title} placeholder="e.g. AI Resume Analyzer"
              onChange={(e) => set({ title: e.target.value })} />
          </Field>
          <Field label="Department / Focus area">
            <input className={inputCls} required value={form.dept} placeholder="e.g. Machine Learning"
              onChange={(e) => set({ dept: e.target.value })} />
          </Field>
        </div>

        <Field label="Description">
          <textarea className={inputCls} rows={5} value={form.description}
            placeholder="What are you building, and what should a collaborator expect?"
            onChange={(e) => set({ description: e.target.value })} />
        </Field>

        <Field label="Tech stack" hint="comma-separated">
          <input className={inputCls} value={form.tech} placeholder="React, Python, PostgreSQL…"
            onChange={(e) => set({ tech: e.target.value })} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Field label="Difficulty">
            <select className={inputCls} value={form.difficulty} onChange={(e) => set({ difficulty: e.target.value })}>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </Field>
          <Field label="Duration">
            <input className={inputCls} value={form.duration} placeholder="e.g. 3 months"
              onChange={(e) => set({ duration: e.target.value })} />
          </Field>
          <Field label="Deadline">
            <input className={inputCls} value={form.deadline} placeholder="e.g. June 30, 2026"
              onChange={(e) => set({ deadline: e.target.value })} />
          </Field>
          <Field label="Team size">
            <input className={inputCls} type="number" min={1} value={form.capacity}
              onChange={(e) => set({ capacity: Number(e.target.value) || 1 })} />
          </Field>
        </div>

        {/* Open roles */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-400">
              Open roles <span className="text-gray-600 font-normal">— what the badge on your card counts</span>
            </label>
            <button type="button" onClick={() => setRoles((r) => [...r, { title: '', skills: [], count: 1 }])}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add role
            </button>
          </div>

          {roles.length === 0 ? (
            <p className="text-xs text-gray-600 rounded-xl border border-dashed border-white/[0.08] px-4 py-6 text-center">
              No roles yet — your card will show the team size instead.
            </p>
          ) : (
            <div className="space-y-2">
              {roles.map((role, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 rounded-xl border border-white/[0.07] bg-[#0d0d0d] p-3">
                  <input className={`${inputCls} flex-1`} placeholder="Role title (e.g. Frontend Dev)" value={role.title}
                    onChange={(e) => setRoles((rs) => rs.map((r, j) => (j === i ? { ...r, title: e.target.value } : r)))} />
                  <input className={`${inputCls} flex-1`} placeholder="Skills (comma-separated)" value={role.skills.join(', ')}
                    onChange={(e) => setRoles((rs) => rs.map((r, j) => (j === i ? { ...r, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) } : r)))} />
                  <input className={`${inputCls} sm:w-20`} type="number" min={1} value={role.count}
                    onChange={(e) => setRoles((rs) => rs.map((r, j) => (j === i ? { ...r, count: Number(e.target.value) || 1 } : r)))} />
                  <button type="button" onClick={() => setRoles((rs) => rs.filter((_, j) => j !== i))}
                    className="p-2 rounded-lg text-gray-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors self-start">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white text-sm font-bold shadow-[0_0_28px_rgba(168,85,247,0.4)] disabled:opacity-50 transition-all mt-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Publish project
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-5 py-3 rounded-xl border border-white/[0.10] text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all mt-6">
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}
