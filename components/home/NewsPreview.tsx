import { NewsCard } from '@/components/sections/NewsCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Tail } from '@/components/brand/Marks';
import { BLOG_UPDATES } from '@/data/academyData';

export function NewsPreview() {
  const [lead, ...rest] = BLOG_UPDATES;
  return (
    <section id="news" aria-labelledby="news-heading" className="bg-white py-24 lg:py-32">
      <div className="gutter wrap">
        <SectionHeader title="News" section="Latest" />
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 id="news-heading" className="display text-mega">
            From the <Tail>academy</Tail>
          </h2>
          <ButtonLink href="/news" variant="ghost-dark" className="self-start">
            All news
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="reveal">
            <NewsCard article={lead} featured />
          </div>
          <div className="grid content-start gap-12">
            {rest.map((a, i) => (
              <div key={a.id} className={`reveal reveal-${i + 2}`}>
                <NewsCard article={a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
