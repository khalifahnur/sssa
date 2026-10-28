'use client';

import { useMemo } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';

interface Run {
  text: string;
  accent: boolean;
}

/** Whitespace-delimited words; `*asterisks*` mark accent phrases, and a word may mix runs (e.g. "academics" + ","). */
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

function Word({ runs, range, progress, accentClass }: { runs: Run[]; range: [number, number]; progress: MotionValue<number>; accentClass: string }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <>
      <motion.span style={{ opacity, y }} className="inline-block">
        {runs.map((r, i) => (
          <span key={i} className={r.accent ? accentClass : undefined}>
            {r.text}
          </span>
        ))}
      </motion.span>{' '}
    </>
  );
}

/**
 * A sentence whose words "light up" one after another as `progress` (a Framer Motion scroll value, 0 to 1)
 * moves from `from` to `to`. Screen readers get the sentence once, unanimated.
 */
export function ScrollWords({
  text,
  progress,
  from,
  to,
  accentClass = 'text-green',
}: {
  text: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  accentClass?: string;
}) {
  const words = useMemo(() => toWords(text), [text]);
  const span = to - from;
  return (
    <>
      <span className="sr-only">{text.replaceAll('*', '')}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = from + (i / words.length) * span * 0.82;
          return <Word key={i} runs={w} progress={progress} range={[start, start + span * 0.18]} accentClass={accentClass} />;
        })}
      </span>
    </>
  );
}
