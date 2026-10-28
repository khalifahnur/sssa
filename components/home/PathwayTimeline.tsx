'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Tail } from '@/components/brand/Marks';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LEGACY_TIMELINE } from '@/data/academyData';

export function PathwayTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02], [0.3, 1]);

  return (
    <section id="legacy" aria-labelledby="legacy-heading" className="bg-teal py-24 text-white lg:py-32">
      <div className="gutter wrap">
        <SectionHeader title="Our legacy" section="1985 — today" />
        <h2 id="legacy-heading" className="display text-mega mt-10 max-w-4xl">
          Four decades of building <Tail>champions</Tail>
        </h2>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <span aria-hidden="true" className="absolute bottom-0 left-[0.6rem] top-0 w-[3px] bg-white/15 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: grow, transformOrigin: 'top' }}
            className="absolute bottom-0 left-[0.6rem] top-0 w-[3px] bg-green lg:left-1/2 lg:-translate-x-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ opacity: dotOpacity }}
            className="absolute left-0 top-0 h-6 w-6 rounded-full bg-green lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-16 lg:space-y-24">
            {LEGACY_TIMELINE.map((item, i) => (
              <li key={item.year} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-24 lg:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-3 h-[1.2rem] w-[1.2rem] rounded-full border-[3px] border-green bg-teal lg:left-1/2 lg:-translate-x-1/2" />
                <div className={`reveal ${i % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                  <p className="display text-[clamp(3.5rem,9vw,8rem)] text-white">{item.year}</p>
                </div>
                <div className={`reveal reveal-2 ${i % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1 lg:text-right'}`}>
                  <h3 className="text-xl font-extrabold uppercase leading-tight tracking-wide sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-md text-white/75 lg:inline-block">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
