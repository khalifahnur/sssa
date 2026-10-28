'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cldVideoPoster, cldVideoSources, resolveSource } from '@/lib/cloudinary';
import { MEDIA, type MediaKey } from '@/data/media';
import { CldImage } from './CldImage';

interface CldVideoProps {
  media: MediaKey;
  className?: string;
  /** Show player controls (for clips people choose to watch) instead of looping silently in the background */
  controls?: boolean;
  /** Start playing as soon as it mounts (used for the film dialog, opened by a click) */
  autoPlay?: boolean;
}

/**
 * Cloudinary video. As a background it loops silently, plays only while on screen, and stays on the
 * poster frame for visitors who prefer reduced motion. Slots that hold an image render that image instead.
 */
export function CldVideo({ media, className = '', controls = false, autoPlay = false }: CldVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const asset = MEDIA[media];
  const source = useMemo(() => (asset.src ? resolveSource(asset.src) : null), [asset.src]);
  const background = !controls;

  useEffect(() => {
    const video = ref.current;
    if (!video || !background) return;
    // React does not reliably emit the `muted` attribute, and iOS refuses to autoplay without it
    video.muted = true;
    video.defaultMuted = true;
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
  }, [background]);

  if (asset.kind !== 'video') {
    return <CldImage media={media} decorative={background} className={className} sizes="100vw" priority={background} />;
  }
  if (!source || failed) {
    // No playable video: show the slot's still image instead (its poster, local fallback or placeholder)
    return <CldImage media={media} decorative={background} className={className} sizes="100vw" priority={background} />;
  }

  const sources = cldVideoSources(source);
  return (
    <video
      ref={ref}
      className={`${controls ? 'object-contain' : 'object-cover'} ${className}`}
      style={asset.focus ? { objectPosition: asset.focus } : undefined}
      poster={cldVideoPoster(source)}
      autoPlay={background || autoPlay}
      muted={background}
      loop={background}
      controls={controls}
      playsInline
      preload={background ? 'auto' : 'metadata'}
      aria-hidden={background || undefined}
      aria-label={background ? undefined : asset.alt}
    >
      {sources.map((s, i) => (
        // `error` fires on the <source>, not the <video>: only give up when the last fallback fails
        <source key={s.src} src={s.src} type={s.type} onError={i === sources.length - 1 ? () => setFailed(true) : undefined} />
      ))}
    </video>
  );
}
