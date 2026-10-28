# St. Sebastian Sports Academy — website

Next.js 16 (App Router, Cache Components) + Tailwind v4. Built to the brand guideline: navy / dark teal / green / white, the official crest and mountain artwork, Figtree standing in for Averta.

## Scroll motion

| Tech | Where |
| --- | --- |
| **GSAP + ScrollTrigger** | Pinned hero scene (`components/home/HeroPinned.tsx`), horizontal values track (`ValuesHorizontal.tsx`) |
| **Framer Motion** (`motion/react`) | `useScroll`/`useTransform` word-by-word mission text, stacked programme cards, drawing timeline, menu & filters |
| **CSS scroll-driven animations** | `animation-timeline: view()/scroll()` for reveals, header shrink, progress bar, image drift (see `app/globals.css`) |
| **Lenis** | Inertia scrolling, driven from GSAP's ticker (`components/layout/SmoothScroll.tsx`) |

Everything respects `prefers-reduced-motion`.

## Pages

`/` · `/academy` · `/programs` · `/programs/[slug]` (×4) · `/fixtures` · `/news` · `/news/[slug]` (×3) · `/admissions`

SEO: per-page metadata + canonical + Open Graph, JSON-LD (Organization, WebSite, BreadcrumbList, Course, SportsEvent, NewsArticle, FAQPage), `sitemap.xml`, `robots.txt`, web manifest, generated OG card.

## Cloudinary

Create `.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_SITE_URL=https://your-domain.org
```

Every asset is listed in `data/media.ts` (key → Cloudinary public ID). Edit the IDs to match your media library; the hero video is `hero-reel`. Without a cloud name, brand-built placeholders are shown.

## Forms

`app/actions.ts` validates trial requests and ticket reservations on the server. `deliver()` only logs for now — connect it to your email/CRM before launch.

## Scripts

`python3 scripts/extract-brand-art.py <p1.svg> components/brand` regenerates the crest, mountain and icon from the guideline PDF.
