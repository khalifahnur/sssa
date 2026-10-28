import { Peak } from '@/components/brand/Peak';
import { Slash } from '@/components/brand/Marks';
import { ButtonLink } from '@/components/ui/Button';

/** Closing call to action, framed by the brand mountain. */
export function CtaBand({
  title = 'Start the journey',
  body = 'Book a trial evaluation and see how St. Sebastian can shape the next chapter on the pitch and in the classroom.',
  cta = 'Book a trial',
  href = '/admissions#trial',
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section id="join" aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-navy text-white">
      <Peak className="absolute -right-10 top-0 -z-10 h-full w-[60%] text-teal/70 lg:w-[34%]" />
      <div className="gutter wrap py-28 lg:py-40">
        <h2 id="cta-heading" className="display text-hero max-w-5xl">
          {title}<Slash className="ml-[0.18em]" />
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={href}>{cta}</ButtonLink>
          <ButtonLink href="/programs" variant="ghost-light">
            Explore programs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
