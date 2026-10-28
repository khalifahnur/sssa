'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CldImage } from '@/components/media/CldImage';
import { ArrowCircle } from '@/components/ui/Icons';
import type { AcademyProgram } from '@/data/academyData';

/**
 * Programs: a darkened photographic backdrop, the title at the top left, round arrow buttons beneath it and a
 * row of photo cards that runs off the right edge. Swipe, drag, use the arrows, or Tab through the cards.
 * Card photos drift sideways as they pass (CSS `animation-timeline: view(inline)`).
 */
export function ProgramsCarousel({ programs }: { programs: AcademyProgram[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (el && card) el.scrollBy({ left: dir * card.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="programs" aria-labelledby="programs-heading" className="relative isolate overflow-hidden bg-navy-deep text-white">
      {/* Backdrop photograph, kept dark so the cards carry the colour */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <CldImage media="programs-backdrop" decorative sizes="100vw" className="h-full w-full opacity-60 grayscale" />
        <div className="absolute inset-0 bg-navy-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 via-transparent to-transparent" />
      </div>

      <div className="relative py-16 lg:flex lg:min-h-[44rem] lg:py-24">
        <div className="gutter shrink-0 lg:flex lg:w-[31%] lg:flex-col lg:justify-between lg:pr-10 lg:pt-12">
          <h2 id="programs-heading" className="display text-[clamp(3.6rem,6vw,5.4rem)]">
            Programs
          </h2>
          <div className="mt-8 flex items-center gap-5 lg:mt-0 lg:pb-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Previous program"
              className="group text-white transition-opacity disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowCircle dir="prev" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Next program"
              className="group text-white transition-opacity disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowCircle dir="next" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          aria-label="Academy programs"
          className="no-scrollbar mt-10 flex min-w-0 flex-1 snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain scroll-smooth pl-5 lg:mt-0 lg:pl-0"
        >
          {programs.map((p, i) => (
            <li key={p.id} className="w-[min(78vw,22rem)] shrink-0 snap-start sm:w-[23.75rem]">
              <Link href={`/programs/${p.slug}`} className="group relative block aspect-[19/22] overflow-hidden bg-navy">
                <div className="card-drift absolute -inset-x-[8%] inset-y-0">
                  <CldImage
                    media={p.image}
                    sizes="(min-width:640px) 26rem, 80vw"
                    className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-transparent" />
                <span className="absolute left-0 top-6 bg-green px-4 py-1.5 font-display text-xl font-bold uppercase leading-none tracking-wide text-navy">{p.ageRange}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="display text-[clamp(2.2rem,2.6vw,2.7rem)] leading-[0.95] [text-wrap:balance]">{p.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide text-green opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100">
                    Discover more
                    <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                </div>
                <span aria-hidden="true" className="absolute right-5 top-5 font-display text-3xl font-bold text-white/70">
                  0{i + 1}
                </span>
              </Link>
            </li>
          ))}
          <li className="w-[min(78vw,22rem)] shrink-0 snap-start sm:w-[23.75rem]">
            <Link href="/programs" className="group flex aspect-[19/22] flex-col justify-between border border-white/25 bg-navy/70 p-7 backdrop-blur-sm transition-colors hover:bg-green hover:text-navy">
              <span className="text-xs font-extrabold uppercase tracking-label text-green transition-colors group-hover:text-navy">Every stage</span>
              <span>
                <span className="display block text-[clamp(2.4rem,3vw,3rem)] leading-[0.95]">View all programs</span>
                <ArrowRight className="mt-6 h-9 w-9 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1.6} />
              </span>
            </Link>
          </li>
          <li aria-hidden="true" className="hidden w-[6vw] shrink-0 lg:block" />
        </ul>
      </div>
    </section>
  );
}
