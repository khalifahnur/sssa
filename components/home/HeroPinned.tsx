'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CldVideo } from '@/components/media/CldVideo';
import { Range } from '@/components/brand/Range';
import { ButtonLink } from '@/components/ui/Button';
import { INSTITUTIONAL_METRICS } from '@/data/academyData';

/**
 * Pinned, scroll-scrubbed opening scene (GSAP + ScrollTrigger).
 *   1. A framed video window opens to full bleed while the headline lifts away.
 *   2. A second statement rises over the footage as two mountain ranges climb the frame.
 *   3. The navy ridge swallows the screen, handing off seamlessly to the mission section.
 * Visitors who prefer reduced motion get the static first frame.
 */
export function HeroPinned() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=240%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to('[data-hero-line]', { yPercent: -115, stagger: 0.05, duration: 0.55, ease: 'power2.in' }, 0)
          .to('[data-hero-fade]', { autoAlpha: 0, y: -40, duration: 0.4 }, 0)
          .to(
            '[data-hero-window]',
            { '--hw-t': '0%', '--hw-r': '0%', '--hw-b': '0%', '--hw-l': '0%', '--hw-radius': '0px', duration: 1, ease: 'power2.inOut' },
            0
          )
          .fromTo('[data-hero-video]', { scale: 1.22 }, { scale: 1, duration: 1.6 }, 0)
          .to('[data-hero-dim]', { opacity: 0.62, duration: 1 }, 0.2)
          .fromTo('[data-hero-statement] > *', { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, 0.85)
          .fromTo('[data-mtn-back]', { y: 0 }, { y: () => -window.innerHeight * 0.66, duration: 1.2 }, 0.8)
          .fromTo('[data-mtn-front]', { y: 0 }, { y: () => -window.innerHeight * 0.74, duration: 1.1 }, 1.05)
          .to('[data-hero-statement]', { yPercent: -28, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 1.8)
          .to('[data-mtn-front]', { y: () => -window.innerHeight * 1.65, duration: 0.7, ease: 'power1.in' }, 1.9)
          .to('[data-mtn-back]', { y: () => -window.innerHeight * 1.7, duration: 0.7, ease: 'power1.in' }, 1.9);
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative h-svh min-h-[34rem] overflow-hidden bg-navy text-white"
    >
      {/* Video, revealed through a clip-path window that GSAP opens up */}
      <div data-hero-window className="hero-window absolute inset-0 will-change-[clip-path]">
        <div data-hero-video className="absolute inset-0">
          <CldVideo media="hero-reel" className="absolute inset-0 h-full w-full" />
        </div>
        <div data-hero-dim className="absolute inset-0 bg-navy opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
      </div>

      {/* Opening headline */}
      <div className="gutter wrap relative z-10 flex h-full flex-col justify-start pt-[calc(var(--header-h)+1.75rem)] lg:justify-center lg:pt-[var(--header-h)]">
        <p data-hero-fade className="text-[0.7rem] font-extrabold uppercase tracking-label text-green sm:text-xs">
          Football · Academics · Character
        </p>
        <h1 className="display text-hero mt-3 leading-[0.86]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              Champions
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              for life<span className="text-green">.</span>
            </span>
          </span>
        </h1>

        <div data-hero-fade className="mt-6 hidden lg:block">
          <p className="max-w-md text-lg leading-relaxed text-white/80 [@media(max-height:820px)]:hidden">
            St. Sebastian turns aspiration into achievement. World-class football, transformative academics and the character to lead.
          </p>
          <div className="mt-8 flex gap-3 [@media(max-height:820px)]:mt-6">
            <ButtonLink href="/admissions#trial">Book a trial</ButtonLink>
            <ButtonLink href="/programs" variant="ghost-light">
              Explore programmes
            </ButtonLink>
          </div>
        </div>

        <dl data-hero-fade className="absolute bottom-6 left-[clamp(1.25rem,5vw,4.5rem)] right-[clamp(1.25rem,5vw,4.5rem)] z-10 flex items-end justify-between gap-4 lg:right-auto lg:justify-start lg:gap-12">
          {INSTITUTIONAL_METRICS.map((m) => (
            <div key={m.label}>
              <dd className="display text-3xl text-white sm:text-5xl">{m.value}</dd>
              <dt className="mt-1 text-[0.62rem] font-bold uppercase tracking-label text-white/60 sm:text-xs">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Statement that rises over the full-bleed footage */}
      <div className="gutter wrap pointer-events-none absolute inset-0 z-50 flex items-center">
        <div data-hero-statement>
          <p className="invisible display text-[clamp(2.4rem,7vw,6.6rem)]">Elite football.</p>
          <p className="invisible display text-[clamp(2.4rem,7vw,6.6rem)] text-green">Real education.</p>
          <p className="invisible display text-[clamp(2.4rem,7vw,6.6rem)]">Lifelong leaders.</p>
        </div>
      </div>

      {/* Mountain ranges climbing the frame. Each is a ridge plus a solid block below it, parked off-screen. */}
      <div data-mtn-back aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-30">
        <Range fill="#1f4b50" facet="#88b03f" facetOpacity={0.35} profile={0} className="h-[56svh]" />
        <div className="h-[130svh] bg-teal" />
      </div>
      <div data-mtn-front aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-40">
        <Range fill="#121e34" facet="#ffffff" facetOpacity={0.16} profile={1} className="h-[56svh]" />
        <div className="h-[130svh] bg-navy" />
      </div>
    </section>
  );
}
