'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CldImage } from '@/components/media/CldImage';
import { ButtonLink } from '@/components/ui/Button';
import type { AcademyProgram } from '@/data/academyData';

/**
 * Programs: a darkened photographic backdrop, the title on the left and a row of tall photo cards that runs
 * off the right edge. Swipe, drag, use the arrows, or Tab through the cards. Card photos drift sideways as they
 * pass (CSS `animation-timeline: view(inline)`).
 */
export function ProgramsCarousel({ programs }: { programs: AcademyProgram[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
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
        <CldImage media="player-strike" decorative sizes="100vw" className="h-full w-full opacity-45 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/60" />
      </div>

      <div className="py-20 lg:flex lg:items-start lg:py-28">
        <div className="gutter shrink-0 lg:w-[31%] lg:pt-14 lg:pr-10">
          <h2 id="programs-heading" className="display text-xl-display">
            Programs
          </h2>
          <p className="mt-5 max-w-xs text-lg leading-relaxed text-white/75">
            From first touches at eight to full-time residency at twenty-one, a pathway for every stage.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Previous program"
              className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-white/60 transition-colors hover:border-green hover:bg-green hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Next program"
              className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-white/60 transition-colors hover:border-green hover:bg-green hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </button>
            <span aria-hidden="true" className="ml-3 hidden h-[3px] w-24 bg-white/20 sm:block">
              <span className="block h-full origin-left bg-green transition-transform duration-300" style={{ transform: `scaleX(${0.18 + progress * 0.82})` }} />
            </span>
          </div>
          <ButtonLink href="/programs" variant="ghost-light" className="mt-8">
            All programs
          </ButtonLink>
        </div>

        <ul
          ref={track}
          aria-label="Academy programs"
          className="no-scrollbar mt-12 flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pl-5 lg:mt-0 lg:pl-0"
        >
          {programs.map((p, i) => (
            <li key={p.id} className="w-[min(78vw,22rem)] shrink-0 snap-start border-l border-white/15 bg-navy first:border-l-0 sm:w-[23.5rem]">
              <Link href={`/programs/${p.slug}`} className="group block h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="card-drift absolute -inset-x-[8%] inset-y-0">
                    <CldImage
                      media={p.image}
                      sizes="(min-width:640px) 24rem, 80vw"
                      className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute left-0 top-5 bg-green px-4 py-1.5 font-display text-lg font-bold uppercase leading-none tracking-wide text-navy">{p.ageRange}</span>
                  <span aria-hidden="true" className="display absolute bottom-3 right-4 text-6xl text-white/90 [text-shadow:0_2px_16px_rgb(0_0_0/0.5)]">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <p className="text-xs font-extrabold uppercase tracking-label text-green">{p.categoryLabel}</p>
                  <h3 className="display text-[2.4rem] leading-[0.95]">{p.title}</h3>
                  <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-white/70">{p.summary}</p>
                  <span className="mt-2 inline-flex items-center gap-2 self-start border-b-2 border-green pb-1 font-display text-xl font-bold uppercase tracking-wide">
                    Discover more
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {/* Breathing room so the last card can settle at the left edge of the track */}
          <li aria-hidden="true" className="hidden w-[10vw] shrink-0 lg:block" />
        </ul>
      </div>
    </section>
  );
}
