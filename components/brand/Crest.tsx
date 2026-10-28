import { CREST } from './crestData';

/**
 * Official crest artwork, extracted from the brand guideline PDF (see scripts/extract-brand-art.py).
 * Rendered once as a <symbol> in the root layout and referenced with <use>, so it costs one copy of the
 * path data per page however many times it appears.
 *
 * Brand rules honoured here (Guidelines p.9–14): never altered, always upright, always with the
 * tagline, only the four sanctioned colourways, never placed over busy imagery.
 */
export type CrestVariant = 'primary' | 'green' | 'navy' | 'reversed';

/** Which background each colourway is meant for. */
const VARIANTS: Record<CrestVariant, Record<string, string>> = {
  /** Full colour, on white or light backgrounds */
  primary: { '--c-face': '#ffffff', '--c-shell': '#1f4b50', '--c-ink': '#121e34', '--c-book': '#88b03f', '--c-label': '#ffffff' },
  /** Green logo, for navy / teal backgrounds */
  green: { '--c-face': 'none', '--c-shell': '#88b03f', '--c-ink': '#88b03f', '--c-book': '#88b03f', '--c-label': '#121e34' },
  /** Navy logo, for green backgrounds */
  navy: { '--c-face': 'none', '--c-shell': '#121e34', '--c-ink': '#121e34', '--c-book': '#121e34', '--c-label': '#88b03f' },
  /** Reversed, for dark backgrounds */
  reversed: { '--c-face': 'none', '--c-shell': '#ffffff', '--c-ink': '#ffffff', '--c-book': '#ffffff', '--c-label': '#121e34' },
};

const [, , VB_W, VB_H] = CREST.viewBox.split(' ').map(Number);

export function CrestSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <symbol id="sssa-crest" viewBox={CREST.viewBox}>
          <path d={CREST.face} fill="var(--c-face)" />
          <g fill="var(--c-shell)">
            {CREST.shell.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="var(--c-ink)">
            {CREST.ink.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="var(--c-book)">
            {CREST.book.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="var(--c-label)">
            {CREST.label.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

export function Crest({
  variant = 'primary',
  height = 56,
  className = '',
  title = 'St. Sebastian Sports Academy crest — Champions for Life',
}: {
  variant?: CrestVariant;
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      height={height}
      width={(height * VB_W) / VB_H}
      className={`shrink-0 select-none ${className}`}
      style={VARIANTS[variant] as React.CSSProperties}
    >
      <use href="#sssa-crest" />
    </svg>
  );
}
