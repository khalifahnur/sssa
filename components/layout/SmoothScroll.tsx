'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let lenis: Lenis | null = null;

/**
 * Lenis inertia scrolling, driven by GSAP's ticker so ScrollTrigger scenes stay frame-perfect.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    lenis = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New route: jump to the top, then let ScrollTrigger re-measure once the page has laid out.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
