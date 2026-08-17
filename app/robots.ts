import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // private or signed-in-only surfaces — nothing here is useful in a search result
      disallow: ['/api/', '/workspace/', '/dashboard/', '/profile', '/feed', '/reset-password', '/auth/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
