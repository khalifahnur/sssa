'use client';

import { useEffect, useRef, useState } from 'react';
import { cldVideoPoster, cldVideoUrl, hasCloudinary } from '@/lib/cloudinary';
import { MEDIA, type MediaKey } from '@/data/media';
import { MediaFallback } from './MediaFallback';

/**
 * Looping background video served from Cloudinary (WebM first, MP4 fallback).
 * Plays only while on screen, and stays on the poster frame for visitors who prefer reduced motion.
 */
export function CldVideo({ media, className = '' }: { media: MediaKey; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const asset = MEDIA[media];

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (!hasCloudinary || failed) {
    return <MediaFallback label={asset.alt} decorative className={className} />;
  }

  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      poster={cldVideoPoster(asset.id)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onError={() => setFailed(true)}
    >
      <source src={cldVideoUrl(asset.id, 'webm')} type="video/webm" />
      <source src={cldVideoUrl(asset.id, 'mp4')} type="video/mp4" />
    </video>
  );
}
