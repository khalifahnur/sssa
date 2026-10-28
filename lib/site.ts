import { BRAND_CONTACT } from '@/data/academyData';

export const SITE = {
  name: BRAND_CONTACT.name,
  shortName: 'St. Sebastian',
  tagline: BRAND_CONTACT.slogan,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sebastian.org').replace(/\/$/, ''),
  description:
    'St. Sebastian Sports Academy develops young athletes through world-class football training, transformative academics and character-building values. Champions for Life.',
  locale: 'en_US',
} as const;

export const NAV_LINKS = [
  { href: '/academy', label: 'Academy' },
  { href: '/programs', label: 'Programmes' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/news', label: 'News' },
  { href: '/admissions', label: 'Admissions' },
] as const;

export function absoluteUrl(path = '/') {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Sentence-case helper for data that is stored in capitals. */
export function sentenceCase(value: string) {
  const lower = value.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
