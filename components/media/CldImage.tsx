'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { useState } from 'react';
import { cldImageUrl, hasCloudinary } from '@/lib/cloudinary';
import { MEDIA, type MediaKey } from '@/data/media';
import { MediaFallback } from './MediaFallback';

const loader = ({ src, width }: ImageLoaderProps) => cldImageUrl(src, { width });

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

export function CldImage({ media, sizes = '100vw', priority, className = '', imgClassName = '', alt, decorative }: CldImageProps) {
  const asset = MEDIA[media];
  const [failed, setFailed] = useState(false);
  const text = alt ?? asset.alt;

  if (!hasCloudinary || failed) {
    return <MediaFallback label={text} decorative={decorative} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <Image
        src={asset.id}
        alt={decorative ? '' : text}
        fill
        sizes={sizes}
        priority={priority}
        loader={loader}
        onError={() => setFailed(true)}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
