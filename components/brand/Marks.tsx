/** Brand slash from the guideline headings ("OUR VALUES /"). */
export function Slash({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block -skew-x-[18deg] font-extrabold text-[var(--slash,var(--color-green))] ${className}`}>
      /
    </span>
  );
}

/** Five-pointed star from the crest base. */
export function Star({ className = '', size = 14 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} fill="currentColor">
      <path d="m12 1.5 3 7.2 7.5.6-5.7 4.9 1.8 7.4L12 17.6 5.4 21.6l1.8-7.4L1.5 9.3l7.5-.6z" />
    </svg>
  );
}

/** Last word of a heading plus the brand slash, kept together so the slash never wraps alone. */
export function Tail({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap">
      {children}
      <Slash className="ml-[0.18em]" />
    </span>
  );
}
