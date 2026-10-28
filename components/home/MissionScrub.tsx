'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Tail } from '@/components/brand/Marks';

/**
 * Mission statement (Guidelines p.4). Each word is tied to scroll progress with Framer Motion's
 * useScroll + useTransform, so the sentence "lights up" as you read down the page.
 */
/** `*asterisks*` mark the brand-green phrases. */
const SENTENCE =
  'To holistically develop young athletes through *world-class* football training, *transformative academics*, and *character-building values*, preparing every student to thrive, lead, and positively impact their communities.';

interface Run {
  text: string;
  accent: boolean;
}

/** Whitespace-delimited words; a word may mix runs (e.g. "academics" in green + "," in white). */
const WORDS: Run[][] = (() => {
  const words: Run[][] = [];
  let current: Run[] | null = null;
  SENTENCE.split('*').forEach((chunk, i) => {
    const accent = i % 2 === 1;
    for (const ch of chunk) {
      if (ch === ' ') {
        current = null;
        continue;
      }
      if (!current) {
        current = [];
        words.push(current);
      }
      const last = current[current.length - 1];
      if (last && last.accent === accent) last.text += ch;
      else current.push({ text: ch, accent });
    }
  });
  return words;
})();

function Word({ runs, range, progress }: { runs: Run[]; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <>
      <motion.span style={{ opacity, y }} className="inline-block">
        {runs.map((r, i) => (
          <span key={i} className={r.accent ? 'text-green' : undefined}>
            {r.text}
          </span>
        ))}
      </motion.span>{' '}
    </>
  );
}

export function MissionScrub() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const total = WORDS.length;

  return (
    <section id="mission" aria-labelledby="mission-heading" className="relative bg-navy text-white">
      <div ref={ref} className="h-[260svh]">
        <div className="sticky top-[var(--stack-h)] flex h-[calc(100svh-var(--stack-h))] items-center">
          <div className="gutter wrap grid w-full gap-8 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <h2 id="mission-heading" className="display text-xl-display text-green">
              Mission
              <br />
              <Tail>statement</Tail>
            </h2>
            <p className="text-[clamp(1.45rem,3.1vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.005em]">
              {/* Screen readers get the sentence once, not word by word */}
              <span className="sr-only">{SENTENCE.replaceAll('*', '')}</span>
              <span aria-hidden="true">
                {WORDS.map((w, i) => {
                  const start = 0.04 + (i / total) * 0.72;
                  return <Word key={i} runs={w} progress={scrollYProgress} range={[start, start + 0.1]} />;
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
