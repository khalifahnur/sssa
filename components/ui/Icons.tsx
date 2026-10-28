/** Small line icons in the style of the reference design (thin, 1.5px strokes). */

/**
 * Round carousel button whose arrow shaft runs out past the circle toward the other button.
 * `dir="prev"` points left with the shaft trailing right; `dir="next"` points right with the shaft trailing left.
 */
export function ArrowCircle({ dir, className = '' }: { dir: 'prev' | 'next'; className?: string }) {
  const prev = dir === 'prev';
  return (
    <svg viewBox="0 0 62 42" width="62" height="42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx={prev ? 21 : 41} cy="21" r="19.5" className="fill-transparent transition-colors duration-300 group-enabled:group-hover:fill-green group-enabled:group-hover:stroke-green" />
      {prev ? <path d="M15 21h44M22 14l-7 7 7 7" /> : <path d="M3 21h44M40 14l7 7-7 7" />}
    </svg>
  );
}

/** Football pitch, drawn as a line icon. */
export function PitchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" width="48" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="44" height="28" rx="1.5" />
      <path d="M24 2v28" />
      <circle cx="24" cy="16" r="4.5" />
      <path d="M2 10h6v12H2M46 10h-6v12h6" />
    </svg>
  );
}

/** Play triangle for video buttons. */
export function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}
