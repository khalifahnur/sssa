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

## Navigation

Two stacked headers, as in the original design: the fixed navy **main header** (menu, quick links, crest, search, call to action),
and a white **sub-navigation** that sits under the opening section and then pins beneath the main header while you scroll. Its tabs
jump to the sections of the current page and follow your position (`components/layout/SubNav.tsx`).

## Pages

`/` · `/academy` · `/programs` · `/programs/[slug]` (×4) · `/fixtures` · `/news` · `/news/[slug]` (×3) · `/admissions`

SEO: per-page metadata + canonical + Open Graph, JSON-LD (Organization, WebSite, BreadcrumbList, Course, SportsEvent, NewsArticle, FAQPage), `sitemap.xml`, `robots.txt`, web manifest, generated OG card.

## Cloudinary

The cloud name defaults to `dtb4hsasc` (override with `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, see `.env.example`).

Every image and video on the site is listed in `data/media.ts`. For each slot, paste either the **full URL** copied from the
Cloudinary Media Library, or the **public ID** (`folder/name`, no extension):

```ts
'hero-reel': { src: 'https://res.cloudinary.com/dtb4hsasc/video/upload/v1793095652/IMG_0272_mnoenv.mov', kind: 'video', alt: '…' },
'youth-kick': { src: 'https://res.cloudinary.com/dtb4hsasc/image/upload/v…/youth_kick_abc123.jpg', kind: 'image', alt: '…' },
```

- Images are served through Cloudinary with `f_auto,q_auto` and the right width for each layout (via `next/image`).
- Videos are delivered as WebM, then H.264 MP4, then your original upload, so an iPhone `.mov` plays everywhere. Keep clips short
  (under ~100 MB) so Cloudinary can transcode them on the fly.
- A slot whose `src` is `null`, or whose file fails to load, shows an on-brand placeholder instead of a broken image.
- A `kind: 'video'` slot can be used anywhere an image can: cards show its first frame, the hero and highlight dialogs play it.

## Forms

`app/actions.ts` validates trial requests and ticket reservations on the server. `deliver()` only logs for now — connect it to your email/CRM before launch.

## Scripts

`python3 scripts/extract-brand-art.py <p1.svg> components/brand` regenerates the crest, mountain and icon from the guideline PDF.
