// Set NEXT_PUBLIC_SITE_URL in the host's env once deployed — OG/Twitter images,
// canonical URLs and the sitemap must be absolute, and crawlers can't resolve localhost.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
