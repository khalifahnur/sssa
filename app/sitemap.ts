import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { ACADEMY_PROGRAMS, BLOG_UPDATES } from '@/data/academyData';

const LAST_REVIEWED = '2026-10-28';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly' as const, priority: 1 },
    { url: absoluteUrl('/academy'), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: absoluteUrl('/programs'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: absoluteUrl('/fixtures'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: absoluteUrl('/news'), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: absoluteUrl('/admissions'), changeFrequency: 'monthly' as const, priority: 0.9 },
  ].map((p) => ({ ...p, lastModified: LAST_REVIEWED }));

  const programs = ACADEMY_PROGRAMS.map((p) => ({
    url: absoluteUrl(`/programs/${p.slug}`),
    lastModified: LAST_REVIEWED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const news = BLOG_UPDATES.map((a) => ({
    url: absoluteUrl(`/news/${a.slug}`),
    lastModified: a.isoDate,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...programs, ...news];
}
