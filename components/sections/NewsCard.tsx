import Link from 'next/link';
import { CldImage } from '@/components/media/CldImage';
import type { BlogArticle } from '@/data/academyData';

export function NewsCard({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  return (
    <article className="group relative">
      <Link href={`/news/${article.slug}`} className="block">
        <div className={`overflow-hidden rounded-[4px] ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <CldImage
            media={article.image}
            sizes={featured ? '(min-width:1024px) 60vw, 100vw' : '(min-width:1024px) 30vw, 100vw'}
            className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        </div>
        <div className="mt-5 flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.16em]">
          <span className="text-green">{article.category}</span>
          <span className="h-px w-6 bg-current opacity-30" />
          <time dateTime={article.isoDate} className="opacity-60">
            {article.date}
          </time>
        </div>
        <h3 className={`mt-3 font-extrabold leading-[1.1] tracking-[-0.01em] ${featured ? 'text-[clamp(1.7rem,3.2vw,2.9rem)]' : 'text-xl sm:text-2xl'}`}>
          <span className="bg-gradient-to-r from-green to-green bg-[length:0_3px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]">
            {article.title}
          </span>
        </h3>
        <p className="mt-3 line-clamp-3 max-w-prose text-[0.95rem] opacity-70">{article.excerpt}</p>
      </Link>
    </article>
  );
}
