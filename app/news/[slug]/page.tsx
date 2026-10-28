import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CldImage } from '@/components/media/CldImage';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { NewsCard } from '@/components/sections/NewsCard';
import { Range } from '@/components/brand/Range';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site';
import { BLOG_UPDATES } from '@/data/academyData';

export function generateStaticParams() {
  return BLOG_UPDATES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/news/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_UPDATES.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    type: 'article',
    publishedTime: article.isoDate,
    keywords: [article.category, 'St. Sebastian Sports Academy news'],
  });
}

export default async function ArticlePage({ params }: PageProps<'/news/[slug]'>) {
  const { slug } = await params;
  const index = BLOG_UPDATES.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();
  const article = BLOG_UPDATES[index];
  const more = BLOG_UPDATES.filter((a) => a.id !== article.id).slice(0, 2);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.isoDate,
    author: { '@type': 'Person', name: article.author.replace(/\b(\w)(\w*)/g, (_, a: string, b: string) => a + b.toLowerCase()) },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg') } },
    mainEntityOfPage: absoluteUrl(`/news/${article.slug}`),
  };

  return (
    <>
      <JsonLd
        data={[
          articleLd,
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'News', path: '/news' },
            { name: article.title, path: `/news/${article.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="relative isolate overflow-hidden bg-navy text-white">
          <div className="gutter wrap pb-24 pt-[calc(var(--header-h)+2.5rem)] lg:pb-36">
            <SectionHeader title={article.category} section="News" />
            <nav aria-label="Breadcrumb" className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
              <Link href="/" className="hover:text-green">Home</Link> / <Link href="/news" className="hover:text-green">News</Link>
            </nav>
            <h1 className="display mt-10 max-w-5xl text-[clamp(2rem,5.4vw,4.6rem)] !leading-[0.98]">{article.title}</h1>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-white/65">
              <time dateTime={article.isoDate}>{article.date}</time> · {article.author} · {article.readTime}
            </p>
          </div>
          <Range fill="#ffffff" facet="#121e34" facetOpacity={0.1} profile={2} className="absolute inset-x-0 bottom-0 -z-10 h-[8vw] min-h-12" />
        </header>

        <div className="bg-white">
          <div className="gutter wrap -mt-12 lg:-mt-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] lg:aspect-[21/9]">
              <CldImage media={article.image} priority sizes="(min-width:1408px) 88rem, 100vw" className="h-full w-full" />
            </div>
          </div>
          <div className="gutter mx-auto max-w-3xl py-16 lg:py-24">
            <p className="text-xl font-semibold leading-relaxed text-teal lg:text-2xl">{article.excerpt}</p>
            <div className="mt-10 space-y-6 text-lg leading-[1.75]">
              {article.content.map((para, i) => (
                <p key={i} className={para.startsWith('"') ? 'border-l-[6px] border-green pl-6 font-semibold' : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section aria-labelledby="more-heading" className="bg-mist py-20 lg:py-28">
        <div className="gutter wrap">
          <h2 id="more-heading" className="display text-lg-display">
            More from the academy
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {more.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
