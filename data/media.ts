/**
 * Media manifest: every image and video on the site, and where it lives.
 *
 * For each slot, `src` accepts the full URL copied from the Cloudinary console, or just the public ID
 * ("folder/name", no extension). Where `src` is left out, the slot is filled from your Cloudinary library
 * (run `npm run media:sync` once; see scripts/sync-media.mjs). If there is still nothing, or a file fails to
 * load, the slot shows its `fallback` photo from /public/brand (taken from the brand guideline).
 * `alt` doubles as the SEO image text. `focus` is a CSS object-position for choosing the crop.
 */
import pool from './media.pool.json';

export type MediaKey =
  | 'hero-reel'
  | 'film'
  | 'project-banner'
  | 'programs-backdrop'
  | 'campus-wide'
  | 'pathway-main'
  | 'pathway-a'
  | 'pathway-b'
  | 'pathway-c'
  | 'pathway-d'
  | 'pathway-e'
  | 'player-strike'
  | 'youth-kick'
  | 'youth-match'
  | 'scholars-library'
  | 'scholars-campus'
  | 'residential'
  | 'blog-tackle'
  | 'blog-laces'
  | 'blog-volley'
  | 'highlight-1'
  | 'highlight-2'
  | 'highlight-3'
  | 'highlight-4'
  | 'match-highlight-main';

export interface MediaAsset {
  src: string | null;
  kind: 'image' | 'video';
  alt: string;
  focus?: string;
  /** Local photo shown when there is no `src`, or it fails to load */
  fallback?: string;
}

interface SlotDef extends MediaAsset {
  /** Preferred orientation when the slot is filled from the Cloudinary library */
  shape?: 'landscape' | 'portrait' | 'any';
}

const FILM_URL = 'https://res.cloudinary.com/dtb4hsasc/video/upload/v1793095652/IMG_0272_mnoenv.mov';

/** Slots are filled from the library in this order, so the most prominent images get first pick. */
const SLOTS: [MediaKey, SlotDef][] = [
  ['hero-reel', { src: FILM_URL, kind: 'video', alt: 'St. Sebastian players training on the pitch', focus: '50% 35%', fallback: '/brand/stadium.jpg' }],
  ['film', { src: FILM_URL, kind: 'video', alt: 'A film about life at St. Sebastian Sports Academy', focus: '50% 40%', fallback: '/brand/stadium.jpg' }],
  ['project-banner', { src: null, kind: 'image', shape: 'landscape', alt: 'Young athletes at St. Sebastian Sports Academy', fallback: '/brand/stadium.jpg', focus: '50% 70%' }],
  ['youth-kick', { src: null, kind: 'image', alt: 'A young academy player taking a shot on a floodlit pitch', fallback: '/brand/kick.jpg' }],
  ['youth-match', { src: null, kind: 'image', alt: 'Teen academy players competing for the ball in a match', fallback: '/brand/tackle.jpg' }],
  ['scholars-library', { src: null, kind: 'image', alt: 'Two scholars in uniform studying together in the library', fallback: '/brand/library.jpg' }],
  ['player-strike', { src: null, kind: 'image', alt: 'A St. Sebastian player with the ball', fallback: '/brand/girl-standing.jpg', focus: '50% 25%' }],
  ['programs-backdrop', { src: null, kind: 'image', shape: 'landscape', alt: 'Academy players on the pitch', fallback: '/brand/kick.jpg', focus: '50% 35%' }],
  ['campus-wide', { src: null, kind: 'image', shape: 'landscape', alt: 'The St. Sebastian campus and pitches', fallback: '/brand/stadium.jpg', focus: '50% 55%' }],
  ['pathway-main', { src: null, kind: 'image', shape: 'landscape', alt: 'Academy players in a match', fallback: '/brand/tackle.jpg' }],
  ['pathway-a', { src: null, kind: 'image', shape: 'landscape', alt: 'A smiling scholar-athlete holding a football', fallback: '/brand/smile.jpg' }],
  ['pathway-b', { src: null, kind: 'image', shape: 'landscape', alt: 'The squad together on the pitch', fallback: '/brand/huddle.jpg' }],
  ['pathway-c', { src: null, kind: 'image', shape: 'landscape', alt: 'A scholar studying in class', fallback: '/brand/reading.jpg' }],
  ['pathway-d', { src: null, kind: 'image', shape: 'landscape', alt: 'Scholars working together in the library', fallback: '/brand/library.jpg' }],
  ['pathway-e', { src: null, kind: 'image', alt: 'Scholars in academy blazers', fallback: '/brand/blazers.jpg' }],
  ['scholars-campus', { src: null, kind: 'image', alt: 'Two scholars in blazers standing in front of the academy campus', fallback: '/brand/campus.jpg' }],
  ['residential', { src: null, kind: 'image', alt: 'Students on the residential campus', fallback: '/brand/blazers.jpg' }],
  ['blog-tackle', { src: null, kind: 'image', alt: 'A midfielder sliding in for a tackle', fallback: '/brand/tackle.jpg' }],
  ['blog-laces', { src: null, kind: 'image', alt: 'A player sitting with the ball before kick-off', fallback: '/brand/sitting.jpg' }],
  ['blog-volley', { src: null, kind: 'image', alt: 'A scholar-athlete with the ball', fallback: '/brand/smile.jpg' }],
  ['highlight-1', { src: null, kind: 'image', alt: 'The U18 squad together before a fixture', fallback: '/brand/huddle.jpg' }],
  ['highlight-2', { src: null, kind: 'image', alt: 'The match ball on the pitch under floodlights', fallback: '/brand/stadium.jpg' }],
  ['highlight-3', { src: null, kind: 'image', alt: 'The squad celebrating a late winner with supporters', fallback: '/brand/crowd.jpg' }],
  ['highlight-4', { src: null, kind: 'image', alt: 'A player finishing during a golden-hour 1-2-1 session', fallback: '/brand/kick.jpg' }],
  ['match-highlight-main', { src: null, kind: 'image', alt: 'The U19 squad lifting the Champions Cup', fallback: '/brand/crowd.jpg' }],
];

interface PoolAsset {
  publicId: string;
  resourceType: 'image' | 'video';
  width: number;
  height: number;
  url: string;
  alt?: string;
}

const LIBRARY = pool as PoolAsset[];

function fits(asset: PoolAsset, shape: SlotDef['shape']) {
  if (!shape || shape === 'any') return true;
  return shape === 'portrait' ? asset.height > asset.width * 1.05 : asset.width >= asset.height;
}

function build(): Record<MediaKey, MediaAsset> {
  const used = new Set<string>();
  const result = {} as Record<MediaKey, MediaAsset>;

  // Anything the editor pinned explicitly is never handed to another slot
  for (const [, def] of SLOTS) if (def.src) used.add(def.src);

  for (const [key, def] of SLOTS) {
    const { shape, ...asset } = def;
    if (asset.src) {
      result[key] = asset;
      continue;
    }
    const candidates = LIBRARY.filter((a) => a.resourceType === asset.kind);
    const pick =
      candidates.find((a) => !used.has(a.url) && fits(a, shape)) ??
      candidates.find((a) => !used.has(a.url)) ??
      (candidates.length ? candidates[used.size % candidates.length] : undefined);
    if (pick) {
      used.add(pick.url);
      result[key] = { ...asset, src: pick.url, alt: pick.alt ?? asset.alt };
    } else {
      result[key] = asset;
    }
  }
  return result;
}

export const MEDIA = build();
