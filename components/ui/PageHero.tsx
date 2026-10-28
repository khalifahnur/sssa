import Link from 'next/link';
import { Range } from '@/components/brand/Range';
import { CldImage } from '@/components/media/CldImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { MediaKey } from '@/data/media';

interface PageHeroProps {
  section: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  media?: MediaKey;
  crumbs?: { name: string; href?: string }[];
  /** Colour of the next section, so the mountain edge blends into it */
  next?: 'white' | 'mist';
  children?: React.ReactNode;
}

/** Navy opening for every inner page: running header, huge title, optional framed photograph and a ridge into the next section. */
export function PageHero({ section, title, intro, media, crumbs, next = 'white', children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div className="gutter wrap pb-28 pt-[calc(var(--header-h)+2.5rem)] lg:pb-40">
        <SectionHeader title={section} section={section} />
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-green">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {c.name}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={`mt-12 grid gap-10 lg:mt-20 ${media ? 'lg:grid-cols-[1.25fr_0.75fr] lg:items-end' : ''}`}>
          <div>
            <h1 className="display text-mega reveal-fade">{title}</h1>
            {intro && <div className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-white/75 lg:text-xl">{intro}</div>}
            {children && <div className="reveal reveal-2 mt-10 flex flex-wrap gap-3">{children}</div>}
          </div>
          {media && (
            <div className="wipe-in relative aspect-[4/3] overflow-hidden rounded-[4px] lg:aspect-[4/5]">
              <div className="drift absolute -inset-y-[8%] inset-x-0">
                <CldImage media={media} priority sizes="(min-width:1024px) 34vw, 100vw" className="h-full w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
      <Range
        fill={next === 'mist' ? '#f3f6ef' : '#ffffff'}
        facet="#121e34"
        facetOpacity={0.1}
        profile={1}
        className="absolute inset-x-0 bottom-0 -z-10 h-[8vw] min-h-12"
      />
    </section>
  );
}
