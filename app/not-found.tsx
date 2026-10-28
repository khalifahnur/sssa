import { ButtonLink } from '@/components/ui/Button';
import { Range } from '@/components/brand/Range';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy text-white">
      <div className="gutter wrap py-32">
        <p className="text-xs font-extrabold uppercase tracking-label text-green">Error 404</p>
        <h1 className="display text-hero mt-4">Off the pitch</h1>
        <p className="mt-6 max-w-lg text-lg text-white/75">The page you were looking for has moved or does not exist. Let&rsquo;s get you back in play.</p>
        <div className="mt-10 flex gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/programs" variant="ghost-light">
            Programmes
          </ButtonLink>
        </div>
      </div>
      <Range fill="#1f4b50" facet="#88b03f" facetOpacity={0.25} profile={2} className="absolute inset-x-0 bottom-0 -z-10 h-[16vw] min-h-24" />
    </section>
  );
}
