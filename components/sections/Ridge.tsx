import { Range } from '@/components/brand/Range';

/**
 * A mountain ridge that straddles two sections: it is drawn in the colour of the section below
 * and overlaps the bottom of the section above, so the join reads as a skyline instead of a hard edge.
 */
export function Ridge({ color, facet = '#ffffff', opacity = 0.14, profile = 0 }: { color: string; facet?: string; opacity?: number; profile?: 0 | 1 | 2 }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 -mb-px -mt-[7vw] h-[7vw] min-h-10">
      <Range fill={color} facet={facet} facetOpacity={opacity} profile={profile} className="h-full" />
    </div>
  );
}
