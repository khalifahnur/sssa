import { CREST } from './crestData';

export type CrestVariant = 'primary' | 'green' | 'navy' | 'reversed';

const VARIANTS: Record<CrestVariant, Record<string, string>> = {
  primary: { '--c-face': '#ffffff', '--c-shell': '#1f4b50', '--c-ink': '#121e34', '--c-book': '#88b03f', '--c-label': '#ffffff' },
  green: { '--c-face': 'none', '--c-shell': '#88b03f', '--c-ink': '#88b03f', '--c-book': '#88b03f', '--c-label': '#121e34' },
  navy: { '--c-face': 'none', '--c-shell': '#121e34', '--c-ink': '#121e34', '--c-book': '#121e34', '--c-label': '#88b03f' },
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
