'use client';

import { useState } from 'react';
import { CldImage } from '@/components/media/CldImage';
import { CldVideo } from '@/components/media/CldVideo';
import { MEDIA } from '@/data/media';
import { Dialog } from '@/components/ui/Dialog';
import { TRENDING_HIGHLIGHTS, type HighlightClip } from '@/data/academyData';

export function HighlightGallery() {
  const [active, setActive] = useState<HighlightClip | null>(null);
  const featured = TRENDING_HIGHLIGHTS.find((h) => h.featured) ?? TRENDING_HIGHLIGHTS[0];
  const rest = TRENDING_HIGHLIGHTS.filter((h) => h.id !== featured.id);

  const card = (clip: HighlightClip, big = false) => (
    <button key={clip.id} type="button" onClick={() => setActive(clip)} className={`group relative block w-full overflow-hidden rounded-[4px] bg-navy text-left text-white ${big ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[4/3]'}`}>
      <CldImage media={clip.image} sizes={big ? '(min-width:1024px) 55vw, 100vw' : '(min-width:1024px) 25vw, 50vw'} className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-green">
          {clip.category}
          <span className="rounded-[2px] bg-white/15 px-2 py-0.5 text-white">{clip.duration}</span>
        </p>
        <h3 className={`display mt-2 leading-[1] ${big ? 'text-[clamp(1.4rem,2.8vw,2.4rem)]' : 'text-lg sm:text-xl'}`}>{clip.title}</h3>
      </div>
    </button>
  );

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {card(featured, true)}
        <div className="grid grid-cols-2 gap-4">{rest.map((c) => card(c))}</div>
      </div>

      <Dialog open={active !== null} onClose={() => setActive(null)} label={active?.title ?? 'Match highlight'}>
        {active && (
          <article>
            <div className="relative aspect-[16/9] bg-navy">
              {MEDIA[active.image].kind === 'video' ? (
                <CldVideo media={active.image} controls className="h-full w-full" />
              ) : (
                <CldImage media={active.image} sizes="64rem" className="h-full w-full" />
              )}
            </div>
            <div className="p-6 sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-label text-green">
                {active.category} · {active.date}
              </p>
              <h3 className="display mt-3 text-2xl sm:text-4xl">{active.title}</h3>
              <p className="mt-2 text-sm opacity-60">{active.location}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">{active.tacticalNotes}</p>
              <dl className="mt-8 grid gap-6 border-t-[3px] border-navy pt-6 sm:grid-cols-3">
                {active.keyStats.map((s) => (
                  <div key={s.label}>
                    <dd className="display text-3xl text-teal">{s.value}</dd>
                    <dt className="mt-1 text-xs font-bold uppercase tracking-[0.12em] opacity-60">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        )}
      </Dialog>
    </>
  );
}
