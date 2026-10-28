import { Star } from '@/components/brand/Marks';

const WORDS = ['Champions for life', 'People-centred', 'Tenacious', 'Valiant', 'Respectful'];

/** Endless brand ticker. Pure CSS (see .marquee in globals.css); pauses on hover and stops for reduced motion. */
export function Marquee() {
  const track = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <li key={w} className="flex items-center">
          <span className={`display whitespace-nowrap px-8 text-[clamp(2.4rem,6vw,5.5rem)] ${i % 2 ? 'outline-text [--stroke:var(--color-navy)]' : 'text-navy'}`}>{w}</span>
          <Star size={30} className="shrink-0 text-green" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Our values" className="group overflow-hidden border-y-[3px] border-navy bg-white py-6">
      <div className="marquee flex w-max">
        {track()}
        {track(true)}
      </div>
    </section>
  );
}
