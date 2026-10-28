'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Crest } from '@/components/brand/Crest';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/site';
import { BRAND_CONTACT } from '@/data/academyData';

export function SiteHeader() {
  const pathname = usePathname();
  // Menu is "open" only for the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 bg-navy text-white">
      <span className="scroll-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-green" aria-hidden="true" />
      <div className="gutter wrap flex h-full items-center justify-between">
        <Link href="/" aria-label="St. Sebastian Sports Academy — home" className="flex h-full items-center py-2.5">
          <Crest variant="green" height={64} className="h-[calc(var(--hdr)-20px)] w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative py-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white aria-[current=page]:text-white"
              >
                {link.label}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-green" />
                )}
              </Link>
            );
          })}
          <ButtonLink href="/admissions#trial" size="sm" variant="green">
            Book a trial
          </ButtonLink>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenOn(open ? null : pathname)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className={`absolute h-[2.5px] w-7 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
          <span className={`absolute h-[2.5px] w-7 bg-white transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-navy-deep px-6 pb-8 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpenOn(null)}
                    className="display flex items-baseline gap-4 border-b border-white/10 py-4 text-[2.6rem] text-white active:text-green"
                  >
                    <span className="text-sm font-bold tracking-label text-green">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-4 text-sm text-white/70">
              <ButtonLink href="/admissions#trial" className="w-full justify-center">
                Book a trial
              </ButtonLink>
              <p>
                {BRAND_CONTACT.phone}
                <br />
                {BRAND_CONTACT.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
