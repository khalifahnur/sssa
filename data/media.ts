/**
 * Media manifest: every image and video on the site, and where it lives in Cloudinary.
 *
 * `src` accepts the full URL copied from the Cloudinary console, or just the public ID
 * ("folder/name", no extension). Leave it `null` and the slot shows an on-brand placeholder.
 * `alt` doubles as the SEO image text. `focus` is a CSS object-position for choosing the crop.
 */
export type MediaKey =
  | 'hero-reel'
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
}

export const MEDIA: Record<MediaKey, MediaAsset> = {
  'hero-reel': {
    src: 'https://res.cloudinary.com/dtb4hsasc/video/upload/v1793095652/IMG_0272_mnoenv.mov',
    kind: 'video',
    alt: 'St. Sebastian players training on the pitch',
    focus: '50% 35%',
  },
  'player-strike': { src: null, kind: 'image', alt: 'A St. Sebastian player striking the ball' },
  'youth-kick': { src: null, kind: 'image', alt: 'A young academy player taking a shot on a floodlit pitch' },
  'youth-match': { src: null, kind: 'image', alt: 'Teen academy players competing for the ball in a match' },
  'scholars-library': { src: null, kind: 'image', alt: 'Two scholars in uniform studying together in the library' },
  'scholars-campus': { src: null, kind: 'image', alt: 'Two scholars in blazers standing in front of the academy campus' },
  residential: { src: null, kind: 'image', alt: 'Students on the residential campus' },
  'blog-tackle': { src: null, kind: 'image', alt: 'A midfielder sliding in for a tackle' },
  'blog-laces': { src: null, kind: 'image', alt: 'A player tying their boots before kick-off' },
  'blog-volley': { src: null, kind: 'image', alt: 'A striker connecting with a volley' },
  'highlight-1': { src: null, kind: 'image', alt: 'The U18 midfield pressing high up the pitch' },
  'highlight-2': { src: null, kind: 'image', alt: 'The goalkeeper diving to save a penalty' },
  'highlight-3': { src: null, kind: 'image', alt: 'The squad celebrating a late winner with supporters' },
  'highlight-4': { src: null, kind: 'image', alt: 'A player finishing during a golden-hour 1-2-1 session' },
  'match-highlight-main': { src: null, kind: 'image', alt: 'The U19 squad lifting the Champions Cup' },
};
