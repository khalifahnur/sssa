import { FixtureRow } from '@/components/sections/FixtureRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Tail } from '@/components/brand/Marks';
import { UPCOMING_FIXTURES } from '@/data/academyData';

export function FixturesPreview() {
  return (
    <section aria-labelledby="fixtures-heading" className="bg-mist py-24 lg:py-32">
      <div className="gutter wrap">
        <SectionHeader title="Fixtures" section="Matchday" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.6fr_1.6fr] lg:gap-16">
          <div className="reveal">
            <h2 id="fixtures-heading" className="display text-mega">
              <Tail>Matchday</Tail>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed opacity-75">
              Come and watch the next generation compete. Reserve a pass for the upcoming showcase fixtures.
            </p>
            <ButtonLink href="/fixtures" className="mt-8" variant="navy">
              All fixtures &amp; tickets
            </ButtonLink>
          </div>
          <ul className="border-t border-navy/15">
            {UPCOMING_FIXTURES.map((f) => (
              <FixtureRow key={f.id} fixture={f} href={`/fixtures#${f.id}`} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
