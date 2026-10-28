import React, { useState } from 'react';
import { ACADEMY_PROGRAMS, AcademyProgram } from '../data/academyData';

interface ProgramsAndCoachingSectionProps {
  onSelectProgramForTrial: (program: AcademyProgram) => void;
  onOpenProgramPage: (program: AcademyProgram) => void;
}

const CAROUSEL_CARDS: {
  id: string;
  displayTitle: string;
  image: string;
  program: AcademyProgram;
}[] = [
  {
    id: 'card-training',
    displayTitle: 'TRAINING EXPERIENCE',
    image: '/assets/brand/juv_prog_training.png',
    program: ACADEMY_PROGRAMS[0],
  },
  {
    id: 'card-resort',
    displayTitle: 'RESORT EXPERIENCE',
    image: '/assets/brand/juv_prog_resort.png',
    program: ACADEMY_PROGRAMS[1],
  },
  {
    id: 'card-summer',
    displayTitle: 'ST. SEBASTIAN SUMMER CAMP EXPERIENCE',
    image: '/assets/brand/youth_kick_clean.jpg',
    program: ACADEMY_PROGRAMS[0],
  },
  {
    id: 'card-residency',
    displayTitle: 'ST. SEBASTIAN RESIDENCY ACADEMY',
    image: '/assets/brand/pdf_img_22.jpg',
    program: ACADEMY_PROGRAMS[2],
  },
  {
    id: 'card-specialist',
    displayTitle: 'SPECIAL 1-TO-1 ELITE EXPERIENCE',
    image: '/assets/brand/scholars_library_clean.jpg',
    program: ACADEMY_PROGRAMS[3],
  },
];

export const ProgramsAndCoachingSection: React.FC<ProgramsAndCoachingSectionProps> = ({
  onOpenProgramPage,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? CAROUSEL_CARDS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev === CAROUSEL_CARDS.length - 1 ? 0 : prev + 1
    );
  };

  const orderedCards = [
    ...CAROUSEL_CARDS.slice(startIndex),
    ...CAROUSEL_CARDS.slice(0, startIndex),
  ];

  return (
    <section
      id="programs"
      className="relative min-h-[540px] sm:min-h-[640px] w-full bg-[#121e34] text-white overflow-hidden flex items-end pt-16 sm:pt-20 pb-10 scroll-mt-28"
    >
      {/* Full-Bleed Darkened Pitch/Athlete Background (Exact match to 4_2e7be1a4.png & 4-4_2dfd8b8d.png) */}
      <img
        src="/assets/brand/youth_match_clean.jpg"
        alt="Academy training background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#121e34]/90 via-[#121e34]/70 to-[#1f4b50]/60"
      />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch justify-between gap-8">
        {/* Left Column: PROGRAMS Title + Custom Extended-Stem Circular Arrows (4-4_2dfd8b8d.png) */}
        <div className="w-full lg:w-[30%] px-5 sm:pl-12 lg:pl-16 sm:pr-6 flex flex-col justify-between min-h-[160px] lg:min-h-[470px]">
          <div className="hidden lg:block" />

          <div>
            <h2 className="font-display text-[56px] sm:text-[76px] font-semibold uppercase tracking-[0.01em] text-white leading-none select-none">
              PROGRAMS
            </h2>
            <p className="mt-2 text-xs text-white/75 max-w-xs">
              Click any program card below to open its full curriculum, boarding schedule, and
              admissions page.
            </p>
          </div>

          {/* Exact Custom Extended-Stem Circle Arrows from 4-4_2dfd8b8d.png */}
          <div className="flex items-center gap-6 pt-5 lg:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous program"
              className="group relative flex items-center cursor-pointer focus:outline-none"
            >
              <svg
                width="68"
                height="48"
                viewBox="0 0 68 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white group-hover:text-[#88b03f] transition-colors"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="17"
                  y1="24"
                  x2="66"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <polyline
                  points="23,19 17,24 23,29"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next program"
              className="group relative flex items-center cursor-pointer focus:outline-none"
            >
              <svg
                width="68"
                height="48"
                viewBox="0 0 68 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white group-hover:text-[#88b03f] transition-colors"
              >
                <circle
                  cx="44"
                  cy="24"
                  r="22.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="24"
                  x2="51"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <polyline
                  points="45,19 51,24 45,29"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Edge-to-Edge Horizontal Portrait Cards (Exact match to 4-4_2dfd8b8d.png) */}
        <div className="w-full lg:w-[70%] overflow-hidden px-4 sm:pl-12 lg:pl-0 sm:pr-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-0.5">
            {orderedCards.slice(0, 3).map((card, idx) => (
              <div
                key={card.id}
                onClick={() => onOpenProgramPage(card.program)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProgramPage(card.program);
                  }
                }}
                className={`${
                  idx < 2 ? 'lg:col-span-5' : 'lg:col-span-2 hidden lg:block'
                } relative h-[360px] sm:h-[470px] overflow-hidden bg-[#121e34] group cursor-pointer select-none`}
              >
                <img
                  src={card.image}
                  alt={card.displayTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#121e34]/90 via-[#121e34]/25 to-transparent"
                />

                <div className="absolute bottom-6 left-6 right-4">
                  <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-[#88b03f] mb-1">
                    {card.program.ageRange}
                  </span>
                  <h3 className="font-display text-[34px] sm:text-[42px] font-semibold uppercase tracking-[0.01em] text-white leading-[0.88] group-hover:text-[#88b03f] transition-colors">
                    {card.displayTitle}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
