/**
 * Cloudinary delivery helpers.
 *
 * Media can be referenced either by the full URL copied from the Cloudinary console
 * (https://res.cloudinary.com/<cloud>/video/upload/v1793095652/IMG_0272_mnoenv.mov) or by its bare
 * public ID ("folder/name"). Either way we build optimised, format-negotiated delivery URLs from it.
 */
const DEFAULT_CLOUD = 'dtb4hsasc';

export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD;

/** Override only to point the site at a local mock CDN while developing offline. */
const BASE_OVERRIDE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

export interface CldRef {
  /** Delivery origin including the cloud name */
  base: string;
  /** Public ID without extension, folders included */
  id: string;
  /** Asset version (the `v123…` segment), used for cache-busting when present */
  version?: string;
  /** The exact URL the editor pasted, kept as a last-resort source for videos */
  original?: string;
}

const EXTENSIONS = /\.(mov|mp4|m4v|webm|ogv|jpe?g|png|webp|avif|gif|heic|heif)$/i;
const TRANSFORMATION = /^[a-z]{1,3}_[^/]*(,[a-z]{1,3}_[^/]*)*$/;

export function resolveSource(src: string): CldRef {
  if (!/^https?:\/\//i.test(src)) {
    return { base: BASE_OVERRIDE ?? `https://res.cloudinary.com/${CLOUD_NAME}`, id: src.replace(EXTENSIONS, '') };
  }

  const url = new URL(src);
  // /<cloud>/<image|video>/<upload>/[transformations/][v123/]<public id>.<ext>
  const [cloud, , , ...rest] = url.pathname.split('/').filter(Boolean);
  const versionAt = rest.findIndex((segment) => /^v\d+$/.test(segment));
  const idParts = versionAt >= 0 ? rest.slice(versionAt + 1) : rest.filter((segment, i) => !(i < rest.length - 1 && TRANSFORMATION.test(segment)));

  return {
    base: BASE_OVERRIDE ?? `${url.origin}/${cloud}`,
    id: decodeURIComponent(idParts.join('/')).replace(EXTENSIONS, ''),
    version: versionAt >= 0 ? rest[versionAt] : undefined,
    original: src,
  };
}

const withVersion = (ref: CldRef) => (ref.version ? `${ref.version}/` : '');

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  crop?: string;
  gravity?: string;
}

export function cldImageUrl(ref: CldRef, opts: ImageOptions = {}) {
  const { width, height, quality = 'auto', crop = 'limit', gravity } = opts;
  const t = ['f_auto', `q_${quality}`, `c_${height ? 'fill' : crop}`];
  if (width) t.push(`w_${width}`);
  if (height) t.push(`h_${height}`);
  if (gravity ?? height) t.push(`g_${gravity ?? 'auto'}`);
  return `${ref.base}/image/upload/${t.join(',')}/${withVersion(ref)}${ref.id}`;
}

/** Poster frame (first frame) of a Cloudinary video. */
export function cldVideoPoster(ref: CldRef, width = 1600) {
  return `${ref.base}/video/upload/f_jpg,q_auto,c_limit,w_${width},so_0/${withVersion(ref)}${ref.id}.jpg`;
}

export interface VideoSource {
  src: string;
  type?: string;
}

/**
 * Sources in preference order: WebM (smallest), H.264 MP4 (Safari/iOS), then the untouched original upload
 * so a clip still plays if on-the-fly transcoding is unavailable (very large files, or a plan limit).
 */
export function cldVideoSources(ref: CldRef, width = 1600): VideoSource[] {
  const size = `c_limit,w_${width},h_${width}`;
  const sources: VideoSource[] = [
    { src: `${ref.base}/video/upload/f_webm,vc_vp9,q_auto,${size}/${withVersion(ref)}${ref.id}.webm`, type: 'video/webm' },
    { src: `${ref.base}/video/upload/f_mp4,vc_h264,q_auto,${size}/${withVersion(ref)}${ref.id}.mp4`, type: 'video/mp4' },
  ];
  // No `type` on the original: browsers reject "video/quicktime" up front but will happily sniff an H.264 .mov.
  if (ref.original) sources.push({ src: ref.original });
  return sources;
}
