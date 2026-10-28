import type Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Registered by <SmoothScroll>; everything else goes through the helpers below. */
export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Height of the fixed header plus the pinned sub-navigation, read from the CSS custom property. */
export function stackHeight() {
  const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stack-h'));
  return Number.isFinite(value) ? value : 120;
}

/** Freeze page scrolling while a full-screen panel is open (works with and without Lenis). */
export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
  } else {
    lenis?.start();
    document.documentElement.style.overflow = '';
  }
}

/**
 * Smooth-scroll to a section id, landing it flush beneath the two fixed bars (stack height, the same
 * clearance as the page's `scroll-padding-top`). The target is worked out from the real scroll position rather
 * than Lenis's internal one, which can lag behind if the page was moved natively a moment earlier.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - (stackHeight() - 1));
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.3 });
  } else {
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  history.replaceState(null, '', `#${id}`);
}
