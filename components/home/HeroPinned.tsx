'use client';

import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { scrollToId } from '@/lib/scroll';
import { CldVideo } from '@/components/media/CldVideo';
import { Range } from '@/components/brand/Range';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Pinned, scroll-scrubbed opening scene (GSAP + ScrollTrigger).
 *   At rest   A full-bleed, darkened video with a monumental title and a scroll button.
 *   Scrolling The title lifts away and the darkness clears so the footage comes to life, then a second statement
 *             rises as two mountain ranges climb the frame, and the navy ridge hands off to the next section.
 * Visitors who prefer reduced motion get the static first frame.
 */
export function HeroPinned() {
  // GSAP re-parents a pinned element into a `pin-spacer`. Pin an inner element and keep React's own
  // node (this wrapper) stable, otherwise React throws when it reconciles the page on route changes.
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scene.current,
            start: 'top top',
            end: '+=240%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to('[data-hero-line]', { yPercent: -115, stagger: 0.05, duration: 0.55, ease: 'power2.in' }, 0)
          // Explicit start values: the CSS intro animation is still holding opacity at 0 when this timeline is created
          .fromTo('[data-hero-fade]', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.4 }, 0)
          // The video "appears": it settles from a slow zoom while the darkness over it clears
          .fromTo('[data-hero-video]', { scale: 1.18 }, { scale: 1, duration: 1.6 }, 0)
          .to('[data-hero-dim]', { opacity: 0.08, duration: 0.7, ease: 'power1.out' }, 0.05)
          .to('[data-hero-dim]', { opacity: 0.5, duration: 0.5, ease: 'power1.inOut' }, 0.95)
          .fromTo(
            '[data-hero-statement] > *',
            { autoAlpha: 0, yPercent: 60 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' },
            0.9
          )
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
    <div ref={root}>
      <section ref={scene} aria-label="Introduction" className="relative h-svh min-h-[34rem] overflow-hidden bg-navy-deep text-white">
        <div className="intro-window absolute inset-0">
          <div data-hero-video className="absolute inset-0">
            <CldVideo media="hero-reel" className="absolute inset-0 h-full w-full" />
          </div>
          <div data-hero-dim className="absolute inset-0 bg-navy-deep opacity-[0.58]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/55" />
        </div>

        <div className="gutter relative z-10 flex h-full flex-col justify-center pb-12 pt-[var(--header-h)]">
          <h1 className="display mt-2 text-[clamp(5rem,12.5vw,13.5rem)] leading-[0.84]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-hero-line className="block">
                <span className="intro-up block [animation-delay:150ms]">Champions</span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-hero-line className="block">
                <span className="intro-up block [animation-delay:280ms]">
                  for life<span className="text-green">.</span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <div data-hero-fade className="intro-fade absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center [animation-delay:900ms]">
          <span aria-hidden="true" className="pointer-events-none -mb-3 h-8 w-[1.5px] bg-white" />
          <button
            type="button"
            onClick={() => scrollToId('project')}
            aria-label="Scroll down to the project"
            className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-white bg-navy-deep/40 text-white transition-colors hover:border-green hover:bg-green hover:text-navy"
          >
            <ArrowDown className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="gutter pointer-events-none absolute inset-0 z-50 flex items-center">
          <div data-hero-statement>
            <p className="invisible display text-[clamp(3.4rem,10vw,9.5rem)]">Elite football.</p>
            <p className="invisible display text-[clamp(3.4rem,10vw,9.5rem)] text-green">Real education.</p>
            <p className="invisible display text-[clamp(3.4rem,10vw,9.5rem)]">Lifelong leaders.</p>
            <div className="pointer-events-auto invisible mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/admissions#trial">Book a trial</ButtonLink>
              <ButtonLink href="/programs" variant="ghost-light">
                Explore programs
              </ButtonLink>
            </div>
          </div>
        </div>

        <div data-mtn-back aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-30">
          <Range fill="#1f4b50" facet="#88b03f" facetOpacity={0.35} profile={0} className="h-[56svh]" />
          <div className="h-[130svh] bg-teal" />
        </div>
        <div data-mtn-front aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-40">
          <Range fill="#121e34" facet="#ffffff" facetOpacity={0.16} profile={1} className="h-[56svh]" />
          <div className="h-[130svh] bg-navy" />
        </div>
      </section>
    </div>
  );
}
