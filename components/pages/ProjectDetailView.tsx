'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Users, Clock, Calendar, Zap,
  Hexagon, ChevronRight, ExternalLink, Loader2, Sparkles,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { DbProject } from '@/types/database';

const difficultyColor: Record<string, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced:     'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function ProjectDetailView({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [project, setProject] = useState<DbProject | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [related, setRelated] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
      if (cancelled) return;

      if (error) { setFetchError(error.message); setLoading(false); return; }
      if (!data) { setLoading(false); return; }

      const p = data as DbProject;
      setProject(p);
      setLoading(false);

      // supporting data — none of it should block the page
      supabase.from('profiles').select('full_name').eq('id', p.owner_id).maybeSingle()
        .then(({ data: owner }) => { if (!cancelled) setOwnerName(owner?.full_name ?? null); });

      if (p.dept) {
        supabase.from('projects').select('*').eq('is_public', true).eq('dept', p.dept).neq('id', p.id).limit(3)
          .then(({ data: rel }) => { if (!cancelled) setRelated((rel as DbProject[]) ?? []); });
      }
    })();

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-rose-400 text-lg font-medium">Couldn&apos;t load this project</p>
        <p className="text-gray-500 text-sm max-w-sm">{fetchError}</p>
        <button onClick={() => router.push('/')} className="mt-4 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-gray-300 hover:text-white transition-colors">
          Back home
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="text-gray-400 text-lg">This project doesn&apos;t exist or was removed.</p>
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </button>
      </div>
    );
  }

  const roles = project.open_roles ?? [];
  const openCount = roles.reduce((s, r) => s + r.count, 0);
  const capacity = project.team_size_capacity || 0;
  // ponytail: project_members is owner/member-only under RLS, so derive the fill from
  // open roles the same way the project cards do — visible to anonymous visitors
  const spotsLeft = Math.min(capacity, openCount || capacity);
  const filled = Math.max(0, capacity - spotsLeft);
  const fillPct = capacity ? Math.round((filled / capacity) * 100) : 0;
  const owner = ownerName || 'Project owner';
  const applyHref = `/projects/${project.id}/apply`;

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-purple-500/30 selection:text-purple-100">
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-purple-500" />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Hexagon className="w-7 h-7 text-purple-400" fill="currentColor" fillOpacity={0.15} />
            </motion.div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Cross<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </button>
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </header>

      {/* Banner */}
      {project.image_url && (
        <div className="relative h-56 sm:h-72 lg:h-80 w-full overflow-hidden bg-[#0a0a0a]">
          <motion.img
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            src={project.image_url}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-[#050505]/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.06), transparent)' }} />

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 ${project.image_url ? 'pt-8' : 'pt-14'}`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-gray-400 transition-colors">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400 truncate max-w-[200px]">{project.title}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.dept && (
                <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/20">
                  {project.dept}
                </span>
              )}
              {project.difficulty && (
                <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${difficultyColor[project.difficulty] ?? 'border-white/10 text-gray-400'}`}>
                  {project.difficulty}
                </span>
              )}
              {openCount > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-gray-300">
                  <Zap className="w-3 h-3 text-purple-400" />{openCount} open {openCount === 1 ? 'role' : 'roles'}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">{project.title}</h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 grid place-items-center text-[10px] font-bold text-white">
                  {initials(owner)}
                </span>
                {owner}
              </span>
              {project.deadline && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Deadline: {project.deadline}</span>}
              {project.duration && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{project.duration}</span>}
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{filled}/{capacity} members</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7">
              <h2 className="font-display text-xl font-semibold text-white mb-4">About this project</h2>
              {project.description ? (
                <p className="text-gray-400 leading-relaxed text-[15px] whitespace-pre-line">{project.description}</p>
              ) : (
                <p className="text-gray-600 text-sm">The owner hasn&apos;t added a description yet.</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7">
              <h2 className="font-display text-xl font-semibold text-white mb-5">Open roles</h2>

              {roles.length > 0 ? (
                <div className="space-y-4">
                  {roles.map((role, i) => (
                    <div key={`${role.title}-${i}`} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 rounded-xl border border-purple-500/25 bg-white/[0.03]">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0 bg-purple-400" />
                          <span className="font-semibold text-white text-sm">{role.title}</span>
                          {role.count > 1 && <span className="text-xs text-gray-500">({role.count} spots)</span>}
                        </div>
                        {role.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 ml-4">
                            {role.skills.map((skill) => (
                              <span key={skill} className="text-xs px-2 py-0.5 rounded-md border bg-purple-500/10 text-purple-300 border-purple-500/20">{skill}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => router.push(`${applyHref}?role=${encodeURIComponent(role.title)}`)}
                        className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white transition-all hover:opacity-90"
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-8 rounded-xl border border-dashed border-white/[0.08]">
                  <Sparkles className="w-7 h-7 text-white/15 mb-3" />
                  <p className="text-sm text-gray-400 mb-1">No specific roles listed yet</p>
                  <p className="text-xs text-gray-600 mb-5 max-w-xs">
                    The team is open to anyone who fits — send a general application and tell them what you&apos;d bring.
                  </p>
                  <button
                    onClick={() => router.push(applyHref)}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-gray-200 hover:bg-white/[0.10] transition-all"
                  >
                    Apply anyway
                  </button>
                </div>
              )}
            </motion.div>

            {project.tech.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7">
                <h2 className="font-display text-xl font-semibold text-white mb-4">Tech stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 text-sm font-medium">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-purple-500/30 bg-white/[0.025] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)] lg:sticky lg:top-24">
              {capacity > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Team filled</span><span>{fillPct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all" style={{ width: `${fillPct}%` }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">
                    {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              )}
              <button
                onClick={() => router.push(applyHref)}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all duration-200 text-sm mb-3"
              >
                Apply to this project <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </button>
              <p className="text-center text-xs text-gray-600">No account required · Takes 2 minutes</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 space-y-4">
              <h3 className="font-display font-semibold text-white">Project details</h3>
              {[
                { label: 'Department', value: project.dept },
                { label: 'Duration', value: project.duration },
                { label: 'Deadline', value: project.deadline },
                { label: 'Difficulty', value: project.difficulty },
                { label: 'Team size', value: capacity ? `${capacity} people` : null },
              ]
                .filter((d) => d.value)
                .map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-3">
                    <span className="text-xs text-gray-600 flex-shrink-0">{label}</span>
                    <span className="text-xs text-gray-300 text-right">{value}</span>
                  </div>
                ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h3 className="font-display font-semibold text-white mb-4">Project lead</h3>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 grid place-items-center text-xs font-bold text-white">
                  {initials(owner)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{owner}</p>
                  <p className="text-xs text-gray-500">Posted on CrossThink</p>
                </div>
              </div>
            </motion.div>

            {related.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                <h3 className="font-display font-semibold text-white mb-4">More in {project.dept}</h3>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <button key={rp.id} onClick={() => router.push(`/projects/${rp.id}`)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all text-left group">
                      {rp.image_url ? (
                        <img src={rp.image_url} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg flex-shrink-0 bg-gradient-to-br from-violet-500/40 to-purple-600/40" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate group-hover:text-purple-200 transition-colors">{rp.title}</p>
                        <p className="text-xs text-gray-600 truncate">{rp.tech.slice(0, 3).join(' · ') || rp.dept}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
