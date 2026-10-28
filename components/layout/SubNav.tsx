'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { scrollToId, stackHeight } from '@/lib/scroll';

export interface SubNavTab {
  id: string;
  label: string;
}

/**
 * The second header. It sits in the page flow beneath the opening section, then pins directly under the
 * main header as you scroll (CSS `position: sticky`). Tabs jump to sections of the current page and
 * highlight the one you are reading.
 */
export function SubNav({ tabs, label, first = false }: { tabs: SubNavTab[]; label: string; first?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);
  // Unique per instance: Next keeps recently visited pages mounted (hidden), and their underlines must not animate into each other
  const underlineId = useId();

  // Scroll-spy: the active tab is the last section whose top has passed the pinned bars
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = stackHeight() + 48;
      let current: string | null = null;
      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el && el.getBoundingClientRect().top <= line) current = tab.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [tabs]);

  // Keep the active tab in view when the bar scrolls sideways on small screens
  useEffect(() => {
    const container = nav.current;
    const el = container?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!container || !el) return;
    container.scrollTo({ left: el.offsetLeft - (container.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <div className={`sticky top-[calc(var(--header-h)-1px)] z-40 h-[var(--subnav-h)] ${first ? 'mt-[var(--header-h)]' : ''} border-b border-navy/15 bg-white text-navy shadow-[0_10px_28px_rgba(18,30,52,0.08)]`}>
      <nav
        ref={nav}
        aria-label={label}
        className="no-scrollbar relative mx-auto flex h-full max-w-5xl items-stretch overflow-x-auto px-2 sm:justify-center sm:px-6"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(tab.id);
              }}
              className={`relative inline-flex shrink-0 items-center px-4 font-display text-[1.3rem] font-bold uppercase leading-none tracking-[0.02em] transition-colors sm:px-5 sm:text-[1.45rem] ${
                isActive ? 'text-navy' : 'text-navy/80 hover:text-teal'
              }`}
            >
              {tab.label}
              {isActive && <motion.span layoutId={underlineId} className="absolute inset-x-0 bottom-0 h-1 bg-alert" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
