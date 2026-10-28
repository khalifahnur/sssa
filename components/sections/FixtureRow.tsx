import Link from 'next/link';
import type { FixtureTicket } from '@/data/academyData';

/** One fixture as a ticket-stub style row: date block, teams, venue and price. */
export function FixtureRow({ fixture, href, tone = 'light' }: { fixture: FixtureTicket; href: string; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const low = fixture.seatsRemaining <= 20;
  return (
    <li>
      <Link
        href={href}
        className={`group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 border-b py-6 transition-colors sm:grid-cols-[6rem_1fr_auto] sm:gap-x-10 lg:py-8 ${
          dark ? 'border-white/15 hover:bg-white/5' : 'border-navy/15 hover:bg-mist'
        }`}
      >
        <time dateTime={fixture.startsAt} className="text-center leading-none">
          <span className="display block text-6xl sm:text-7xl">{fixture.dayNumber}</span>
          <span className="mt-1 block text-[0.65rem] font-extrabold uppercase tracking-label text-green">{fixture.monthName.slice(0, 3)}</span>
        </time>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">{fixture.competition}</p>
          <h3 className="display mt-1 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[0.98]">{fixture.matchTitle}</h3>
          <p className="mt-2 text-sm opacity-70">
            {fixture.kickoffTime} · {fixture.location}
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end">
          <span className="text-2xl font-extrabold">${fixture.price}</span>
          <span
            className={`rounded-[3px] px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] ${
              low ? 'bg-sun text-navy' : dark ? 'bg-white/10 text-white' : 'bg-navy/8 text-navy'
            }`}
          >
            {fixture.seatsRemaining} seats left
          </span>
        </div>
      </Link>
    </li>
  );
}
