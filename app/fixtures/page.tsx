import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { Tail } from '@/components/brand/Marks';
import { FixtureBoard } from '@/components/sections/FixtureBoard';
import { HighlightGallery } from '@/components/sections/HighlightGallery';
import { CtaBand } from '@/components/sections/CtaBand';
import { SubNav } from '@/components/layout/SubNav';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site';
import { UPCOMING_FIXTURES } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'Fixtures & tickets — matchday at St. Sebastian',
  description:
    'Upcoming St. Sebastian Sports Academy fixtures, ticket reservations and match highlights, from the Premier Academy Showcase to the National Scout Invitational.',
  path: '/fixtures',
  keywords: ['academy football fixtures', 'youth football tickets', 'match highlights', 'Premier Academy Showcase'],
});

const eventsLd = UPCOMING_FIXTURES.map((f) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: f.matchTitle,
  startDate: f.startsAt,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  sport: 'Football',
  location: { '@type': 'Place', name: f.location, address: 'Research Triangle Park, NC, US' },
  organizer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    url: absoluteUrl(`/fixtures#${f.id}`),
    price: f.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}));

const TABS = [
  { id: 'tickets', label: 'Fixtures' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'join', label: 'Join' },
];

export default function FixturesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Fixtures', path: '/fixtures' }]), ...eventsLd]} />
      <PageHero
        section="Fixtures"
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Fixtures' }]}
        media="highlight-3"
        title={
          <>
            Be there on <Tail>matchday</Tail>
          </>
        }
        intro="Watch the next generation compete. Reserve your passes for the upcoming showcase fixtures and cheer on the squad."
      />
      <SubNav label="On this page" tabs={TABS} />

      <section id="tickets" aria-labelledby="tickets-heading" className="bg-white py-16 lg:py-24">
        <div className="gutter wrap">
          <h2 id="tickets-heading" className="display text-lg-display mb-10">
            Upcoming fixtures
          </h2>
          <FixtureBoard />
        </div>
      </section>

      <section id="highlights" aria-labelledby="highlights-heading" className="bg-navy py-20 text-white lg:py-32">
        <div className="gutter wrap">
          <SectionHeader title="Highlights" section="Match centre" />
          <h2 id="highlights-heading" className="display text-mega mt-10 mb-14 max-w-4xl">
            Moments that <Tail>matter</Tail>
          </h2>
          <HighlightGallery />
        </div>
      </section>

      <CtaBand title="Join the squad" body="Love what you see on matchday? Book a trial evaluation and take your own place on the pitch." />
    </>
  );
}
