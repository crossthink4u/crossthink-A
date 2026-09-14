import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import ProjectDetailView from '@/components/pages/ProjectDetailView';

// Server shell: its only job is real per-project metadata, so a shared link shows the
// project's own title, summary and cover instead of the generic site card.
async function getProject(id: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('projects')
      .select('title, description, dept, image_url, tech, is_public')
      .eq('id', id)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return { title: 'Project not found', robots: { index: false, follow: false } };
  }

  const summary =
    project.description?.slice(0, 200) ||
    `An open ${project.dept ?? 'student'} project looking for collaborators on CrossThink.`;

  return {
    title: project.title,
    description: summary,
    keywords: project.tech?.length ? project.tech : undefined,
    alternates: { canonical: `/projects/${id}` },
    // private projects stay out of search results even if the URL leaks
    robots: project.is_public ? undefined : { index: false, follow: false },
    openGraph: {
      type: 'article',
      title: project.title,
      description: summary,
      url: `/projects/${id}`,
      images: project.image_url ? [{ url: project.image_url, alt: project.title }] : undefined,
    },
    twitter: {
      card: project.image_url ? 'summary_large_image' : 'summary',
      title: project.title,
      description: summary,
      images: project.image_url ? [project.image_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetailView id={id} />;
}
