import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { Tail } from '@/components/brand/Marks';
import { NewsCard } from '@/components/sections/NewsCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { BLOG_UPDATES } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'News — signings, match reports and scholar achievements',
  description: 'The latest from St. Sebastian Sports Academy: academy signings, match reports, scholar placements and stories from the pitch and the classroom.',
  path: '/news',
  keywords: ['academy news', 'match report', 'football scholarship', 'scholar athlete news'],
});

export default function NewsPage() {
  const [lead, ...rest] = BLOG_UPDATES;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }])} />
      <PageHero
        section="News"
        crumbs={[{ name: 'Home', href: '/' }, { name: 'News' }]}
        title={
          <>
            Stories from the <Tail>academy</Tail>
          </>
        }
        intro="Signings, match reports and the achievements of our scholar-athletes, on and off the pitch."
      />
      <section aria-label="Latest articles" className="bg-white py-16 lg:py-24">
        <div className="gutter wrap">
          <div className="reveal">
            <NewsCard article={lead} featured />
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-24">
            {rest.map((a, i) => (
              <div key={a.id} className={`reveal reveal-${i + 1}`}>
                <NewsCard article={a} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
