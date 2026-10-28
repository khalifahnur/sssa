import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { Tail } from '@/components/brand/Marks';
import { ProgramBrowser } from '@/components/sections/ProgramBrowser';
import { CtaBand } from '@/components/sections/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { SubNav } from '@/components/layout/SubNav';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site';
import { ACADEMY_PROGRAMS, HOW_WE_HELP_SERVICES } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'Programs — youth, teen, scholar and 1-to-1 football pathways',
  description:
    'Explore St. Sebastian programs for ages 8–21: Youth Foundation, Teen Competitive Academy, the Full-Time Pro & Scholar Pathway and bespoke 1-to-1 Elite Mastery coaching.',
  path: '/programs',
  keywords: ['youth football program', 'football academy ages 8-15', 'scholar pathway', '1-to-1 football coaching'],
});

const listLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${SITE.name} programs`,
  itemListElement: ACADEMY_PROGRAMS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: absoluteUrl(`/programs/${p.slug}`),
    name: p.title,
  })),
};

const TABS = [
  { id: 'browse', label: 'Browse' },
  { id: 'more-ways', label: 'Camps & training' },
  { id: 'join', label: 'Apply' },
];

export default function ProgramsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs' }]), listLd]} />
      <SubNav label="On this page" tabs={TABS} first />
      <PageHero
        section=""
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Programs' }]}
        media="programs-backdrop"
        title={
          <>
            A pathway for every player
          </>
        }
        //intro="From first touches at eight to full-time residency at twenty-one, every program is built around the same promise: elite football, real education, lasting character."
      />

      <section id="browse" aria-labelledby="browse-heading" className="bg-white py-16 lg:py-24">
        <div className="gutter wrap">
          <h2 id="browse-heading" className="sr-only">
            Browse programs
          </h2>
          <ProgramBrowser />
        </div>
      </section>

      <section id="more-ways" aria-labelledby="help-heading" className="bg-mist py-20 lg:py-32">
        <div className="gutter wrap">
          <SectionHeader title="More ways in" section="Camps & training" />
          <h2 id="help-heading" className="display text-mega mt-10 max-w-3xl">
            Short on time? Start here
          </h2>
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_WE_HELP_SERVICES.map((s, i) => (
              <li key={s.id} className={`reveal reveal-${i + 1} border-t-[3px] border-navy pt-6`}>
                <p className="text-xs font-extrabold uppercase tracking-label text-green">0{i + 1}</p>
                <h3 className="display mt-3 text-4xl leading-[0.95]">{s.title}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-teal">{s.subtitle}</p>
                <p className="mt-4 opacity-75">{s.description}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/admissions#trial" className="mt-14" variant="navy">
            Ask about camps
          </ButtonLink>
        </div>
      </section>

      <CtaBand title="Find your fit" body="Not sure which program suits your athlete? Tell us about their position, experience and goals and we will point you in the right direction." cta="Talk to admissions" />
    </>
  );
}
