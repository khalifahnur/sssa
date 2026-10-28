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
 * Smooth-scroll to a section id, landing it just below the two fixed bars. The clearance comes from the
 * page's `scroll-padding-top` (stack height + 1rem): Lenis reads it itself, so the fallback mirrors it.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.3 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - (stackHeight() + 16);
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  history.replaceState(null, '', `#${id}`);
}
