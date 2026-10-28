import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'green' | 'navy' | 'light' | 'ghost-light' | 'ghost-dark';

const VARIANTS: Record<Variant, string> = {
  green: 'bg-green text-navy hover:bg-white',
  navy: 'bg-navy text-white hover:bg-teal',
  light: 'bg-white text-navy hover:bg-green',
  'ghost-light': 'border-2 border-white/40 text-white hover:border-green hover:text-green',
  'ghost-dark': 'border-2 border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  size?: 'md' | 'sm';
}

export function ButtonLink({ variant = 'green', className = '', arrow = true, size = 'md', children, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-3 rounded-[3px] font-extrabold uppercase tracking-[0.12em] transition-colors duration-300 ${
        size === 'md' ? 'px-6 py-4 text-[0.8rem]' : 'px-4 py-2.5 text-[0.7rem]'
      } ${VARIANTS[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <svg
          viewBox="0 0 20 20"
          width="16"
          height="16"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
        >
          <path d="M3 10h13M11 4l6 6-6 6" />
        </svg>
      )}
    </Link>
  );
}

/** Button element variant for forms. */
export function SubmitButton({ children, disabled, className = '' }: { children: React.ReactNode; disabled?: boolean; className?: string }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-3 rounded-[3px] bg-navy px-7 py-4 text-[0.8rem] font-extrabold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-teal disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
