'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CircleHelp, Menu, Search, X } from 'lucide-react';
import { Crest } from '@/components/brand/Crest';
import { ButtonLink } from '@/components/ui/Button';
import { lockScroll } from '@/lib/scroll';
import { ACADEMY_PROGRAMS, BLOG_UPDATES, BRAND_CONTACT, UPCOMING_FIXTURES } from '@/data/academyData';

type Panel = 'menu' | 'search';

const QUICK_LINKS = [
  { href: '/fixtures', label: 'Tickets', show: '' },
  { href: '/programs', label: 'Programmes', show: '' },
  { href: '/academy#campus', label: 'Facilities', show: '' },
  { href: '/fixtures#highlights', label: 'Video', show: 'hidden xl:block' },
];

const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/academy', label: 'The academy' },
  { href: '/programs', label: 'Programmes' },
  { href: '/fixtures', label: 'Fixtures & tickets' },
  { href: '/news', label: 'News' },
  { href: '/admissions', label: 'Admissions' },
];

interface SearchEntry {
  title: string;
  href: string;
  kind: string;
  text: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  ...PAGES.slice(1).map((p) => ({ title: p.label, href: p.href, kind: 'Page', text: '' })),
  { title: 'Campus & facilities', href: '/academy#campus', kind: 'Page', text: 'residential boarding library labs study lounges' },
  { title: 'Book a trial evaluation', href: '/admissions#trial', kind: 'Page', text: 'apply admissions register enquire' },
  ...ACADEMY_PROGRAMS.map((p) => ({ title: p.title, href: `/programs/${p.slug}`, kind: 'Programme', text: `${p.ageRange} ${p.categoryLabel} ${p.summary}` })),
  ...UPCOMING_FIXTURES.map((f) => ({ title: f.matchTitle, href: `/fixtures#${f.id}`, kind: 'Fixture', text: `${f.competition} ${f.dateFormatted} ${f.location}` })),
  ...BLOG_UPDATES.map((a) => ({ title: a.title, href: `/news/${a.slug}`, kind: 'News', text: `${a.category} ${a.excerpt}` })),
];

function search(query: string): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return SEARCH_INDEX.filter((e) => e.kind === 'Programme');
  return SEARCH_INDEX.filter((e) => {
    const hay = `${e.title} ${e.text} ${e.kind}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  }).slice(0, 9);
}

/**
 * Main header: fixed navy bar with menu button, quick links, centred crest and utilities.
 * The menu and search open as full-width panels directly beneath it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  // A panel counts as open only on the page it was opened from, so navigating closes it without an effect.
  const [open, setOpen] = useState<{ panel: Panel; path: string } | null>(null);
  const panel = open && open.path === pathname ? open.panel : null;
  const [query, setQuery] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => search(query), [query]);
  const toggle = (next: Panel) => setOpen(panel === next ? null : { panel: next, path: pathname });

  useEffect(() => {
    lockScroll(panel !== null);
    return () => lockScroll(false);
  }, [panel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && panel) {
        (panel === 'menu' ? menuButton : searchButton).current?.focus();
        setOpen(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((cur) => (cur?.panel === 'search' && cur.path === pathname ? null : { panel: 'search', path: pathname }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panel, pathname]);

  const isActive = (href: string) => {
    const path = href.split('#')[0];
    return path !== '/' && (pathname === path || pathname.startsWith(`${path}/`)) && !href.includes('#');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-white/15 bg-navy text-white shadow-[0_4px_20px_rgba(18,30,52,0.35)]">
        <span className="scroll-progress absolute inset-x-0 -bottom-px h-[3px] origin-left bg-green" aria-hidden="true" />
        <div className="relative flex h-full items-center justify-between pr-3 sm:pr-8">
          {/* Left: menu button and quick links */}
          <div className="flex h-full items-center">
            <button
              ref={menuButton}
              type="button"
              onClick={() => toggle('menu')}
              aria-label={panel === 'menu' ? 'Close menu' : 'Open menu'}
              aria-expanded={panel === 'menu'}
              aria-controls="site-menu"
              className="flex h-full w-14 shrink-0 items-center justify-center border-r border-white/20 bg-teal/60 transition-colors hover:bg-teal sm:w-16"
            >
              {panel === 'menu' ? <X className="h-5 w-5" strokeWidth={1.9} /> : <Menu className="h-5 w-5" strokeWidth={1.9} />}
            </button>
            <nav aria-label="Quick links" className="hidden items-center gap-7 pl-7 lg:flex">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`relative whitespace-nowrap py-5 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-green aria-[current=page]:text-white ${l.show}`}
                >
                  {l.label}
                  {isActive(l.href) && <motion.span layoutId="quick-underline" className="absolute inset-x-0 bottom-0 h-[3px] bg-green" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre: crest */}
          <Link href="/" aria-label="St. Sebastian Sports Academy — home" className="group absolute left-1/2 flex -translate-x-1/2 items-center">
            <Crest variant="green" height={46} className="transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Right: search, help and call to action */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              ref={searchButton}
              type="button"
              onClick={() => toggle('search')}
              aria-label="Search the academy site"
              aria-expanded={panel === 'search'}
              aria-controls="site-search"
              className="flex h-11 w-11 items-center justify-center text-white/90 transition-colors hover:text-green"
            >
              <Search className="h-5 w-5" strokeWidth={1.9} />
            </button>
            <Link href="/admissions#faq" aria-label="Help and frequently asked questions" className="flex h-11 w-11 items-center justify-center text-white/90 transition-colors hover:text-green">
              <CircleHelp className="h-5 w-5" strokeWidth={1.9} />
            </Link>
            <ButtonLink href="/admissions#trial" size="sm" className="ml-1 max-sm:hidden">
              Book a trial
            </ButtonLink>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {panel === 'search' && (
          <motion.div
            key="search"
            id="site-search"
            role="search"
            data-lenis-prevent
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-y-auto bg-navy-deep/95 text-white backdrop-blur-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) router.push(results[0].href);
              }}
              className="gutter wrap py-8 sm:py-14"
            >
              <div className="flex items-center gap-4 border-b-[3px] border-white/25 pb-4 focus-within:border-green">
                <Search className="h-6 w-6 shrink-0 text-green" />
                <input
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search programmes, fixtures, news…"
                  aria-label="Search"
                  className="w-full bg-transparent text-xl font-extrabold uppercase tracking-wide text-white outline-none placeholder:text-white/35 sm:text-4xl"
                />
                <button type="button" onClick={() => setOpen(null)} aria-label="Close search" className="p-2 text-white/60 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-label text-green">{query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular'}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((r) => (
                  <li key={r.href + r.title}>
                    <Link href={r.href} className="group block h-full border border-white/15 bg-teal/25 p-5 transition-colors hover:border-green">
                      <span className="text-[0.65rem] font-extrabold uppercase tracking-label text-green">{r.kind}</span>
                      <span className="mt-1 block text-lg font-extrabold uppercase leading-tight transition-colors group-hover:text-green">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length === 0 && <p className="mt-6 text-lg text-white/70">Nothing matches “{query}”. Try “scholar”, “tickets” or “campus”.</p>}
            </form>
          </motion.div>
        )}

        {panel === 'menu' && (
          <motion.div
            key="menu"
            id="site-menu"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-y-auto bg-navy text-white"
          >
            <div className="gutter wrap grid gap-10 py-10 md:grid-cols-12 md:gap-12 lg:py-16">
              <div className="space-y-6 border-b border-white/15 pb-10 md:col-span-7 md:border-b-0 md:border-r md:pb-0 md:pr-10">
                <p className="text-xs font-extrabold uppercase tracking-label text-green">St. Sebastian Sports Academy · Pages</p>
                <ul>
                  {PAGES.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 text-[clamp(1.5rem,4.2vw,3.1rem)] font-extrabold uppercase leading-none tracking-wide transition-colors hover:text-green"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="text-sm tracking-label text-green">0{i + 1}</span>
                          {item.label}
                        </span>
                        <ArrowRight className="h-6 w-6 shrink-0 text-green transition-transform duration-300 group-hover:translate-x-2" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="grid content-start gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
                <div>
                  <h2 className="text-lg font-extrabold uppercase tracking-wide text-green">Residential &amp; campus</h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                    <li>400 student boarding capacity</li>
                    <li>11+ starting age · 24/7 pastoral care</li>
                    <li>Cambridge international curriculum</li>
                    <li>FIFA Connect player pathway</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-extrabold uppercase tracking-wide text-green">Headquarters</h2>
                  <address className="mt-4 text-sm not-italic leading-relaxed text-white/80">
                    {BRAND_CONTACT.address}
                    <br />
                    {BRAND_CONTACT.phone} · {BRAND_CONTACT.email}
                  </address>
                  <ButtonLink href="/admissions#trial" className="mt-6">
                    Register for a trial
                  </ButtonLink>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
