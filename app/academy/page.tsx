import type { Metadata } from 'next';
import { CldImage } from '@/components/media/CldImage';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { Slash, Tail } from '@/components/brand/Marks';
import { PathwayTimeline } from '@/components/home/PathwayTimeline';
import { CtaBand } from '@/components/sections/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { SubNav } from '@/components/layout/SubNav';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { BRAND_VOICE, CAMPUS_FACILITIES, CORE_ACADEMY_PILLARS, INSTITUTIONAL_HERO_COPY } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'The Academy — residential football & scholar education',
  description:
    'Discover St. Sebastian Sports Academy: structured pathways, a 400-scholar residential campus, Cambridge-standard academics and elite football coaching for young athletes aged 11+.',
  path: '/academy',
  keywords: ['residential football academy', 'scholar athlete pathway', 'Cambridge curriculum', 'boarding sports academy'],
});

const TABS = [
  { id: 'essence', label: 'Essence' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'campus', label: 'Campus' },
  { id: 'voice', label: 'Voice' },
  { id: 'legacy', label: 'Legacy' },
];

const crumbs = [{ name: 'Home', href: '/' }, { name: 'The Academy' }];

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'The Academy', path: '/academy' }])} />
      <SubNav label="On this page" tabs={TABS} first />
      <PageHero
        section="The Academy"
        crumbs={crumbs}
        media="campus-wide"
        title={
          <>
            Where dreams become <Tail>reality</Tail>
          </>
        }
        intro={INSTITUTIONAL_HERO_COPY.mission}
      >
        <ButtonLink href="/admissions#trial">Book a trial</ButtonLink>
        <ButtonLink href="/programs" variant="ghost-light">
          Programs
        </ButtonLink>
      </PageHero>

      {/* Essence + promise (Guidelines p.7) */}
      <section id="essence" aria-labelledby="essence-heading" className="bg-white py-20 lg:py-32">
        <div className="gutter wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="essence-heading" className="display text-xl-display text-green reveal">
            Brand
            <br />
            <Tail>essence</Tail>
          </h2>
          <div className="reveal reveal-2 space-y-6 text-lg leading-relaxed lg:text-xl">
            <p>
              St. Sebastian Sports Academy empowers young athletes to turn aspiration into achievement. We exist to create clear, structured pathways that set every student up for lifelong success.
            </p>
            <p className="opacity-75">
              Transforming dreams into tangible realities. Our name honours St. Sebastian, the patron saint of athletics, symbolising resilience, discipline and excellence.
            </p>
          </div>
          <h2 className="display text-xl-display text-green reveal">
            Brand
            <br />
            <Tail>promise</Tail>
          </h2>
          <div className="reveal reveal-2">
            <p className="display text-[clamp(3.4rem,9vw,8rem)] text-green">Champions for life</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75">
              This slogan reflects our commitment to nurturing well-rounded individuals — not only exceptional athletes, but also strong leaders, responsible citizens, and impactful members of society.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars, each with a sticky image */}
      <section id="pillars" aria-labelledby="pillars-heading" className="bg-mist py-20 lg:py-32">
        <div className="gutter wrap">
          <SectionHeader title="How it works" section="Three pillars" />
          <h2 id="pillars-heading" className="display text-mega mt-10 max-w-4xl">
            One academy, three ways in <Slash />
          </h2>
          <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-40">
            {CORE_ACADEMY_PILLARS.map((pillar, i) => (
              <article key={pillar.number} className="grid gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={`lg:sticky lg:top-[calc(var(--stack-h)+1.5rem)] lg:self-start ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="wipe-in relative aspect-[4/3] overflow-hidden rounded-[4px] lg:aspect-[5/4]">
                    <div className="drift absolute -inset-y-[8%] inset-x-0">
                      <CldImage media={pillar.image} sizes="(min-width:1024px) 44vw, 100vw" className="h-full w-full" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="outline-text display text-[clamp(4rem,10vw,9rem)] [--stroke:var(--color-navy)]">{pillar.number}</p>
                  <h3 className="display text-xl-display">{pillar.title}</h3>
                  <p className="mt-4 max-w-md text-lg opacity-75">{pillar.subtitle}</p>
                  <dl className="mt-10 border-t-[3px] border-navy">
                    {pillar.items.map((item) => (
                      <div key={item.heading} className="reveal grid gap-1 border-b border-navy/15 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                        <dt className="text-xs font-extrabold uppercase tracking-label text-teal">{item.heading}</dt>
                        <dd className="font-semibold">{item.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Campus */}
      <section id="campus" aria-labelledby="campus-heading" className="bg-navy py-20 text-white lg:py-32">
        <div className="gutter wrap">
          <SectionHeader title="Campus" section="Facilities" />
          <h2 id="campus-heading" className="display text-mega mt-10 max-w-4xl">
            Built for scholars <Slash />
          </h2>
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-10">
            {Object.values(CAMPUS_FACILITIES).map((zone) => (
              <article key={zone.category} className="reveal">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                  <div className="drift absolute -inset-y-[8%] inset-x-0">
                    <CldImage media={zone.image} sizes="(min-width:1024px) 44vw, 100vw" className="h-full w-full" />
                  </div>
                </div>
                <h3 className="display mt-8 text-lg-display text-green">{zone.category}</h3>
                <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
                  {zone.highlights.map((h) => (
                    <li key={h.title} className="py-4">
                      <p className="font-extrabold">{h.title}</p>
                      <p className="text-sm text-white/65">{h.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Voice (Guidelines p.6) */}
      <section id="voice" aria-labelledby="voice-heading" className="bg-green py-20 text-navy lg:py-32">
        <div className="gutter wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 id="voice-heading" className="display text-xl-display [--slash:var(--color-navy)]">
            How we <Tail>speak</Tail>
          </h2>
          <ul className="divide-y-[3px] divide-navy/90 border-y-[3px] border-navy/90">
            {BRAND_VOICE.map((v) => (
              <li key={v.name} className="reveal group grid gap-2 py-6 transition-colors hover:bg-white/10 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <p className="display text-lg-display text-white">{v.name}</p>
                <p className="self-center text-lg font-semibold leading-snug">{v.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PathwayTimeline />
      <CtaBand />
    </>
  );
}
