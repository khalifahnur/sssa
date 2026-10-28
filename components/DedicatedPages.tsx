import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Play,
  Ticket,
  ShieldCheck,
  BookOpen,
  Trophy,
  HeartPulse,
  Building2,
  Users,
  Clock,
} from 'lucide-react';
import {
  ACADEMY_PROGRAMS,
  AcademyProgram,
  CAMPUS_FACILITIES,
  CORE_ACADEMY_PILLARS,
  FixtureTicket,
  FOUNDATION_PILLARS,
  HighlightClip,
  INSTITUTIONAL_HERO_COPY,
  INSTITUTIONAL_METRICS,
  LEGACY_TIMELINE,
  TRENDING_HIGHLIGHTS,
} from '../data/academyData';
import {
  generateQrMatrix,
  TrialRequestInput,
  validateTrialRequest,
} from '../utils/academyLogic';
import { PitchTacticalPattern, ArchitecturalGridPattern } from './SvgPatterns';

export type PageRoute =
  | 'home'
  | 'the-project-way'
  | 'philosophy'
  | 'programs-page'
  | 'world-cup'
  | 'national-academy'
  | 'contact';

interface DedicatedPagesProps {
  page: Exclude<PageRoute, 'home'>;
  selectedProgram: AcademyProgram;
  onSelectProgram: (program: AcademyProgram) => void;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  fixtures: FixtureTicket[];
  onReserveTicket: (fixture: FixtureTicket) => void;
  onSelectHighlight: (clip: HighlightClip) => void;
  onTrialSubmitted: (submission: {
    fullName: string;
    email: string;
    programTitle: string;
    athleteAge: string;
    message: string;
  }) => void;
}

const PARTNER_HUBS = [
  {
    name: 'St. Sebastian Main Arena & Residency HQ',
    tier: 'Academy Elite · Boarding Campus',
    region: 'Research Triangle Park, NC',
    address: '800 Park Offices Drive, Suite 3322, RTP, NC 27713',
    capacity: '400 Student Capacity · 30 Staff Units · 24/7 Pastoral Care',
  },
  {
    name: 'St. Sebastian Piedmont Elite Hub',
    tier: 'Academy Elite · Regional Center',
    region: 'Charlotte & Piedmont Triad',
    address: '420 Champions Way, Charlotte, NC 28202',
    capacity: 'U11–U19 Technical & Tactical Development',
  },
  {
    name: 'St. Sebastian Atlantic Coastal Center',
    tier: 'Academy National · Partner Hub',
    region: 'Wilmington & East Coast',
    address: '115 Coastal Pitch Blvd, Wilmington, NC 28401',
    capacity: 'Holiday Coaching Camps & Talent ID',
  },
  {
    name: 'St. Sebastian Blue Ridge Summit Base',
    tier: 'Academy National · High-Altitude Camp',
    region: 'Asheville & High Country',
    address: '900 Summit Ridge Road, Asheville, NC 28801',
    capacity: 'Pre-Season Conditioning & Resort Experience',
  },
];

export const DedicatedPages: React.FC<DedicatedPagesProps> = ({
  page,
  selectedProgram,
  onSelectProgram,
  onNavigate,
  fixtures,
  onReserveTicket,
  onSelectHighlight,
  onTrialSubmitted,
}) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const [formState, setFormState] = useState<TrialRequestInput>({
    fullName: '',
    email: '',
    programId: selectedProgram?.id || ACADEMY_PROGRAMS[0].id,
    athleteAge: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TrialRequestInput, string>>
  >({});
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    const validation = validateTrialRequest(formState);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }
    setFormErrors({});
    const chosenProgram =
      ACADEMY_PROGRAMS.find((p) => p.id === formState.programId) ||
      ACADEMY_PROGRAMS[0];

    onTrialSubmitted({
      fullName: formState.fullName.trim(),
      email: formState.email.trim(),
      programTitle: chosenProgram.title,
      athleteAge: formState.athleteAge.trim(),
      message: formState.message.trim(),
    });
    setSubmitSuccess(
      `Trial & Admission request confirmed for ${formState.fullName.trim()} (${chosenProgram.title}). Your digital pass has been added to your Athlete Portal.`
    );
    setFormState({
      fullName: '',
      email: '',
      programId: chosenProgram.id,
      athleteAge: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#121e34]">
      {/* TOP PAGE SUB-HEADER BANNER IN PRIMARY NAVY (#121e34) & DARK TEAL (#1f4b50) */}
      <section className="relative bg-gradient-to-r from-[#121e34] via-[#121e34] to-[#1f4b50] text-white py-10 sm:py-14 border-b-4 border-[#88b03f] overflow-hidden">
        <PitchTacticalPattern className="text-[#88b03f]" opacity={0.1} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#88b03f] text-white hover:text-[#121e34] font-display text-lg uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Academy Home</span>
            </button>

            {/* Quick Page Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'the-project-way' as PageRoute, label: 'The Project & Facilities' },
                { id: 'philosophy' as PageRoute, label: 'Philosophy' },
                { id: 'programs-page' as PageRoute, label: 'All Programs (01–03)' },
                { id: 'world-cup' as PageRoute, label: 'World Cup & Tickets' },
                { id: 'national-academy' as PageRoute, label: 'National Academy' },
                { id: 'contact' as PageRoute, label: 'Admissions & Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 font-display text-base uppercase tracking-wider transition-colors cursor-pointer ${
                    page === item.id
                      ? 'bg-[#88b03f] text-[#121e34] font-bold'
                      : 'bg-white/10 text-white/85 hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-[#fed107] mb-2">
                {INSTITUTIONAL_HERO_COPY.title} · CHAMPIONS FOR LIFE
              </div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold uppercase tracking-[0.01em] text-white leading-[0.88]">
                {page === 'the-project-way' && 'ST. SEBASTIAN WAY & CAMPUS'}
                {page === 'philosophy' && 'EXCELLENCE IN EVERY DETAIL'}
                {page === 'programs-page' && 'ACADEMY PROGRAMS & PATHWAYS'}
                {page === 'world-cup' && 'ACADEMY WORLD CUP & TICKETS'}
                {page === 'national-academy' && 'NATIONAL ACADEMY & FACILITIES'}
                {page === 'contact' && 'ADMISSIONS & TRIAL REGISTRATION'}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed border-l-2 border-[#88b03f] pl-4">
                {INSTITUTIONAL_HERO_COPY.mission}
              </p>
            </div>
          </div>

          {/* 3 Institutional Metrics Bar (400 Student Capacity | 11+ Starting Age | 24/7 Supervision) */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-xl">
            {INSTITUTIONAL_METRICS.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl sm:text-5xl font-bold text-[#88b03f] leading-none tabular-nums">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/80 mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 1: THE PROJECT / ST. SEBASTIAN WAY & FACILITIES */}
      {page === 'the-project-way' && (
        <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 01 Full-Time Academy, 02 Coaching Camps, 03 Player Pathway */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-[#121e34]/15">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1f4b50]">
                  THREE PILLARS OF DEVELOPMENT
                </div>
                <h2 className="font-display text-4xl sm:text-6xl font-semibold uppercase text-[#121e34] leading-none mt-1">
                  01 FULL-TIME ACADEMY · 02 CAMPS · 03 PATHWAY
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-fit px-6 py-2.5 bg-[#E10600] hover:bg-[#121e34] text-white font-display text-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                APPLY FOR ADMISSION
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CORE_ACADEMY_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="border border-[#121e34]/20 bg-white flex flex-col justify-between overflow-hidden shadow-xs"
                >
                  <div>
                    <div className="h-52 relative overflow-hidden bg-[#121e34]">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121e34] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#88b03f] text-[#121e34] font-mono text-sm font-bold">
                        {pillar.number}
                      </span>
                      <h3 className="absolute bottom-4 left-4 right-4 font-display text-3xl sm:text-4xl font-semibold uppercase text-white leading-none">
                        {pillar.title}
                      </h3>
                    </div>

                    <div className="p-6">
                      <p className="text-xs sm:text-sm text-[#1f4b50] font-semibold mb-5">
                        {pillar.subtitle}
                      </p>

                      <div className="space-y-3">
                        {pillar.items.map((item) => (
                          <div
                            key={item.heading}
                            className="p-3 bg-[#121e34]/[0.03] border-l-2 border-[#88b03f]"
                          >
                            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#121e34]">
                              {item.heading}
                            </div>
                            <div className="text-xs text-neutral-600 mt-0.5">
                              {item.detail}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() => onNavigate('programs-page')}
                      className="w-full py-2.5 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-lg uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      EXPLORE {pillar.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FACILITIES: Academic Campus & Residential Life */}
          <section className="bg-[#121e34] text-white p-6 sm:p-12 border-t-4 border-[#1f4b50]">
            <div className="mb-10">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#88b03f]">
                CAMBRIDGE INTERNATIONAL &amp; BOARDING INFRASTRUCTURE
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold uppercase text-white leading-none mt-1">
                FACILITIES — ACADEMIC CAMPUS &amp; RESIDENTIAL LIFE
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[CAMPUS_FACILITIES.academic, CAMPUS_FACILITIES.residential].map((fac) => (
                <div
                  key={fac.category}
                  className="bg-[#1f4b50]/35 border border-white/15 overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={fac.image}
                      alt={fac.category}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121e34] via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-6 font-display text-4xl uppercase text-white">
                      {fac.category}
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {fac.highlights.map((hl) => (
                      <div
                        key={hl.title}
                        className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-b-0"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#88b03f] shrink-0 mt-1" />
                        <div>
                          <div className="font-display text-2xl uppercase text-white leading-none">
                            {hl.title}
                          </div>
                          <div className="text-xs text-white/75 mt-1">
                            {hl.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* PAGE 2: PHILOSOPHY & EXCELLENCE IN EVERY DETAIL */}
      {page === 'philosophy' && (
        <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121e34] text-white p-8 sm:p-12 border-l-8 border-[#88b03f]">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#fed107]">
                RAISING PEOPLE BEFORE FOOTBALLERS
              </div>
              <h2 className="font-display text-5xl sm:text-6xl font-semibold uppercase leading-none">
                {INSTITUTIONAL_HERO_COPY.excellenceTagline}
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {INSTITUTIONAL_HERO_COPY.excellenceCopy}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3.5 px-6 bg-[#88b03f] hover:bg-[#00a64f] text-[#121e34] hover:text-white font-display text-2xl font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                APPLY FOR RESIDENCY TRIAL
              </button>
              <button
                type="button"
                onClick={() => onNavigate('programs-page')}
                className="w-full py-3.5 px-6 border border-white text-white hover:bg-white hover:text-[#121e34] font-display text-2xl font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                VIEW CAMBRIDGE &amp; PITCH SYLLABUS
              </button>
            </div>
          </section>

          {/* 4 Foundation Values */}
          <section>
            <h3 className="font-display text-4xl sm:text-5xl font-semibold uppercase text-[#121e34] mb-6">
              FOUR CORE BRAND VALUES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FOUNDATION_PILLARS.map((val) => (
                <div
                  key={val.id}
                  className="p-6 border border-[#121e34]/20 bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-[#E10600] mb-2">
                      VALUE {val.number}
                    </div>
                    <h4 className="font-display text-3xl uppercase text-[#121e34]">
                      {val.title}
                    </h4>
                    <div className="text-xs font-bold text-[#1f4b50] mb-3">
                      {val.subtitle}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#121e34]/10 font-mono text-[11px] font-bold text-[#88b03f]">
                    {val.metric}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Heritage Timeline */}
          <section>
            <h3 className="font-display text-4xl sm:text-5xl font-semibold uppercase text-[#121e34] mb-6">
              ACADEMY HERITAGE TIMELINE (1979–2026)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LEGACY_TIMELINE.map((item) => (
                <div key={item.year} className="p-5 border border-[#121e34]/15 bg-[#121e34]/[0.02]">
                  <div className="font-display text-4xl font-bold text-[#1f4b50]">
                    {item.year}
                  </div>
                  <div className="font-display text-2xl uppercase text-[#121e34] mt-1">
                    {item.title}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* PAGE 3: DEDICATED PROGRAMS PAGE (01 FULL-TIME ACADEMY, 02 COACHING CAMPS, 03 PLAYER PATHWAY + AGE SYLLABI) */}
      {page === 'programs-page' && (
        <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Selector for 01 Full-Time Academy, 02 Coaching Camps, 03 Player Pathway */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {CORE_ACADEMY_PILLARS.map((pillar, idx) => {
                const isSelected = activePillarIndex === idx;
                return (
                  <button
                    key={pillar.number}
                    type="button"
                    onClick={() => setActivePillarIndex(idx)}
                    className={`p-5 text-left border transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#121e34] text-white border-[#121e34]'
                        : 'bg-white text-[#121e34] border-[#121e34]/20 hover:border-[#88b03f]'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-[#88b03f] block">
                        PILLAR {pillar.number}
                      </span>
                      <span className="font-display text-3xl uppercase leading-none">
                        {pillar.title}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 ${
                        isSelected ? 'text-[#88b03f]' : 'text-[#121e34]/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detailed Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#121e34]/20 bg-white overflow-hidden">
              <div className="lg:col-span-5 h-72 lg:h-auto relative bg-[#121e34]">
                <img
                  src={CORE_ACADEMY_PILLARS[activePillarIndex].image}
                  alt={CORE_ACADEMY_PILLARS[activePillarIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121e34]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-2.5 py-1 bg-[#88b03f] text-[#121e34] font-mono text-xs font-bold">
                    {CORE_ACADEMY_PILLARS[activePillarIndex].number}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl uppercase mt-2 leading-none">
                    {CORE_ACADEMY_PILLARS[activePillarIndex].title}
                  </h3>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#1f4b50] mb-6">
                    {CORE_ACADEMY_PILLARS[activePillarIndex].subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {CORE_ACADEMY_PILLARS[activePillarIndex].items.map((it) => (
                      <div
                        key={it.heading}
                        className="p-4 border border-[#121e34]/15 bg-[#121e34]/[0.02]"
                      >
                        <div className="font-mono text-xs font-bold uppercase text-[#121e34]">
                          {it.heading}
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-700 mt-1">
                          {it.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#121e34]/15">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-8 py-3 bg-[#E10600] hover:bg-[#121e34] text-white font-display text-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    REGISTER FOR {CORE_ACADEMY_PILLARS[activePillarIndex].title}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('the-project-way')}
                    className="px-6 py-3 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    VIEW CAMPUS FACILITIES
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Age-Group & Specialist Tracks */}
          <section>
            <h3 className="font-display text-4xl sm:text-5xl font-semibold uppercase text-[#121e34] mb-6">
              SPECIFIC AGE-GROUP &amp; SPECIALIST SYLLABI
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {ACADEMY_PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => onSelectProgram(prog)}
                  className={`px-4 py-2 font-display text-xl uppercase tracking-wider border transition-colors cursor-pointer ${
                    selectedProgram.id === prog.id
                      ? 'bg-[#1f4b50] text-white border-[#1f4b50]'
                      : 'bg-white text-[#121e34] border-[#121e34]/20 hover:border-[#88b03f]'
                  }`}
                >
                  {prog.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#121e34]/20 bg-white">
              <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden bg-[#121e34]">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase text-[#1f4b50]">
                  <span>{selectedProgram.ageRange}</span>
                  <span>·</span>
                  <span>Coach Ratio {selectedProgram.coachRatio}</span>
                  <span>·</span>
                  <span>{selectedProgram.schedule}</span>
                </div>
                <h4 className="font-display text-4xl sm:text-5xl uppercase text-[#121e34] leading-none">
                  {selectedProgram.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {selectedProgram.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProgram.syllabus.map((mod) => (
                    <div
                      key={mod}
                      className="flex items-start gap-2 text-xs text-[#121e34] font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#88b03f] shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-8 py-3 bg-[#121e34] hover:bg-[#88b03f] text-white hover:text-[#121e34] font-display text-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    APPLY FOR {selectedProgram.title}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PAGE 4: ACADEMY WORLD CUP, FIXTURE TICKETS & HIGHLIGHTS */}
      {page === 'world-cup' && (
        <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section>
            <div className="mb-8">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E10600]">
                INTERNATIONAL TOURNAMENT &amp; MATCHDAY PASSES
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold uppercase text-[#121e34] leading-none mt-1">
                AVAILABLE MATCHDAY &amp; WORLD CUP TICKETS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fixtures.map((fixture) => {
                const matrix = generateQrMatrix(fixture.ticketCode);
                return (
                  <div
                    key={fixture.id}
                    className="border border-[#121e34]/20 bg-white flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative bg-[#121e34]">
                        <img
                          src={fixture.image}
                          alt={fixture.matchTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#121e34]/90 text-[#fed107] font-mono text-xs font-bold">
                          ${fixture.price} / SEAT
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="font-mono text-[11px] text-[#1f4b50] font-bold mb-1">
                          {fixture.dateFormatted} · {fixture.kickoffTime}
                        </div>
                        <h3 className="font-display text-3xl uppercase text-[#121e34] leading-none">
                          {fixture.matchTitle}
                        </h3>
                        <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#88b03f]" />
                          {fixture.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-3 border-t border-dashed border-[#121e34]/20 bg-[#121e34]/[0.02] flex items-center justify-between gap-4">
                      <svg
                        viewBox="0 0 9 9"
                        className="w-12 h-12 p-1 border border-[#121e34]/20 bg-white shrink-0"
                      >
                        {matrix.map((row, rIdx) =>
                          row.map((cell, cIdx) =>
                            cell ? (
                              <rect
                                key={`${rIdx}-${cIdx}`}
                                x={cIdx}
                                y={rIdx}
                                width={0.92}
                                height={0.92}
                                fill="#121e34"
                              />
                            ) : null
                          )
                        )}
                      </svg>
                      <button
                        type="button"
                        onClick={() => onReserveTicket(fixture)}
                        className="flex-1 py-2.5 px-4 bg-[#E10600] hover:bg-[#121e34] text-white font-display text-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>RESERVE ({fixture.seatsRemaining} LEFT)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tactical Video Highlights Archive */}
          <section>
            <h3 className="font-display text-4xl sm:text-5xl font-semibold uppercase text-[#121e34] mb-6">
              TACTICAL VIDEO HIGHLIGHTS ARCHIVE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRENDING_HIGHLIGHTS.map((clip) => (
                <div
                  key={clip.id}
                  onClick={() => onSelectHighlight(clip)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectHighlight(clip);
                    }
                  }}
                  className="border border-[#121e34]/20 bg-white overflow-hidden group cursor-pointer"
                >
                  <div className="h-48 relative overflow-hidden bg-[#121e34]">
                    <img
                      src={clip.image}
                      alt={clip.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-[#E10600] text-white flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#121e34] text-white font-mono text-[10px]">
                      {clip.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[10px] text-[#1f4b50] font-bold">
                      {clip.category} · {clip.date}
                    </div>
                    <h4 className="font-display text-2xl uppercase text-[#121e34] group-hover:text-[#88b03f] mt-1">
                      {clip.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* PAGE 5: NATIONAL ACADEMY & CAMPUS LOCATOR */}
      {page === 'national-academy' && (
        <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section>
            <div className="mb-8">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1f4b50]">
                30 PARTNER CLUBS · 20 ACADEMY ELITE · 10 ACADEMY NATIONAL
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold uppercase text-[#121e34] leading-none mt-1">
                NATIONAL ACADEMY HUBS &amp; BOARDING CENTERS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNER_HUBS.map((hub) => (
                <div
                  key={hub.name}
                  className="p-6 border border-[#121e34]/20 bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-bold uppercase text-[#88b03f]">
                      {hub.tier}
                    </div>
                    <h3 className="font-display text-3xl uppercase text-[#121e34] mt-1">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-[#E10600] shrink-0 mt-0.5" />
                      <span>
                        {hub.address} ({hub.region})
                      </span>
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#121e34]/10 flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] font-semibold text-[#1f4b50]">
                      {hub.capacity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-1.5 bg-[#121e34] hover:bg-[#88b03f] text-white hover:text-[#121e34] font-display text-base uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      BOOK TRIAL HERE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Full Facilities Breakdown */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[CAMPUS_FACILITIES.academic, CAMPUS_FACILITIES.residential].map((fac) => (
              <div key={fac.category} className="border border-[#121e34]/20 p-6 sm:p-8 bg-white">
                <div className="font-mono text-xs font-bold uppercase text-[#1f4b50]">
                  ST. SEBASTIAN INFRASTRUCTURE
                </div>
                <h3 className="font-display text-4xl uppercase text-[#121e34] mb-4">
                  {fac.category}
                </h3>
                <div className="space-y-4">
                  {fac.highlights.map((hl) => (
                    <div key={hl.title} className="p-4 bg-[#121e34]/[0.03] border-l-4 border-[#88b03f]">
                      <div className="font-display text-2xl uppercase text-[#121e34]">
                        {hl.title}
                      </div>
                      <div className="text-xs text-neutral-600 mt-0.5">
                        {hl.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {/* PAGE 6: CONTACT US & ADMISSIONS REGISTRATION DESK */}
      {page === 'contact' && (
        <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#121e34]/25 bg-white p-6 sm:p-12 shadow-sm">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E10600] mb-1">
              DIRECT ADMISSIONS &amp; TRIAL REGISTRATION
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-semibold uppercase text-[#121e34] leading-none mb-3">
              APPLY FOR TRIAL OR FULL-TIME BOARDING
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mb-8">
              Complete the form below to schedule a player evaluation for our 01 Full-Time Academy
              (Ages 11+, 400-student residential campus), 02 Coaching Camps, or 03 Player Pathway.
            </p>

            {submitSuccess && (
              <div
                role="status"
                className="mb-6 p-4 bg-[#88b03f]/15 border border-[#88b03f] text-[#121e34] text-xs sm:text-sm flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#88b03f] shrink-0 mt-0.5" />
                <span>{submitSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="page-fullname"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#121e34] mb-1"
                >
                  STUDENT-ATHLETE FULL NAME <span className="text-[#E10600]">*</span>
                </label>
                <input
                  id="page-fullname"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, fullName: e.target.value }))
                  }
                  placeholder="E.G. MELSON D. DOWSON"
                  className="w-full px-4 py-3 border border-[#121e34]/30 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-[#E10600] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="page-email"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#121e34] mb-1"
                  >
                    PARENT / ATHLETE EMAIL <span className="text-[#E10600]">*</span>
                  </label>
                  <input
                    id="page-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="INFO@SEBASTIAN.ORG"
                    className="w-full px-4 py-3 border border-[#121e34]/30 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-[#E10600] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="page-age"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#121e34] mb-1"
                  >
                    ATHLETE AGE (11+) <span className="text-[#E10600]">*</span>
                  </label>
                  <input
                    id="page-age"
                    type="number"
                    min={6}
                    max={23}
                    value={formState.athleteAge}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, athleteAge: e.target.value }))
                    }
                    placeholder="14"
                    className="w-full px-4 py-3 border border-[#121e34]/30 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34] tabular-nums"
                  />
                  {formErrors.athleteAge && (
                    <p className="mt-1 text-xs text-[#E10600] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.athleteAge}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="page-program"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#121e34] mb-1"
                >
                  SELECT ACADEMY PATHWAY <span className="text-[#E10600]">*</span>
                </label>
                <select
                  id="page-program"
                  value={formState.programId}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, programId: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-[#121e34]/30 text-sm text-[#121e34] bg-white focus:outline-none focus:border-[#121e34]"
                >
                  {ACADEMY_PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.title} ({prog.ageRange})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="page-message"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#121e34] mb-1"
                >
                  PLAYING POSITION &amp; BOARDING NOTES <span className="text-[#E10600]">*</span>
                </label>
                <textarea
                  id="page-message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder="PREFERRED POSITION, CAMBRIDGE GRADE LEVEL, OR RESIDENTIAL INQUIRY..."
                  className="w-full px-4 py-3 border border-[#121e34]/30 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-[#E10600] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#121e34] hover:bg-[#88b03f] text-white hover:text-[#121e34] font-display text-2xl font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                SUBMIT OFFICIAL APPLICATION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
