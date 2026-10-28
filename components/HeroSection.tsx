import React from 'react';
import { ArrowDown } from 'lucide-react';
import { INSTITUTIONAL_METRICS } from '../data/academyData';

interface HeroSectionProps {
  onScrollToProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProject,
}) => {
  return (
    <section
      id="top"
      className="relative h-[460px] sm:h-[560px] lg:h-[640px] w-full overflow-hidden bg-[#121e34] select-none"
    >
      {/* Full-Bleed Atmospheric Kit/Pitch Close-Up Photography */}
      <img
        src="/assets/brand/player_strike.png"
        alt="St. Sebastian Sports Academy athlete on pitch"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-55"
      />

      {/* Subtle Iconic Vertical Kit Stripe Shadow Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(102deg, rgba(18,30,52,0.72) 0px, rgba(18,30,52,0.72) 90px, rgba(255,255,255,0.06) 90px, rgba(255,255,255,0.06) 180px)',
        }}
      />

      {/* Cinematic Vignette Matching 1_19a46680.png */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#121e34]/85 via-[#121e34]/50 to-[#1f4b50]/65"
      />

      {/* Left-Aligned Colossal Condensed Title: ACADEMY (Exact match to 1_19a46680.png) */}
      <div className="relative z-10 h-full max-w-[1366px] mx-auto px-5 sm:px-12 lg:px-20 flex items-center">
        <div>
          <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#88b03f] mb-2">
            ST. SEBASTIAN SPORTS ACADEMY
          </div>
          <h1 className="font-display text-[72px] sm:text-[136px] lg:text-[176px] font-semibold uppercase tracking-[0.01em] text-white leading-[0.82]">
            ACADEMY
          </h1>
          {/* Subtle Institutional Metrics Bar */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 border-l-2 border-[#88b03f] pl-3 sm:pl-4">
            {INSTITUTIONAL_METRICS.map((metric) => (
              <div key={metric.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-semibold text-[#fed107] leading-none">
                  {metric.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-Center Stem + Circle Scroll Button (Exact match to 1_19a46680.png) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span
          aria-hidden="true"
          className="w-[1.5px] h-7 bg-white -mb-2.5 pointer-events-none"
        />
        <button
          type="button"
          onClick={onScrollToProject}
          aria-label="Scroll down to The Project"
          className="w-11 h-11 rounded-full border-[1.5px] border-white bg-[#121e34]/40 hover:bg-[#88b03f] hover:border-[#88b03f] text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <ArrowDown className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
};
