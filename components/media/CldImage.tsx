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

/**
 * Cloudinary image. If the slot holds a video, its first frame is shown.
 * Fallback chain: optimised rendition, then the untouched original URL, then the slot's local fallback photo,
 * then an on-brand placeholder.
 */
export function CldImage({ media, sizes = '100vw', priority, className = '', imgClassName = '', alt, decorative }: CldImageProps) {
  const asset = MEDIA[media];
  // 0: optimised Cloudinary rendition, 1: the untouched original URL, 2: local fallback photo, 3: placeholder
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(asset.src ? 0 : asset.fallback ? 2 : 3);
  const text = alt ?? asset.alt;
  const original = asset.kind === 'image' && asset.src && /^https?:\/\//i.test(asset.src) ? asset.src : null;

  const next = (from: 0 | 1 | 2 | 3) => {
    if (from === 0 && original) return 1;
    if (from <= 1 && asset.fallback) return 2;
    return 3;
  };

  if (stage === 3) {
    return <MediaFallback label={text} decorative={decorative} className={className} />;
  }

  const alternative = decorative ? '' : text;
  const common = {
    fill: true as const,
    sizes,
    priority,
    style: asset.focus ? { objectPosition: asset.focus } : undefined,
    className: `object-cover ${imgClassName}`,
    onError: () => setStage(next(stage)),
  };

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      {stage === 0 && asset.src && <Image {...common} alt={alternative} src={asset.src} loader={asset.kind === 'video' ? posterLoader : imageLoader} />}
      {stage === 1 && original && <Image {...common} alt={alternative} src={original} unoptimized />}
      {stage === 2 && asset.fallback && <Image {...common} alt={alternative} src={asset.fallback} unoptimized />}
    </div>
  );
}
