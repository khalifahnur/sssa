import { Range } from '@/components/brand/Range';

/**
 * Shown while a Cloudinary asset is unavailable (no cloud name configured, or the asset 404s).
 * Built entirely from brand elements so a missing photo never leaves an empty hole in the layout.
 */
export function MediaFallback({ label, className = '', decorative = false }: { label: string; className?: string; decorative?: boolean }) {
  return (
    <div
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      className={`relative isolate overflow-hidden bg-gradient-to-br from-teal via-teal-deep to-navy ${className}`}
    >
      <div className="book-stripes absolute -right-6 top-[12%] h-[46%] w-[38%] -skew-y-6 text-green/25" />
      <Range fill="#0b1424" facet="#88b03f" facetOpacity={0.22} profile={1} className="absolute inset-x-0 bottom-0 h-[48%]" />
    </div>
  );
}
