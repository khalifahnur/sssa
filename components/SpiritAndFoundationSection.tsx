import React from 'react';
import { Play } from 'lucide-react';
import {
  CORE_ACADEMY_PILLARS,
  INSTITUTIONAL_HERO_COPY,
  INSTITUTIONAL_METRICS,
} from '../data/academyData';
import { ScrollReveal } from './AnimatedText';
import { PageRoute } from './DedicatedPages';

interface SpiritAndFoundationSectionProps {
  onWatchVideo: () => void;
  onNavigatePage: (page: PageRoute) => void;
}

export const SpiritAndFoundationSection: React.FC<SpiritAndFoundationSectionProps> = ({
  onWatchVideo,
  onNavigatePage,
}) => {
  return (
    <section id="the-project" className="bg-white scroll-mt-28">
      {/* 1. "THE PROJECT" FULL-WIDTH BANNER (Exact match to 2_a5c6368f.png) */}
      <div className="relative h-[400px] sm:h-[520px] lg:h-[560px] w-full overflow-hidden bg-[#121e34]">
        <img
          src="/assets/brand/scholars_campus_clean.jpg"
          alt="St. Sebastian Sports Academy scholars and young athletes"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#121e34]/75 via-[#121e34]/45 to-[#121e34]/85"
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pb-12 text-center">
          <h2 className="font-display text-[68px] sm:text-[124px] lg:text-[148px] font-semibold uppercase tracking-[0.01em] text-white leading-none select-none">
            THE PROJECT
          </h2>
          <p className="mt-3 max-w-2xl text-xs sm:text-sm text-white/85 leading-relaxed px-2">
            {INSTITUTIONAL_HERO_COPY.mission}
          </p>
        </div>
      </div>

      {/* 2. OVERLAPPING SPLIT DUAL CARDS: ST. SEBASTIAN WAY & PHILOSOPHY (Exact match to 2-2_bd5da107.png) */}
      <div className="relative z-20 -mt-24 sm:-mt-40 max-w-[960px] mx-auto px-4 sm:px-6">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 shadow-[0_22px_55px_rgba(18,30,52,0.16)]">
          {/* Left White Card */}
          <div className="bg-white text-[#121e34] p-8 sm:p-14 flex flex-col justify-between min-h-[300px] sm:min-h-[330px] border border-neutral-100">
            <div>
              <h3 className="font-display text-[42px] sm:text-[54px] font-semibold uppercase tracking-[0.01em] text-[#121e34] leading-[0.88] mb-5">
                ST. SEBASTIAN WAY
              </h3>
              <p className="text-[14px] sm:text-[15px] text-neutral-800 leading-[1.75] max-w-sm">
                The training of the athlete through the care of technical, mental, emotional and
                relational aspects, accredited Cambridge academics, and comprehensive wellness.
              </p>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onNavigatePage('the-project-way')}
                className="w-full sm:w-[205px] py-3 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors text-center cursor-pointer"
              >
                DISCOVER MORE
              </button>
            </div>
          </div>

          {/* Right Primary Navy Card */}
          <div className="bg-[#121e34] text-white p-8 sm:p-14 flex flex-col justify-between min-h-[300px] sm:min-h-[330px]">
            <div>
              <h3 className="font-display text-[42px] sm:text-[54px] font-semibold uppercase tracking-[0.01em] text-white leading-[0.88] mb-5">
                PHILOSOPHY
              </h3>
              <p className="text-[14px] sm:text-[15px] text-neutral-200 leading-[1.75] max-w-sm">
                Raising people before footballers. Where athletic prowess meets academic
                achievement, creating tomorrow&rsquo;s leaders through discipline and innovation.
              </p>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={() => onNavigatePage('philosophy')}
                className="w-full sm:w-[205px] py-3 bg-white text-[#121e34] hover:bg-[#88b03f] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors text-center cursor-pointer"
              >
                DISCOVER MORE
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* INSTITUTIONAL METRICS & 01 / 02 / 03 ARCHITECTURE OVERVIEW STRIP */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 border-y border-neutral-200 py-6 mb-10 text-center">
            {INSTITUTIONAL_METRICS.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl sm:text-5xl font-semibold text-[#121e34] leading-none">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#1f4b50] mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CORE_ACADEMY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="border border-neutral-200 p-6 bg-white hover:border-[#1f4b50] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-4xl font-semibold text-[#88b03f] leading-none">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1f4b50]">
                      ST. SEBASTIAN PILLAR
                    </span>
                  </div>
                  <h4 className="font-display text-3xl font-semibold uppercase text-[#121e34] leading-none mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {pillar.subtitle}
                  </p>
                  <ul className="space-y-2 border-t border-neutral-100 pt-3">
                    {pillar.items.map((item) => (
                      <li key={item.heading} className="text-xs">
                        <span className="font-mono font-bold text-[#121e34] uppercase mr-1.5">
                          {item.heading}:
                        </span>
                        <span className="text-neutral-600">{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigatePage('the-project-way')}
                  className="mt-5 pt-3 border-t border-neutral-100 text-left font-display text-base uppercase tracking-wider text-[#1f4b50] hover:text-[#E10600] transition-colors cursor-pointer"
                >
                  EXPLORE {pillar.title} &rarr;
                </button>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* 3. FULL-WIDTH VIDEO SHOWCASE BANNER (Exact match to 3_9e5c670d.png) */}
      <div className="mt-12 sm:mt-16 relative h-[320px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden bg-[#121e34]">
        <img
          src="/assets/brand/juv_video_hug.png"
          alt="Academy coach embracing young footballers on the pitch"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Bottom-Center Circular Outline Play Button (Exact match to 3_9e5c670d.png) */}
        <button
          type="button"
          onClick={onWatchVideo}
          aria-label="Play Academy Project Video"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] rounded-full border-[1.75px] border-white bg-[#121e34]/45 hover:bg-[#E10600] hover:border-[#E10600] text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75] ml-1" />
        </button>
      </div>
    </section>
  );
};
