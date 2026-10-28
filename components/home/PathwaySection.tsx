'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { CldImage } from '@/components/media/CldImage';
import { ButtonLink } from '@/components/ui/Button';
import type { MediaKey } from '@/data/media';

function Tile({ media, className = '', sizes }: { media: MediaKey; className?: string; sizes: string }) {
  return (
    <div data-tile className={`group relative overflow-hidden ${className}`}>
      <CldImage media={media} sizes={sizes} className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
    </div>
  );
}

export function PathwaySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-tile]', { clipPath: 'inset(0 0 100% 0)' });
        ScrollTrigger.batch('[data-tile]', {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(batch, { clipPath: 'inset(0 0 100% 0)', y: 36 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 }),
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="pathway" aria-labelledby="pathway-heading" className="bg-white pb-8 pt-20 lg:pt-32">
      <div className="px-5 lg:pl-[26%] lg:pr-8">
        <div className="max-w-[41rem]">
          <h2 id="pathway-heading" className="display reveal text-[clamp(2.8rem,3.9vw,3.6rem)]">
            Player pathway
          </h2>
          <p className="reveal reveal-2 mt-6 text-[1.05rem] leading-[2]">
            From local grassroots to national championships and top-tier universities, every scholar-athlete is followed from first trial to first
            contract, with long-term performance tracking, professional club placement and FIFA Connect integration.
          </p>
          <ButtonLink href="/programs/scholar-pathway"  arrow={false} className="reveal reveal-3 mt-8">
            Discover more
          </ButtonLink>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-1 px-4 lg:mt-16 lg:auto-rows-[clamp(11rem,15.5vw,15.5rem)] lg:grid-cols-4 lg:px-8">
        <div className="col-span-2 flex flex-col justify-end px-1 pb-6 pt-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:pb-8">
          <p className="display reveal text-[clamp(4.5rem,8vw,7rem)] leading-[0.85] text-green">98%</p>
          <p className="reveal reveal-2 mt-3 max-w-[16rem] text-[0.95rem] leading-[1.7] text-navy/75">
            placed into scholarships or professional club contracts.
          </p>
        </div>
        <Tile
          media="pathway-main"
          sizes="(min-width:1024px) 70vw, 100vw"
          className="col-span-2 aspect-[3/2] lg:col-span-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto"
        />
        <Tile media="pathway-a" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3] lg:col-start-1 lg:row-start-2 lg:aspect-auto" />
        <Tile media="pathway-b" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3] lg:col-start-1 lg:row-start-3 lg:aspect-auto" />
        <Tile media="pathway-c" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3] lg:col-start-2 lg:row-start-3 lg:aspect-auto" />
        <Tile media="pathway-d" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3] lg:col-start-3 lg:row-start-3 lg:aspect-auto" />
        <Tile media="pathway-e" sizes="(min-width:1024px) 25vw, 50vw" className="col-span-2 aspect-[16/9] lg:col-span-1 lg:col-start-4 lg:row-start-3 lg:aspect-auto" />
      </div>
    </section>
  );
}
