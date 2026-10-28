'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { useState } from 'react';
import { cldImageUrl, cldVideoPoster, resolveSource } from '@/lib/cloudinary';
import { MEDIA, type MediaKey } from '@/data/media';
import { MediaFallback } from './MediaFallback';

const imageLoader = ({ src, width }: ImageLoaderProps) => cldImageUrl(resolveSource(src), { width });
const posterLoader = ({ src, width }: ImageLoaderProps) => cldVideoPoster(resolveSource(src), width);

interface CldImageProps {
  media: MediaKey;
  /** `sizes` hint so the browser downloads the smallest adequate rendition */
  sizes?: string;
  priority?: boolean;
  /** Sizing/aspect classes for the frame, e.g. "aspect-[4/5]" */
  className?: string;
  imgClassName?: string;
  /** Overrides the manifest alt text */
  alt?: string;
  /** Purely decorative images get empty alt text */
  decorative?: boolean;
}

/** Cloudinary image. If the slot holds a video, its first frame is shown. Missing or broken assets fall back to a brand placeholder. */
export function CldImage({ media, sizes = '100vw', priority, className = '', imgClassName = '', alt, decorative }: CldImageProps) {
  const asset = MEDIA[media];
  // 0: optimised Cloudinary rendition, 1: the untouched original URL (if transformations are refused), 2: placeholder
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const text = alt ?? asset.alt;
  const original = asset.kind === 'image' && asset.src && /^https?:\/\//i.test(asset.src) ? asset.src : null;

  if (!asset.src || stage === 2) {
    return <MediaFallback label={text} decorative={decorative} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <Image
        src={stage === 1 && original ? original : asset.src}
        alt={decorative ? '' : text}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={stage === 1}
        loader={stage === 1 ? undefined : asset.kind === 'video' ? posterLoader : imageLoader}
        onError={() => setStage(stage === 0 && original ? 1 : 2)}
        style={asset.focus ? { objectPosition: asset.focus } : undefined}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
