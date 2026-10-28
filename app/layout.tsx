import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/figtree';
import '@fontsource/saira-extra-condensed/600.css';
import '@fontsource/saira-extra-condensed/700.css';
import '@fontsource/saira-extra-condensed/800.css';
import './globals.css';
import { CrestSprite } from '@/components/brand/Crest';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { absoluteUrl, SITE } from '@/lib/site';
import { BRAND_CONTACT } from '@/data/academyData';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'sports academy',
    'football academy',
    'youth football',
    'scholar athlete',
    'college preparatory',
    'St. Sebastian Sports Academy',
    'Research Triangle Park',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#121e34',
  colorScheme: 'light',
};

const organisationLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'SportsOrganization'],
  '@id': absoluteUrl('/#organization'),
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl('/icon.svg'),
  slogan: SITE.tagline,
  description: SITE.description,
  foundingDate: String(BRAND_CONTACT.foundedYear),
  sport: 'Football',
  telephone: BRAND_CONTACT.phone,
  email: BRAND_CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '800 Park Offices Drive, Suite 3322',
    addressLocality: 'Research Triangle Park',
    addressRegion: 'NC',
    postalCode: '27713',
    addressCountry: 'US',
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': absoluteUrl('/#organization') },
  inLanguage: 'en',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-svh flex-col">
        <CrestSprite />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-[3px] bg-green px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-navy transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SmoothScroll />
        <JsonLd data={[organisationLd, websiteLd]} />
      </body>
    </html>
  );
}
