'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

const STATS = [
  { value: 400, suffix: '', label: 'Scholar residential capacity' },
  { value: 98, suffix: '%', label: 'University & pro placement' },
  { value: 18, suffix: '+', label: 'Weekly hours on pitch & in tactical lab' },
  { value: 8, prefix: '1:', suffix: '', label: 'Coach-to-athlete ratio' },
] as const;

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section aria-label="The academy in numbers" className="bg-teal text-white">
      <dl className="gutter wrap grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4 lg:py-20">
        {STATS.map((s, i) => (
          <div key={s.label} className={`reveal reveal-${Math.min(i + 1, 4)} border-l-[3px] border-green pl-5`}>
            <dd className="display text-[clamp(3rem,7vw,6rem)]">
              <Counter value={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={s.suffix} />
            </dd>
            <dt className="mt-3 max-w-[16ch] text-xs font-bold uppercase leading-snug tracking-[0.14em] text-white/70">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
