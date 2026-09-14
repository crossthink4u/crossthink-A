import type { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';
import { siteUrl } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/login`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/register`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('projects')
      .select('id, created_at')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(1000);

    return [
      ...staticRoutes,
      ...(data ?? []).map((p) => ({
        url: `${siteUrl}/projects/${p.id}`,
        lastModified: p.created_at ? new Date(p.created_at) : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // a sitemap missing its project entries still beats a 500
    return staticRoutes;
  }
}
