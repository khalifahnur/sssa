'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CircleHelp, CornerDownLeft, Menu, Search, User, X } from 'lucide-react';
import { Crest } from '@/components/brand/Crest';
import { Peak } from '@/components/brand/Peak';
import { ButtonLink } from '@/components/ui/Button';
import { lockScroll, scrollToId } from '@/lib/scroll';
import { ACADEMY_PROGRAMS, BLOG_UPDATES } from '@/data/academyData';
import Image from 'next/image';

type Panel = 'menu' | 'search';

const MENU_PAGES = [
  { href: '/', label: 'Home' },
  { href: '/academy', label: 'The academy' },
  { href: '/programs', label: 'Programs' },
  { href: '/admissions', label: 'Admissions' },
];

interface SearchEntry {
  title: string;
  href: string;
  kind: string;
  text: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  { title: 'The academy', href: '/academy', kind: 'Page', text: 'about campus pillars legacy' },
  { title: 'Programs', href: '/programs', kind: 'Page', text: 'youth teen scholar pathway one to one' },
  { title: 'Fixtures & tickets', href: '/fixtures', kind: 'Page', text: 'matchday highlights video' },
  { title: 'News', href: '/news', kind: 'Page', text: 'stories match reports signings' },
  { title: 'Admissions', href: '/admissions', kind: 'Page', text: 'apply contact faq' },
  { title: 'Book a trial evaluation', href: '/admissions#trial', kind: 'Page', text: 'apply admissions register enquire' },
  ...ACADEMY_PROGRAMS.map((p) => ({ title: p.title, href: `/programs/${p.slug}`, kind: 'Program', text: `${p.ageRange} ${p.categoryLabel} ${p.summary}` })),
  ...BLOG_UPDATES.map((a) => ({ title: a.title, href: `/news/${a.slug}`, kind: 'News', text: `${a.category} ${a.excerpt}` })),
];

const SUGGESTIONS = ['Programs', 'Scholar', 'Academy', 'Admissions', 'Trial'];

function search(query: string): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return SEARCH_INDEX.filter((e) => e.kind === 'Program');
  return SEARCH_INDEX.filter((e) => {
    const hay = `${e.title} ${e.text} ${e.kind}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  }).slice(0, 9);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<{ panel: Panel; path: string } | null>(null);
  const panel = open && open.path === pathname ? open.panel : null;
  const isHome = pathname === '/';
  const [query, setQuery] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => search(query), [query]);
  const toggle = (next: Panel) => setOpen(panel === next ? null : { panel: next, path: pathname });
  const stayOnPage = (href: string) => {
    const [path, hash] = href.split('#');
    if ((path || pathname) !== pathname) return false;
    setOpen(null);
    if (hash) {
      lockScroll(false);
      scrollToId(hash);
    }
    return true;
  };
  const follow = (href: string) => (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (stayOnPage(href) && href.includes('#')) e.preventDefault();
  };

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

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        data-open={panel ? '' : undefined}
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] text-white ${isHome ? 'home-header' : 'bg-navy shadow-[0_6px_24px_rgba(5,10,20,0.3)]'}`}
      >
        {/* <span className="scroll-progress absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left bg-green" aria-hidden="true" /> */}
        <div className="relative flex h-full items-stretch justify-between">
          <div className="flex items-stretch">
            <button
              ref={menuButton}
              type="button"
              onClick={() => toggle('menu')}
              aria-label={panel === 'menu' ? 'Close menu' : 'Open menu'}
              aria-expanded={panel === 'menu'}
              aria-controls="site-menu"
              className={`flex w-[4.25rem] shrink-0 items-center justify-center border-r transition-colors duration-300 sm:w-[5.5rem] ${
                panel === 'menu' ? 'border-navy/15 bg-white text-navy' : 'border-white/25 hover:bg-white/10'
              }`}
            >
              {panel === 'menu' ? <X className="h-7 w-7" strokeWidth={1.6} /> : <Menu className="h-8 w-8" strokeWidth={1.5} />}
            </button>
          </div>

          <Link
            href="/"
            onClick={follow('/')}
            aria-label="St. Sebastian Sports Academy — home"
            className="group absolute left-1/2 top-0 flex h-full w-[5.75rem] -translate-x-1/2 items-center justify-center bg-navy sm:w-[7.5rem]"
          >
            {/* <Crest variant="green" height={58} className="transition-transform duration-300 group-hover:scale-105" /> */}
            <Image src={'/sssa.png'} alt='sssa logo' width={60} height={60}/>
          </Link>

          <div className="flex items-stretch gap-1 bg-navy pl-2 pr-3 sm:gap-3 sm:pl-5 sm:pr-8">
            <button
              ref={searchButton}
              type="button"
              onClick={() => toggle('search')}
              aria-label="Search the academy site"
              aria-expanded={panel === 'search'}
              aria-controls="site-search"
              className={`flex w-10 items-center justify-center transition-colors duration-300 sm:w-14 ${panel === 'search' ? 'bg-white text-navy' : 'hover:text-green'}`}
            >
              <Search className="h-6 w-6" strokeWidth={1.7} />
            </button>
            <Link
              href="/admissions#faq"
              onClick={follow('/admissions#faq')}
              aria-label="Help and frequently asked questions"
              className="flex w-10 items-center justify-center transition-colors hover:text-green sm:w-11"
            >
              <CircleHelp className="h-6 w-6" strokeWidth={1.6} />
            </Link>
            <Link
              href="/admissions#trial"
              onClick={follow('/admissions#trial')}
              aria-label="Admissions and trial requests"
              className="flex w-10 items-center justify-center transition-colors hover:text-green sm:w-11"
            >
              <User className="h-6 w-6" strokeWidth={1.6} />
            </Link>
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
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-hidden bg-white text-navy"
          >
            <motion.div
              aria-hidden="true"
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
              className="pointer-events-none absolute bottom-0 right-0 z-0 h-[30%] sm:h-[46%] lg:h-[70%]"
            >
              <Peak className="h-full w-auto text-navy" />
            </motion.div>

            <div className="relative z-10 h-full overflow-y-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const hit = results[0];
                  if (hit && !stayOnPage(hit.href)) router.push(hit.href);
                }}
                className="gutter wrap py-8 sm:py-12 lg:pr-[min(22rem,26vw)]"
              >
                <div className="flex items-center gap-3 border-b-[3px] border-navy/20 pb-3 transition-colors focus-within:border-green sm:gap-5 sm:pb-4">
                  <Search className="h-7 w-7 shrink-0 text-green sm:h-9 sm:w-9" strokeWidth={1.8} />
                  <input
                    type="search"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the academy"
                    aria-label="Search"
                    autoComplete="off"
                    className="w-full min-w-0 bg-transparent font-display text-[2.2rem] font-bold uppercase leading-none tracking-wide text-navy outline-none placeholder:text-navy/30 sm:text-[4rem]"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    aria-label="Close search"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/25 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  >
                    <X className="h-5 w-5" strokeWidth={1.8} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-label text-teal">Try</span>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-navy/25 px-3.5 py-1.5 font-display text-lg font-semibold uppercase leading-none tracking-wide transition-colors hover:border-navy hover:bg-navy hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                  <span
                    aria-hidden="true"
                    className="ml-auto hidden items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-navy/45 lg:flex"
                  >
                    <CornerDownLeft className="h-3.5 w-3.5" /> open · Esc close
                  </span>
                </div>

                <p aria-live="polite" className="mt-9 text-xs font-extrabold uppercase tracking-label text-teal">
                  {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular'}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {results.map((r, i) => (
                    <motion.li
                      key={r.href + r.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.035, duration: 0.45, ease: EASE }}
                    >
                      <Link
                        href={r.href}
                        onClick={follow(r.href)}
                        className="group relative flex h-full flex-col justify-between gap-3 border border-navy/15 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_14px_30px_-18px_rgba(18,30,52,0.5)]"
                      >
                        <span className="text-[0.65rem] font-extrabold uppercase tracking-label text-teal">{r.kind}</span>
                        <span className="flex items-end justify-between gap-4">
                          <span className="font-display text-[1.7rem] font-bold uppercase leading-[0.98] transition-colors group-hover:text-teal">
                            {r.title}
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-green transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                {results.length === 0 && (
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">Nothing matches “{query}”. Try “scholar”, “trial” or “academy”.</p>
                )}
              </form>
            </div>
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
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-hidden bg-white text-navy"
          >
            <motion.div
              aria-hidden="true"
              initial={{ x: 140, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: EASE }}
              className="pointer-events-none absolute bottom-0 right-0 z-0 h-[32%] sm:h-[62%] lg:h-full"
            >
              <Peak className="h-full w-auto text-navy" />
            </motion.div>

            <div className="relative z-10 h-full overflow-y-auto">
              <nav aria-label="Menu" className="gutter wrap flex min-h-full flex-col justify-start py-10 sm:py-14 lg:justify-center">
                <div className="w-full sm:max-w-[58%] lg:max-w-[52%]">
                  <p className="text-xs font-extrabold uppercase tracking-label text-teal">Menu</p>
                  <ul className="menu-list mt-4">
                    {MENU_PAGES.map((item, i) => {
                      const current = isCurrent(item.href);
                      return (
                        <motion.li
                          key={item.href}
                          className="menu-row"
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.14 + i * 0.07, duration: 0.6, ease: EASE }}
                        >
                          <Link
                            href={item.href}
                            onClick={follow(item.href)}
                            aria-current={current ? 'page' : undefined}
                            className="group relative flex items-center justify-between gap-6 border-b border-navy/15 py-3 font-display text-[clamp(3.4rem,min(9vw,12svh),7.5rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] text-navy transition-colors duration-300 hover:text-teal sm:py-4"
                          >
                            <span className="flex items-center gap-4 transition-transform duration-500 ease-[var(--ease-out-expo)] md:group-hover:translate-x-3">
                              {item.label}
                            </span>
                            <ArrowRight
                              className="h-8 w-8 shrink-0 text-green transition-all duration-300 sm:h-11 sm:w-11 md:-translate-x-3 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100"
                              strokeWidth={1.8}
                            />
                            <span
                              aria-hidden="true"
                              className={`absolute -bottom-px left-0 h-[3px] w-full origin-left bg-green transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${current ? 'scale-x-100' : 'scale-x-0'}`}
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + MENU_PAGES.length * 0.07, duration: 0.6, ease: EASE }}
                    className="mt-9"
                  >
                    <ButtonLink href="/admissions#trial" variant="navy" onClick={follow('/admissions#trial')}>
                      Register for a trial
                    </ButtonLink>
                  </motion.div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
