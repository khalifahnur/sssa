import React from 'react';
import {
  CAMPUS_FACILITIES,
  FixtureTicket,
  HighlightClip,
  INSTITUTIONAL_HERO_COPY,
} from '../data/academyData';
import { ScrollReveal } from './AnimatedText';
import { PageRoute } from './DedicatedPages';

interface TicketsAndHighlightsSectionProps {
  fixtures: FixtureTicket[];
  onReserveTicket: (fixture: FixtureTicket) => void;
  onSelectHighlight: (clip: HighlightClip) => void;
  onNavigatePage: (page: PageRoute) => void;
}

export const TicketsAndHighlightsSection: React.FC<TicketsAndHighlightsSectionProps> = ({
  onNavigatePage,
}) => {
  return (
    <div className="bg-white">
      {/* SECTION 1: ACADEMY WORLD CUP (Exact match to 5_e18f672e.png) */}
      <section
        id="academy-world-cup"
        className="pt-14 sm:pt-20 pb-4 bg-white scroll-mt-28 overflow-hidden"
      >
        <ScrollReveal className="max-w-[700px] mx-auto px-5 sm:px-6">
          <h2 className="font-display text-[48px] sm:text-[68px] font-semibold uppercase tracking-[0.01em] text-[#121e34] leading-[0.88] mb-5">
            ACADEMY WORLD CUP
          </h2>

          <p className="text-[14px] sm:text-[15px] text-neutral-800 leading-[1.85] mb-8">
            St. Sebastian Academy World Cup has become the most important event of the St.
            Sebastian Academy project. To date, the tournament has been organized on five
            occasions, in 2018, 2019, 2022, 2023 and 2024, allowing thousands of people from all
            over the world to be in the capital for a unique experience.
          </p>

          <button
            type="button"
            onClick={() => onNavigatePage('world-cup')}
            className="w-full sm:w-[195px] py-3 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors text-center cursor-pointer"
          >
            DISCOVER MORE
          </button>
        </ScrollReveal>

        {/* Offset Right Stadium Panorama (Exact match to 5_e18f672e.png) */}
        <div className="mt-6 sm:mt-8 max-w-[1340px] mx-auto px-4 sm:px-6 flex justify-end">
          <div className="w-full lg:w-[76%] h-[200px] sm:h-[290px] overflow-hidden bg-[#121e34]">
            <img
              src="/assets/brand/juv_worldcup_stadium.png"
              alt="Academy World Cup Stadium Roof and Stands Panorama"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: NATIONAL ACADEMY + STEPPED ASYMMETRIC PHOTO COLLAGE (Exact match to 6_2cf4ac3c.png & 6-6_5f7bd2fe.png) */}
      <section
        id="national-academy"
        className="pt-14 sm:pt-20 pb-12 bg-white scroll-mt-28"
      >
        <ScrollReveal className="max-w-[700px] mx-auto px-5 sm:px-6 mb-10">
          <h2 className="font-display text-[48px] sm:text-[68px] font-semibold uppercase tracking-[0.01em] text-[#121e34] leading-[0.88] mb-5">
            NATIONAL ACADEMY
          </h2>

          <p className="text-[14px] sm:text-[15px] text-neutral-800 leading-[1.85] mb-8">
            Growing up while having fun on a football field. Training according to St.
            Sebastian&rsquo;s methodologies, techniques and more. To have training and meetings
            with partner Academies across the region and the whole country. All this, and much
            more, is the St. Sebastian Academy project, which counts on the collaboration,
            enthusiasm and work of thirty clubs, 20 in Academy Elite and 10 in Academy National.
          </p>

          <button
            type="button"
            onClick={() => onNavigatePage('national-academy')}
            className="w-full sm:w-[195px] py-3 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors text-center cursor-pointer"
          >
            DISCOVER MORE
          </button>
        </ScrollReveal>

        {/* ASYMMETRIC STEPPED PHOTO COLLAGE MOSAIC (Exact match to 6-6_5f7bd2fe.png) */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          {/* Top Row: Left Small Huddle aligned to bottom + Right Large Celebration Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 items-end">
            <div className="lg:col-span-3 h-[200px] sm:h-[215px] overflow-hidden bg-neutral-200">
              <img
                src="/assets/brand/juv_collage_huddle.png"
                alt="Youth academy squad pre-match huddle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-9 h-[260px] sm:h-[420px] overflow-hidden bg-neutral-200">
              <img
                src="/assets/brand/juv_collage_hero.png"
                alt="Young academy footballers celebrating on pitch"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Bottom Row: 3 Equal 3-Col Blocks + 3-Col Negative Space on Right (Exact match to 6-6_5f7bd2fe.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-1 mt-1">
            <div className="lg:col-span-3 h-[195px] overflow-hidden bg-neutral-200">
              <img
                src="/assets/brand/youth_match_clean.jpg"
                alt="Academy youth training circle on pitch"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-3 h-[195px] overflow-hidden bg-[#121e34]">
              <img
                src="/assets/brand/scholars_campus_clean.jpg"
                alt="Academy scholars under stadium lights"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Light Gray Box with Inner Dotted Frame (Exact match to bottom-right of 6-6_5f7bd2fe.png) */}
            <div className="lg:col-span-3 h-[195px] bg-[#eceeef] p-3.5 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onNavigatePage('national-academy')}
                className="w-full h-full border border-dotted border-[#1f4b50] flex flex-col items-center justify-center p-4 text-center hover:bg-white transition-colors cursor-pointer group"
              >
                <span className="font-display text-2xl uppercase tracking-wider text-[#121e34] group-hover:text-[#88b03f]">
                  30+ PARTNER CLUBS
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#1f4b50] mt-1">
                  EXPLORE NATIONAL NETWORK
                </span>
              </button>
            </div>

            <div className="hidden lg:block lg:col-span-3 bg-white" />
          </div>
        </div>

        {/* CAMPUS FACILITIES & EXCELLENCE IN EVERY DETAIL SHOWCASE */}
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-14 sm:pt-18">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-neutral-200 p-6 sm:p-8 bg-neutral-50">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1f4b50] mb-1">
                  FACILITIES · CAMBRIDGE INTERNATIONAL STANDARDS
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold uppercase text-[#121e34] leading-none mb-4">
                  {CAMPUS_FACILITIES.academic.category}
                </h3>
                <div className="space-y-3">
                  {CAMPUS_FACILITIES.academic.highlights.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-2 border-[#88b03f] pl-3 py-0.5"
                    >
                      <div className="font-display text-xl uppercase text-[#121e34] leading-none">
                        {item.title}
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-neutral-200 p-6 sm:p-8 bg-[#121e34] text-white">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#88b03f] mb-1">
                  FACILITIES · BOARDING &amp; PASTORAL CARE
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold uppercase text-white leading-none mb-4">
                  {CAMPUS_FACILITIES.residential.category}
                </h3>
                <div className="space-y-3">
                  {CAMPUS_FACILITIES.residential.highlights.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-2 border-[#fed107] pl-3 py-0.5"
                    >
                      <div className="font-display text-xl uppercase text-white leading-none">
                        {item.title}
                      </div>
                      <p className="text-xs text-white/75 mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#1f4b50] text-white p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#fed107] mb-1">
                  ST. SEBASTIAN CHARTER
                </div>
                <h4 className="font-display text-3xl sm:text-4xl font-semibold uppercase leading-none mb-2">
                  {INSTITUTIONAL_HERO_COPY.excellenceTagline}
                </h4>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {INSTITUTIONAL_HERO_COPY.excellenceCopy}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('philosophy')}
                className="w-full md:w-auto px-7 py-3 bg-[#88b03f] hover:bg-[#00a64f] text-white font-display text-xl uppercase tracking-wider transition-colors text-center shrink-0 cursor-pointer"
              >
                READ OUR PHILOSOPHY
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
