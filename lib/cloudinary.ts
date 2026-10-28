/**
 * Cloudinary delivery helpers.
 *
 * Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your cloud name. Until it is set, every
 * <CldImage>/<CldVideo> renders the on-brand placeholder instead, so the site stays presentable.
 */
export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
export const hasCloudinary = CLOUD_NAME.length > 0;

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  /** Cloudinary crop mode, e.g. fill, limit, fit */
  crop?: string;
  gravity?: string;
}

export function cldImageUrl(publicId: string, opts: ImageOptions = {}) {
  const { width, height, quality = 'auto', crop = 'limit', gravity } = opts;
  const t = ['f_auto', `q_${quality}`, `c_${height ? 'fill' : crop}`];
  if (width) t.push(`w_${width}`);
  if (height) t.push(`h_${height}`);
  if (gravity ?? height) t.push(`g_${gravity ?? 'auto'}`);
  return `${BASE}/image/upload/${t.join(',')}/${publicId}`;
}

export function cldVideoUrl(publicId: string, format: 'mp4' | 'webm', width = 1920) {
  return `${BASE}/video/upload/f_${format},q_auto,c_limit,w_${width}/${publicId}.${format}`;
}

/** First frame of a Cloudinary video, used as the poster image. */
export function cldVideoPoster(publicId: string, width = 1600) {
  return `${BASE}/video/upload/f_auto,q_auto,c_limit,w_${width},so_0/${publicId}.jpg`;
}
