'use client';

import { useState } from 'react';
import { CldImage } from '@/components/media/CldImage';
import { CldVideo } from '@/components/media/CldVideo';
import { Dialog } from '@/components/ui/Dialog';
import { PlayIcon } from '@/components/ui/Icons';

/**
 * Full-bleed film band with a centred play button. As it scrolls into view the frame opens from an inset,
 * rounded window to full width (CSS `animation-timeline: view()`, see .film-open in globals.css).
 * Playing opens the film in an accessible modal.
 */
export function FilmBand() {
  const [open, setOpen] = useState(false);

  return (
    <section id="film" aria-label="Watch the film" className="bg-white">
      <div className="film-open relative isolate h-[26rem] overflow-hidden bg-navy-deep sm:h-[34rem] lg:h-[min(76svh,46rem)]">
        <div className="drift absolute -inset-y-[10%] inset-x-0 -z-10">
          <CldImage media="film" decorative sizes="100vw" className="h-full w-full" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/45 via-transparent to-navy-deep/20" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the film"
          className="group absolute left-1/2 top-1/2 flex h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy-deep/45 text-white backdrop-blur-[2px] transition-all duration-300 hover:scale-110 hover:border-green hover:bg-green hover:text-navy sm:h-[5.5rem] sm:w-[5.5rem]"
        >
          <PlayIcon className="ml-1 h-9 w-9" />
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} label="Film: life at St. Sebastian Sports Academy">
        <div className="h-[min(80svh,52rem)] bg-black">
          <CldVideo media="film" controls autoPlay className="h-full w-full" />
        </div>
      </Dialog>
    </section>
  );
}
