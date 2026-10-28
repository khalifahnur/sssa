'use client';

import { useRef } from 'react';
import { useScroll } from 'motion/react';
import { CldImage } from '@/components/media/CldImage';
import { ScrollWords } from '@/components/motion/ScrollWords';
import { ButtonLink } from '@/components/ui/Button';
import { BRAND_VALUES } from '@/data/academyData';

const MISSION =
  'To holistically develop young athletes through *world-class* football training, *transformative academics*, and *character-building values*, preparing every student to thrive, lead, and positively impact their communities.';
const VISION =
  'St. Sebastian Sports Academy empowers young athletes to turn *aspiration into achievement*. We exist to create *clear, structured pathways* that set every student up for *lifelong success* on the pitch and in the classroom.';

export function ProjectSection() {
  const cards = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cards, offset: ['start 88%', 'end 42%'] });

  return (
    <section id="project" aria-labelledby="project-heading" className="bg-white pb-24 lg:pb-32">
      <div className="relative isolate flex h-[24rem] items-center justify-center overflow-hidden bg-navy-deep sm:h-[30rem] lg:h-[36rem]">
        <div className="drift absolute -inset-y-[14%] inset-x-0 -z-10">
          <CldImage media="project-banner" decorative sizes="100vw" className="h-full w-full" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/60" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/45 via-transparent to-navy-deep/45" />
        <h2 id="project-heading" className="display reveal-fade pb-10 text-[clamp(5rem,12vw,11rem)] text-white">
          The project
        </h2>
      </div>

      <div ref={cards} className="relative z-10 mx-auto -mt-28 grid w-[min(100%-2rem,66rem)] shadow-[0_40px_90px_-40px_rgba(11,20,36,0.55)] sm:-mt-36 md:grid-cols-2 lg:-mt-44">
        <article className="flex flex-col bg-white p-8 text-navy sm:p-12 lg:p-14">
          <h3 className="display text-[clamp(2.8rem,3.9vw,3.5rem)]">Mission</h3>
          <p className="mt-6 text-[1.05rem] leading-[2]">
            <ScrollWords text={MISSION} progress={scrollYProgress} from={0} to={0.62} accentClass="text-teal" />
          </p>
          <div className="mt-auto pt-10">
            <ButtonLink href="/academy#essence" arrow={false}>
              Discover more
            </ButtonLink>
          </div>
        </article>
        <article className="flex flex-col bg-navy p-8 text-white sm:p-12 lg:p-14">
          <h3 className="display text-[clamp(2.8rem,3.9vw,3.5rem)]">Vision</h3>
          <p className="mt-6 text-[1.05rem] leading-[2]">
            <ScrollWords text={VISION} progress={scrollYProgress} from={0.26} to={0.9} accentClass="text-green" />
          </p>
          <div className="mt-auto pt-10">
            <ButtonLink href="/academy#pillars" variant="light" arrow={false}>
              Discover more
            </ButtonLink>
          </div>
        </article>
      </div>

      <div className="gutter wrap mt-24 lg:mt-32">
        <h3 className="display reveal text-center text-[clamp(2.4rem,3.2vw,3rem)]">Our values</h3>
        <ul className="mt-10 grid border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_VALUES.map((v, i) => (
            <li key={v.id} className={`reveal reveal-${Math.min(i + 1, 4)} border-b border-navy/15 px-2 py-9 sm:px-8 lg:border-b-0 lg:border-r lg:border-navy/15 lg:last:border-r-0`}>
              <p className="display text-6xl text-green">0{i + 1}</p>
              <h4 className="display mt-3 text-[2.2rem] leading-none">{v.name}</h4>
              <p className="mt-4 text-[0.98rem] leading-[1.9] text-navy/75">{v.definition}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
