import { PEAK } from './peakData';

/** The large mountain from the brand guideline cover. Decorative; recolour with `className` text colour. */
export function Peak({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={PEAK.viewBox}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      {PEAK.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
