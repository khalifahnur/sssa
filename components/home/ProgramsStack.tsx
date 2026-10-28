'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { CldImage } from '@/components/media/CldImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Tail } from '@/components/brand/Marks';
import type { AcademyProgram } from '@/data/academyData';

const THEMES = [
  { card: 'bg-navy text-white', accent: 'text-green', chip: 'bg-white/10 text-white', btn: 'green' as const },
  { card: 'bg-teal text-white', accent: 'text-green', chip: 'bg-white/10 text-white', btn: 'green' as const },
  { card: 'bg-green text-navy', accent: 'text-white', chip: 'bg-navy/10 text-navy', btn: 'navy' as const },
  { card: 'bg-navy-deep text-white', accent: 'text-green', chip: 'bg-white/10 text-white', btn: 'green' as const },
];

function Panel({ program, index, total, progress }: { program: AcademyProgram; index: number; total: number; progress: MotionValue<number> }) {
  const theme = THEMES[index % THEMES.length];
  const start = index / total;
  const end = (index + 1) / total;
  // Cards settle back and dim as the next one slides over them (Framer Motion, scroll-linked)
  const scale = useTransform(progress, [start, end], [1, index === total - 1 ? 1 : 0.92]);
  const dim = useTransform(progress, [start, end], [0, index === total - 1 ? 0 : 0.45]);

  return (
    <div className="lg:sticky lg:top-[var(--stack-h)] lg:flex lg:h-[calc(100svh-var(--stack-h))] lg:items-center">
      <motion.article
        style={{ scale, transformOrigin: 'center top' }}
        className={`relative grid w-full overflow-hidden rounded-[6px] lg:h-[min(calc(100svh-var(--stack-h)-3rem),40rem)] lg:grid-cols-[0.9fr_1.1fr] ${theme.card}`}
      >
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <CldImage media={program.image} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:p-12">
          <div>
            <p className={`text-xs font-extrabold uppercase tracking-label ${theme.accent}`}>
              0{index + 1} / 0{total} · {program.categoryLabel}
            </p>
            <h3 className="display mt-4 text-[clamp(1.9rem,3.6vw,3.4rem)]">{program.title}</h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-85">{program.summary}</p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em]">
              {[program.ageRange, program.coachRatio, program.schedule.split(' · ')[0]].map((t) => (
                <li key={t} className={`rounded-[3px] px-3 py-1.5 ${theme.chip}`}>
                  {t}
                </li>
              ))}
            </ul>
            <ButtonLink href={`/programs/${program.slug}`} variant={theme.btn} className="mt-6">
              Explore programme
            </ButtonLink>
          </div>
        </div>
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-navy-deep" />
      </motion.article>
    </div>
  );
}

export function ProgramsStack({ programs }: { programs: AcademyProgram[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section id="programmes" aria-labelledby="programs-heading" className="bg-white py-20 lg:pb-0 lg:pt-28">
      <div className="gutter wrap">
        <SectionHeader title="Programmes" section="Pathways" />
        <div className="mt-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <h2 id="programs-heading" className="display text-mega max-w-4xl">
            A pathway for every <Tail>stage</Tail>
          </h2>
          <ButtonLink href="/programs" variant="ghost-dark" className="self-start">
            All programmes
          </ButtonLink>
        </div>
        <div ref={ref} className="mt-12 flex flex-col gap-6 lg:mt-0 lg:block">
          {programs.map((p, i) => (
            <Panel key={p.id} program={p} index={i} total={programs.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

