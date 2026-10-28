/**
 * Faceted mountain range in the style of the brand's peak motif: a solid silhouette with
 * lit facets cut into each summit. Used as a section divider and for the hero parallax layers.
 */
interface RangeProps {
  className?: string;
  /** Silhouette fill */
  fill?: string;
  /** Facet fill (lit slope) */
  facet?: string;
  facetOpacity?: number;
  /** Which of the three hand-tuned profiles to draw */
  profile?: 0 | 1 | 2;
  /** Fill below the ridge down to the bottom edge */
  solid?: boolean;
}

// Peak [x, y] pairs across a 1440 x 480 box; valleys sit between them.
const PROFILES: [number, number][][] = [
  [[0, 330], [120, 250], [250, 120], [360, 230], [470, 190], [620, 60], [760, 220], [860, 170], [1010, 40], [1150, 210], [1260, 150], [1370, 260], [1440, 230]],
  [[0, 250], [90, 210], [210, 300], [340, 110], [470, 250], [560, 200], [700, 20], [830, 240], [960, 150], [1100, 290], [1230, 90], [1340, 220], [1440, 180]],
  [[0, 200], [140, 90], [260, 230], [400, 170], [540, 40], [680, 210], [790, 130], [930, 260], [1070, 70], [1200, 210], [1320, 120], [1440, 240]],
];

export function Range({ className = '', fill = '#121e34', facet = '#ffffff', facetOpacity = 0.14, profile = 0, solid = true }: RangeProps) {
  const pts = PROFILES[profile];
  const ridge = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const silhouette = `${ridge} L1440 480 L0 480 Z`;

  // A lit facet on the right-hand slope of every high summit
  const facets: string[] = [];
  pts.forEach(([x, y], i) => {
    const next = pts[i + 1];
    const prev = pts[i - 1];
    if (!next || !prev || y > 200 || y > next[1] || y > prev[1]) return;
    const dx = next[0] - x;
    const dy = next[1] - y;
    facets.push(
      `M${x} ${y} L${x + dx * 0.62} ${y + dy * 0.62} L${x + dx * 0.3} ${y + dy * 0.7} L${x + dx * 0.34} ${y + dy * 0.46} L${x + dx * 0.12} ${y + dy * 0.5} Z`
    );
  });

  return (
    <svg
      viewBox="0 0 1440 480"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none block w-full select-none ${className}`}
    >
      <path d={solid ? silhouette : `${ridge} L1440 480 L0 480 Z`} fill={fill} />
      <path d={facets.join(' ')} fill={facet} fillOpacity={facetOpacity} />
    </svg>
  );
}
