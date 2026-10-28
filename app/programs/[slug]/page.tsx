import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { CldImage } from '@/components/media/CldImage';
import { ButtonLink } from '@/components/ui/Button';
import { Tail } from '@/components/brand/Marks';
import { CtaBand } from '@/components/sections/CtaBand';
import { SubNav } from '@/components/layout/SubNav';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

const TABS = [
  { id: 'facts', label: 'Facts' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'others', label: 'More programs' },
];

export function generateStaticParams() {
  return ACADEMY_PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/programs/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const program = ACADEMY_PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};
  return pageMetadata({
    title: `${program.title} (${program.ageRange})`,
    description: `${program.summary} ${program.outcomes}`,
    path: `/programs/${program.slug}`,
    keywords: [program.title, `${program.categoryLabel} football program`, program.ageRange],
  });
}

export default async function ProgramPage({ params }: PageProps<'/programs/[slug]'>) {
  const { slug } = await params;
  const program = ACADEMY_PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  const others = ACADEMY_PROGRAMS.filter((p) => p.id !== program.id);

  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    url: absoluteUrl(`/programs/${program.slug}`),
    educationalLevel: program.ageRange,
    provider: { '@type': 'EducationalOrganization', name: SITE.name, url: SITE.url },
  };

  const facts = [
    { label: 'Age group', value: program.ageRange },
    { label: 'Schedule', value: program.schedule },
    { label: 'Coaching ratio', value: program.coachRatio },
  ];

  return (
    <>
      <JsonLd
        data={[
          courseLd,
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Programs', path: '/programs' },
            { name: program.title, path: `/programs/${program.slug}` },
          ]),
        ]}
      />
      <PageHero
        section={program.categoryLabel}
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Programs', href: '/programs' }, { name: program.title }]}
        media={program.image}
        title={program.title}
        intro={program.summary}
      >
        <ButtonLink href={`/admissions?program=${program.slug}#trial`}>Apply for a trial</ButtonLink>
      </PageHero>
      <SubNav label="On this page" tabs={TABS} />

      <section id="facts" aria-label="Program facts" className="bg-white">
        <dl className="gutter wrap grid gap-8 py-12 sm:grid-cols-3 lg:py-16">
          {facts.map((f) => (
            <div key={f.label} className="reveal border-l-[3px] border-green pl-5">
              <dt className="text-xs font-extrabold uppercase tracking-label text-teal">{f.label}</dt>
              <dd className="display mt-2 text-3xl leading-tight sm:text-4xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="syllabus" aria-labelledby="syllabus-heading" className="bg-mist py-20 lg:py-32">
        <div className="gutter wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-[calc(var(--stack-h)+1.5rem)] lg:self-start">
            <h2 id="syllabus-heading" className="display text-xl-display">
              What you will <Tail>learn</Tail>
            </h2>
            <p className="mt-6 max-w-sm opacity-75">The program syllabus, session by session.</p>
          </div>
          <ol className="border-t-[3px] border-navy">
            {program.syllabus.map((item, i) => (
              <li key={item} className="reveal grid grid-cols-[3.5rem_1fr] gap-4 border-b border-navy/15 py-7 sm:grid-cols-[5rem_1fr]">
                <span className="display text-5xl text-green sm:text-6xl">0{i + 1}</span>
                <p className="self-center text-lg font-semibold leading-snug">{item.trim()}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="outcome" aria-labelledby="outcome-heading" className="bg-teal py-20 text-white lg:py-28">
        <div className="gutter wrap grid items-center gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <h2 id="outcome-heading" className="display text-xl-display text-green">
            The <Tail>outcome</Tail>
          </h2>
          <p className="reveal text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.2]">{program.outcomes}</p>
        </div>
      </section>

      <section id="others" aria-labelledby="others-heading" className="bg-white py-20 lg:py-28">
        <div className="gutter wrap">
          <h2 id="others-heading" className="display text-lg-display">
            Other programs
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.id}>
                <Link href={`/programs/${p.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-[4px]">
                    <CldImage media={p.image} sizes="(min-width:768px) 30vw, 100vw" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-xs font-extrabold uppercase tracking-label text-green">{p.ageRange}</p>
                  <h3 className="display mt-1 text-4xl leading-[0.95]">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Ready to apply?" body={`Book a trial evaluation for the ${program.title} and meet the coaching team.`} cta="Apply for a trial" href={`/admissions?program=${program.slug}#trial`} />
    </>
  );
}
