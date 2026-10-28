'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Slash } from '@/components/brand/Marks';

/**
 * Mission and vision as one scroll-driven scene (Framer Motion useScroll + useTransform).
 * The stage pins while you scroll: the mission lights up word by word, hands over to the vision,
 * and the vision lights up in turn. Wording from the Brand Guidelines (p.4 and p.7).
 * `*asterisks*` mark the brand-green phrases.
 */
const MISSION =
  'To holistically develop young athletes through *world-class* football training, *transformative academics*, and *character-building values*, preparing every student to thrive, lead, and positively impact their communities.';
const VISION =
  'St. Sebastian Sports Academy empowers young athletes to turn *aspiration into achievement*. We exist to create *clear, structured pathways* that set every student up for *lifelong success* on the pitch and in the classroom.';

interface Run {
  text: string;
  accent: boolean;
}

/** Whitespace-delimited words; a word may mix runs (e.g. "academics" in green + "," in white). */
function toWords(sentence: string): Run[][] {
  const words: Run[][] = [];
  let current: Run[] | null = null;
  sentence.split('*').forEach((chunk, i) => {
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
}

const MISSION_WORDS = toWords(MISSION);
const VISION_WORDS = toWords(VISION);

function Word({ runs, range, progress }: { runs: Run[]; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [14, 0]);
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

function Statement({ words, from, to, progress }: { words: Run[][]; from: number; to: number; progress: MotionValue<number> }) {
  const span = to - from;
  return (
    <>
      {words.map((w, i) => {
        const start = from + (i / words.length) * span * 0.86;
        return <Word key={i} runs={w} progress={progress} range={[start, start + span * 0.14]} />;
      })}
    </>
  );
}

export function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // The two statements trade places around the midpoint of the scene
  const missionOpacity = useTransform(p, [0.44, 0.52], [1, 0]);
  const missionY = useTransform(p, [0.44, 0.52], [0, -48]);
  const visionOpacity = useTransform(p, [0.5, 0.58], [0, 1]);
  const visionY = useTransform(p, [0.5, 0.58], [48, 0]);
  const labelMission = useTransform(p, [0.46, 0.54], [1, 0.2]);
  const labelVision = useTransform(p, [0.46, 0.54], [0.2, 1]);
  const bar = useTransform(p, [0.02, 0.98], [0, 1]);

  return (
    <section id="mission" aria-labelledby="mission-heading" className="relative bg-navy text-white">
      <div ref={ref} className="h-[420svh]">
        <div className="sticky top-[var(--stack-h)] flex h-[calc(100svh-var(--stack-h))] items-center">
          <div className="gutter wrap grid w-full gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-16">
            <div>
              <h2 id="mission-heading" className="display text-[clamp(3.4rem,7vw,6.6rem)] leading-[0.9] text-green">
                <motion.span style={{ opacity: labelMission }} className="block">
                  Mission
                  <Slash className="ml-[0.18em]" />
                </motion.span>
                <span className="sr-only"> and </span>
                <motion.span style={{ opacity: labelVision }} className="block">
                  Vision
                  <Slash className="ml-[0.18em]" />
                </motion.span>
              </h2>
              <span aria-hidden="true" className="mt-6 block h-1.5 w-40 origin-left bg-white/15 lg:w-56">
                <motion.span style={{ scaleX: bar }} className="block h-full origin-left bg-green" />
              </span>
            </div>

            {/* Both statements share one grid cell, so the stage is as tall as the longer of the two */}
            <div className="grid text-[clamp(1.9rem,3.5vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.005em]">
              <motion.p style={{ opacity: missionOpacity, y: missionY }} className="col-start-1 row-start-1 self-center">
                <span className="sr-only">{MISSION.replaceAll('*', '')}</span>
                <span aria-hidden="true">
                  <Statement words={MISSION_WORDS} from={0.03} to={0.42} progress={p} />
                </span>
              </motion.p>
              <motion.p style={{ opacity: visionOpacity, y: visionY }} className="col-start-1 row-start-1 self-center">
                <span className="sr-only">{VISION.replaceAll('*', '')}</span>
                <span aria-hidden="true">
                  <Statement words={VISION_WORDS} from={0.56} to={0.95} progress={p} />
                </span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
