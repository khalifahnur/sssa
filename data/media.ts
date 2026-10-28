/**
 * Media manifest: every image and video on the site, mapped to its Cloudinary public ID.
 *
 * `id` is the public ID in your Cloudinary media library (folder path included, no file extension).
 * Rename an ID here and every page that uses the asset follows. `alt` doubles as the SEO image text.
 */
const FOLDER = 'sssa';

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
  id: string;
  alt: string;
  kind: 'image' | 'video';
}

export const MEDIA: Record<MediaKey, MediaAsset> = {
  'hero-reel': { id: `${FOLDER}/hero_reel`, kind: 'video', alt: 'St. Sebastian players training on the pitch' },
  'player-strike': { id: `${FOLDER}/player_strike`, kind: 'image', alt: 'A St. Sebastian player striking the ball' },
  'youth-kick': { id: `${FOLDER}/youth_kick_clean`, kind: 'image', alt: 'A young academy player taking a shot on a floodlit pitch' },
  'youth-match': { id: `${FOLDER}/youth_match_clean`, kind: 'image', alt: 'Teen academy players competing for the ball in a match' },
  'scholars-library': { id: `${FOLDER}/scholars_library_clean`, kind: 'image', alt: 'Two scholars in uniform studying together in the library' },
  'scholars-campus': { id: `${FOLDER}/scholars_campus_clean`, kind: 'image', alt: 'Two scholars in blazers standing in front of the academy campus' },
  residential: { id: `${FOLDER}/residential`, kind: 'image', alt: 'Students on the residential campus' },
  'blog-tackle': { id: `${FOLDER}/blog_tackle`, kind: 'image', alt: 'A midfielder sliding in for a tackle' },
  'blog-laces': { id: `${FOLDER}/blog_laces`, kind: 'image', alt: 'A player tying their boots before kick-off' },
  'blog-volley': { id: `${FOLDER}/blog_volley`, kind: 'image', alt: 'A striker connecting with a volley' },
  'highlight-1': { id: `${FOLDER}/highlight_1`, kind: 'image', alt: 'The U18 midfield pressing high up the pitch' },
  'highlight-2': { id: `${FOLDER}/highlight_2`, kind: 'image', alt: 'The goalkeeper diving to save a penalty' },
  'highlight-3': { id: `${FOLDER}/highlight_3`, kind: 'image', alt: 'The squad celebrating a late winner with supporters' },
  'highlight-4': { id: `${FOLDER}/highlight_4`, kind: 'image', alt: 'A player finishing during a golden-hour 1-2-1 session' },
  'match-highlight-main': { id: `${FOLDER}/match_highlight_main`, kind: 'image', alt: 'The U19 squad lifting the Champions Cup' },
};
