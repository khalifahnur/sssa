import { FixtureRow } from '@/components/sections/FixtureRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Tail } from '@/components/brand/Marks';
import { UPCOMING_FIXTURES } from '@/data/academyData';

export function FixturesPreview() {
  return (
    <section id="matchday" aria-labelledby="fixtures-heading" className="bg-mist py-24 lg:py-32">
      <div className="gutter wrap">
        <SectionHeader title="Fixtures" section="Matchday" />
        <div className="reveal mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 id="fixtures-heading" className="display text-mega">
            <Tail>Matchday</Tail>
          </h2>
          <div className="max-w-sm">
            <p className="text-lg leading-relaxed opacity-75">Come and watch the next generation compete. Reserve a pass for the upcoming showcase fixtures.</p>
            <ButtonLink href="/fixtures" className="mt-6" variant="navy">
              All fixtures &amp; tickets
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-14 border-t-[3px] border-navy">
          {UPCOMING_FIXTURES.map((f) => (
            <FixtureRow key={f.id} fixture={f} href={`/fixtures#${f.id}`} />
          ))}
        </ul>
      </div>
    </section>
  );
}
