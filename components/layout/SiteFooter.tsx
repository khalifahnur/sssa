import Link from 'next/link';
import { Crest } from '@/components/brand/Crest';
import { Range } from '@/components/brand/Range';
import { Tail } from '@/components/brand/Marks';
import { NAV_LINKS } from '@/lib/site';
import { ACADEMY_PROGRAMS, BRAND_CONTACT } from '@/data/academyData';

export function SiteFooter() {
  return (
    <footer className="relative bg-navy-deep text-white">
      <Range fill="#0b1424" facet="#88b03f" facetOpacity={0.18} profile={2} className="-mt-[8vw] h-[10vw] min-h-14 -translate-y-px" />
      <div className="gutter wrap pb-10 pt-6">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Crest variant="green" height={132} />
            <p className="display mt-6 text-5xl text-white">
              Champions for life
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Empowering young athletes to turn aspiration into achievement through football, academics and character.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-extrabold uppercase tracking-label text-green">Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-green">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2 className="text-xs font-extrabold uppercase tracking-label text-green">Programs</h2>
            <ul className="mt-5 space-y-3">
              {ACADEMY_PROGRAMS.map((p) => (
                <li key={p.id}>
                  <Link href={`/programs/${p.slug}`} className="text-sm text-white/75 transition-colors hover:text-green">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="text-xs font-extrabold uppercase tracking-label text-green">Visit &amp; contact</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{BRAND_CONTACT.address}</p>
            <p className="mt-4 space-y-1 text-sm text-white/75">
              <a href={`tel:${BRAND_CONTACT.phone.replace(/[^+\d]/g, '')}`} className="block hover:text-green">
                {BRAND_CONTACT.phone}
              </a>
              <a href={`mailto:${BRAND_CONTACT.email}`} className="block hover:text-green">
                {BRAND_CONTACT.email}
              </a>
            </p>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© 2026 {BRAND_CONTACT.name}. All rights reserved.</p>
          <p className="uppercase tracking-label">Resilience · Discipline · Excellence</p>
        </div>
      </div>
    </footer>
  );
}
