import Link from 'next/link';
import { CldImage } from '@/components/media/CldImage';
import type { MediaKey } from '@/data/media';

interface PageHeroProps {
  /** Small label above the title (usually the section name) */
  section: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Background photograph; defaults to the shared banner image */
  media?: MediaKey;
  crumbs?: { name: string; href?: string }[];
  /** Add top padding equal to the fixed header, for pages that have no sub-navigation above the banner */
  clearHeader?: boolean;
  children?: React.ReactNode;
}

/**
 * Photographic banner for inner pages, in the same language as the home page's "The Project":
 * a darkened, slowly drifting photograph with a centred condensed title.
 */
export function PageHero({ section, title, intro, media = 'project-banner', crumbs, clearHeader = false, children }: PageHeroProps) {
  return (
    <section className={`relative isolate flex flex-col items-center justify-center overflow-hidden bg-navy-deep text-center text-white ${clearHeader ? 'pt-[var(--header-h)]' : ''}`}>
      <div className="drift absolute -inset-y-[14%] inset-x-0 -z-10">
        <CldImage media={media} decorative priority sizes="100vw" className="h-full w-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/65" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/50" />

      <div className="gutter w-full py-20 sm:py-24 lg:py-28">
        <p className="reveal-fade text-xs font-extrabold uppercase tracking-label text-green sm:text-sm">{section}</p>
        <h1 className="display reveal-fade mx-auto mt-4 max-w-6xl text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.9]">{title}</h1>
        {intro && <div className="reveal mx-auto mt-7 max-w-2xl text-lg leading-[1.9] text-white/80">{intro}</div>}
        {children && <div className="reveal reveal-2 mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
            <ol className="flex flex-wrap justify-center gap-2">
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
      </div>
    </section>
  );
}
