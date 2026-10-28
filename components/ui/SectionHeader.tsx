/**
 * The guideline's running header: a light title on the left, "ST. SEBASTIAN SPORTS ACADEMY/ SECTION"
 * on the right, and a heavy rule underneath that draws itself in on scroll.
 */
export function SectionHeader({ title, section, className = '' }: { title: string; section?: string; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-6 pb-4">
        <span className="text-base font-light uppercase tracking-[0.14em] sm:text-xl">{title}</span>
        <span className="text-right text-[0.6rem] font-bold uppercase tracking-[0.16em] sm:text-xs">
          St. Sebastian Sports Academy/ <span className="text-green">{section ?? title}</span>
        </span>
      </div>
      <span className="rule-draw block h-[3px] w-full bg-current" />
    </div>
  );
}

/** Small label used above headings. */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-extrabold uppercase tracking-label text-green ${className}`}>{children}</p>;
}
