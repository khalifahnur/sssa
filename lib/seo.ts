import type { Metadata } from 'next';
import { absoluteUrl, SITE } from '@/lib/site';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative image URL for social cards. Falls back to the generated brand card. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
}

export function pageMetadata({ title, description, path, image, type = 'website', publishedTime, keywords }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
