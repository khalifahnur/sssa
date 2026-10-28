'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CldImage } from '@/components/media/CldImage';
import { filterPrograms } from '@/utils/academyLogic';
import { ACADEMY_PROGRAMS, type ProgramCategory } from '@/data/academyData';

const FILTERS: { id: ProgramCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'youth', label: 'Youth · 8–12' },
  { id: 'teen', label: 'Teen · 13–16' },
  { id: 'scholar', label: 'Scholar · 17–21' },
  { id: 'specialist', label: '1-to-1' },
];

export function ProgramBrowser() {
  const [category, setCategory] = useState<ProgramCategory>('all');
  const [query, setQuery] = useState('');
  const programs = filterPrograms(ACADEMY_PROGRAMS, category, query);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter programs by age group" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => {
            const active = f.id === category;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(f.id)}
                className={`shrink-0 rounded-[3px] border-2 px-4 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  active ? 'border-navy bg-navy text-white' : 'border-navy/20 text-navy hover:border-navy'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <label className="block lg:w-72">
          <span className="sr-only">Search programs</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs"
            className="w-full border-b-[3px] border-navy bg-transparent py-2.5 text-base font-semibold placeholder:font-normal placeholder:text-navy/45 focus:border-green focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {programs.length} program{programs.length === 1 ? '' : 's'} shown
      </p>

      <ul className="mt-12 border-t-[3px] border-navy">
        <AnimatePresence mode="popLayout">
          {programs.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-navy/15"
            >
              <Link href={`/programs/${p.slug}`} className="group grid gap-6 py-8 lg:grid-cols-[4rem_1fr_17rem_2rem] lg:items-center lg:gap-10 lg:py-10 xl:grid-cols-[4rem_1fr_20rem_2rem]">
                <span className="display hidden text-5xl text-green lg:block">0{ACADEMY_PROGRAMS.indexOf(p) + 1}</span>
                <div className="lg:order-2">
                  <p className="text-xs font-extrabold uppercase tracking-label text-green">
                    {p.categoryLabel} · {p.ageRange}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[0.95]">{p.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed opacity-75">{p.summary}</p>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] lg:order-3">
                  <CldImage media={p.image} sizes="(min-width:1280px) 20rem, (min-width:1024px) 17rem, 100vw" className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110" />
                </div>
                <span aria-hidden="true" className="hidden text-3xl transition-transform duration-300 group-hover:translate-x-2 lg:order-4 lg:block">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {programs.length === 0 && <p className="mt-12 text-lg opacity-70">No programs match your search. Try a different age group or keyword.</p>}
    </div>
  );
}
