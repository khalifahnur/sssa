import { CalendarCheck, Headset } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PitchIcon } from '@/components/ui/Icons';

const OPTIONS = [
  { label: 'Book a trial', cta: 'Book now', href: '/admissions#trial', icon: <CalendarCheck className="h-10 w-10" strokeWidth={1.3} /> },
  { label: 'Browse the programs', cta: 'View all', href: '/programs', icon: <PitchIcon className="h-9 w-12" /> },
  { label: 'Contact us', cta: 'Get in touch', href: '/admissions#faq', icon: <Headset className="h-10 w-10" strokeWidth={1.3} /> },
];

/** Closing block: three ways to get started, separated by dashed rules. */
export function FindProgram() {
  return (
    <section id="find" aria-labelledby="find-heading" className="bg-white pb-44 pt-20 lg:pb-52 lg:pt-28">
      <h2 id="find-heading" className="display reveal mx-auto max-w-4xl px-5 text-center text-[clamp(2.6rem,3.9vw,3.4rem)]">
        Find the program that best suits your needs
      </h2>
      <div className="mx-auto mt-14 grid max-w-[58rem] px-5 md:grid-cols-3 lg:mt-20">
        {OPTIONS.map((o, i) => (
          <div
            key={o.label}
            className={`reveal reveal-${i + 1} flex flex-col items-center border-dashed border-navy/25 px-6 py-8 max-md:border-t max-md:first:border-t-0 md:border-l md:first:border-l-0`}
          >
            <p className="display text-[1.9rem] text-navy/45">{o.label}</p>
            <span className="mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-dotted border-navy/40 text-navy">{o.icon}</span>
            <ButtonLink href={o.href} variant="outline-dark" arrow={false} className="mt-8">
              {o.cta}
            </ButtonLink>
          </div>
        ))}
      </div>
    </section>
  );
}
