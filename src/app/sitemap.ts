import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = 'https://pvrac.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about', 'membership', 'club-kit', 'gallery', 'calendar', 'contact'];
  return pages.map((p) => ({
    url: p ? `${SITE}/${p}/` : `${SITE}/`,
    lastModified: new Date(),
  }));
}