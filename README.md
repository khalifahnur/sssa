# St. Sebastian Sports Academy — website

Next.js 16 (App Router, Cache Components) + Tailwind v4. Built to the brand guideline: navy / dark teal / green / white, the official crest and mountain artwork, Figtree standing in for Averta.

## Scroll motion

| Tech | Where |
| --- | --- |
| **GSAP + ScrollTrigger** | Pinned hero scene (`components/home/HeroPinned.tsx`); staggered photo-mosaic reveal (`PathwaySection.tsx`) |
| **Framer Motion** (`motion/react`) | `useScroll`/`useTransform` word-by-word activation of the mission and vision (`ProjectSection.tsx`, `components/motion/ScrollWords.tsx`); menu, search, filters, timeline |
| **CSS scroll-driven animations** | `animation-timeline: view()/scroll()` for reveals, the film band opening, image and card drift, the transparent-to-solid header, the progress bar (see `app/globals.css`) |
| **Lenis** | Inertia scrolling, driven from GSAP's ticker (`components/layout/SmoothScroll.tsx`) |

Everything respects `prefers-reduced-motion`.

## Navigation

Two stacked headers: the **main header** (80 px; menu with divider, quick links, crest on a solid navy tab, search / help / admissions icons) and a
white **sub-navigation** (62 px) that pins beneath the main header while you scroll (on the home page it sits below the hero; on inner pages it is the first thing under the main header, above the photographic banner). On the home page the
main header starts transparent over the hero and turns solid as you scroll (a CSS scroll-driven animation). The sub-nav tabs jump to sections of the
current page and follow your position (`components/layout/SubNav.tsx`, `lib/scroll.ts`).

The **menu** and **search** open as white, full-width panels beneath the main header, and the button that opened a panel turns white so it joins it
(`components/layout/SiteHeader.tsx`). The menu lists the four main destinations (Home, The academy, Programs, Admissions) in large condensed type with a
"Register for a trial" button, and carries the brand peak up its right edge. Search (also Ctrl/Cmd + K) filters pages, programs, fixtures and news as you
type, with the peak at the bottom right. Links to the page you are already on close the panel and glide to the section.

## Home page

Sections, in order (the sub-navigation tabs jump between the first four): **Hero** (full-bleed darkened footage, monumental title; scrolling
clears the darkness, then a statement and mountain ridges rise: GSAP ScrollTrigger, pinned) → **The Project** (photographic banner with the
mission and vision cards overlapping it; their words light up as you scroll: Framer Motion `useScroll`) and the four brand values →
**Film** (a full-bleed band that opens from an inset window as it scrolls in: CSS `animation-timeline: view()`; play opens the video in a modal) →
**Programs** (dark backdrop, title and round arrows at the left, photo cards running off the right edge: scroll-snap + `view(inline)` drift) →
**The Campus** (text column and a wide photograph) → **Player Pathway** (text column and an asymmetric photo mosaic whose tiles wipe in:
GSAP `ScrollTrigger.batch`) → **Find the program** (three ways to get started).

Headings, navigation and buttons use Saira Extra Condensed (`--font-display` in `app/globals.css`); body copy uses Figtree.

## Pages

`/` · `/academy` · `/programs` · `/programs/[slug]` (×4) · `/fixtures` · `/news` · `/news/[slug]` (×3) · `/admissions`

SEO: per-page metadata + canonical + Open Graph, JSON-LD (Organization, WebSite, BreadcrumbList, Course, SportsEvent, NewsArticle, FAQPage), `sitemap.xml`, `robots.txt`, web manifest, generated OG card.

## Cloudinary

The cloud name defaults to `dtb4hsasc` (override with `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, see `.env.example`). Each image/video slot in
`data/media.ts` is resolved in this order:

1. **A pinned `src`**: paste the full URL copied from the Cloudinary Media Library, or the public ID (`folder/name`, no extension).
   The hero and film videos are pinned to `IMG_0272_mnoenv.mov`.
2. **Your library, automatically**: put `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.local` (Cloudinary console → Settings →
   API Keys) and run `npm run media:sync`. It writes `data/media.pool.json`, and every slot without a pinned `src` is filled from it
   (videos into video slots, images into image slots, matching portrait/landscape where possible). Re-run it after uploading new media.
3. **A local fallback photo** from `public/brand` (taken from the brand guideline), so the layout is never empty.

Delivery details: images go through Cloudinary with `f_auto,q_auto` at the width each layout needs (`next/image`); videos are served as WebM,
then H.264 MP4, then your untouched upload, so an iPhone `.mov` plays everywhere (keep clips under ~100 MB so Cloudinary can transcode them
on the fly). A broken image falls back to its original URL, then the local photo, then a placeholder. A `kind: 'video'` slot can be used
wherever an image can: cards show its first frame, the hero and the film band play it.

## Forms

`app/actions.ts` validates trial requests and ticket reservations on the server. `deliver()` only logs for now — connect it to your email/CRM before launch.

## Scripts

`python3 scripts/extract-brand-art.py <p1.svg> components/brand` regenerates the crest, mountain and icon from the guideline PDF.
