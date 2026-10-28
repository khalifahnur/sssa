'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Tail } from '@/components/brand/Marks';
import { BRAND_VALUES } from '@/data/academyData';

/**
 * Our values as a pinned horizontal journey (GSAP ScrollTrigger). Vertical scroll drives the track sideways;
 * below the lg breakpoint, or with reduced motion, it falls back to a plain stacked list.
 */
export function ValuesHorizontal({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const H = `h${headingLevel}` as 'h2' | 'h3';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => (track.current ? track.current.scrollWidth - window.innerWidth : 0);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track.current, { x: () => -distance() }, 0).fromTo('[data-values-progress]', { scaleX: 0 }, { scaleX: 1 }, 0);

        // Numerals drift against the track for a little depth
        gsap.utils.toArray<HTMLElement>('[data-value-numeral]').forEach((el) => {
          tl.fromTo(el, { x: 90 }, { x: -90 }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="values-heading" className="relative bg-green text-navy lg:h-svh lg:overflow-hidden">
      <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row">
        <div className="gutter flex flex-col justify-center py-20 lg:w-[46vw] lg:shrink-0 lg:pt-[var(--header-h)]">
          <H id="values-heading" className="display text-mega [--slash:var(--color-navy)]">
            Our <Tail>values</Tail>
          </H>
          <p className="mt-6 max-w-md text-lg font-semibold leading-snug">
            Four principles shape every session on the pitch and every lesson in the classroom.
          </p>
          <p aria-hidden="true" className="mt-10 hidden items-center gap-3 text-xs font-extrabold uppercase tracking-label lg:flex">
            Keep scrolling
            <svg viewBox="0 0 40 12" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M0 6h37M32 1l6 5-6 5" />
            </svg>
          </p>
        </div>

        {BRAND_VALUES.map((v, i) => (
          <article
            key={v.id}
            className="relative flex flex-col justify-center border-t-[3px] border-navy/90 px-[clamp(1.25rem,5vw,4.5rem)] pb-14 pt-28 lg:w-[40vw] lg:shrink-0 lg:border-l-[3px] lg:border-t-0 lg:pb-0 lg:pt-[var(--header-h)]"
          >
            <span
              data-value-numeral
              aria-hidden="true"
              className="outline-text display pointer-events-none absolute right-5 top-4 text-[5.5rem] text-navy/90 sm:text-[7rem] lg:top-[18%] lg:text-[clamp(7rem,16vw,15rem)]"
            >
              0{i + 1}
            </span>
            <div className="relative lg:mt-20">
              <h3 className="display text-xl-display text-white">{v.name}</h3>
              <p className="mt-5 max-w-sm text-xl font-bold leading-snug">{v.definition}</p>
              <p className="mt-8 inline-block bg-navy px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white">{v.proof}</p>
            </div>
          </article>
        ))}
        <div aria-hidden="true" className="hidden lg:block lg:w-[10vw] lg:shrink-0" />
      </div>
      <span
        data-values-progress
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-1.5 origin-left scale-x-0 bg-navy lg:block"
      />
    </section>
  );
}
