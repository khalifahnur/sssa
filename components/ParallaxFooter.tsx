import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Trophy,
  GraduationCap,
  Users,
  Clock,
} from 'lucide-react';
import { ActiveTabId } from './Header';
import { PageRoute } from './DedicatedPages';
import { AcademyCrest } from './AcademyCrest';
import { generateQrMatrix } from '../utils/academyLogic';

interface ParallaxFooterProps {
  onSelectTab: (tab: ActiveTabId) => void;
  onNavigatePage: (page: PageRoute) => void;
  onOpenTickets: () => void;
  onOpenContactModal: () => void;
  onOpenLocatorModal: () => void;
  onOpenArticle: () => void;
}

export const ParallaxFooter: React.FC<ParallaxFooterProps> = ({
  onNavigatePage,
  onOpenTickets,
  onOpenArticle,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  // revealProgress: 0 when footer top just enters bottom of viewport, 1 when user reaches bottom of page
  const [revealProgress, setRevealProgress] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, normX: 0, normY: 0 });

  useEffect(() => {
    let rafId = 0;
    const updateParallax = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = footerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 900;

        // Calculate how far the footer has entered the viewport:
        // When rect.top === vh -> 0; when rect.bottom <= vh + 20 -> 1
        const travelRange = Math.max(1, rect.height);
        const enteredPx = vh - rect.top;
        const raw = enteredPx / travelRange;
        const clamped = Math.max(0, Math.min(1, raw));
        // Cubic ease-out so elements glide dramatically into place and lock cleanly at 1
        const eased = 1 - Math.pow(1 - clamped, 3);
        setRevealProgress(eased);
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = footerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const normX = (xPct / 100 - 0.5) * 2;
    const normY = (yPct / 100 - 0.5) * 2;
    setMousePos({ x: xPct, y: yPct, normX, normY });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, normX: 0, normY: 0 }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Multi-layer differential parallax offsets (converge to 0 at revealProgress === 1)
  const delta = 1 - revealProgress;
  const heroBgShiftY = Math.round(delta * -140 + mousePos.normY * -14);
  const heroBgScale = (1.04 + delta * 0.14).toFixed(3);
  const floatingBannerY = Math.round(delta * 55 + mousePos.normY * 8);
  const watermarkShiftX = Math.round((0.5 - revealProgress) * 320 + mousePos.normX * -30);
  const watermarkShiftY = Math.round(delta * -50);
  const pitchSvgShiftX = Math.round(mousePos.normX * 22);
  const pitchSvgShiftY = Math.round(delta * 75 + mousePos.normY * 16);

  const appQrMatrix = generateQrMatrix('ST-SEBASTIAN-APP-2026');

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#121e34] text-white select-none"
    >
      {/* 1. SCROLL-ACCELERATED KINETIC BRAND RIBBON */}
      <div className="relative z-20 bg-[#88b03f] text-[#121e34] py-2.5 border-y border-white/20 overflow-hidden">
        <div
          style={{
            transform: `translate3d(${Math.round((0.5 - revealProgress) * 180)}px, 0, 0)`,
            transition: 'transform 120ms linear',
          }}
          className="flex items-center gap-8 whitespace-nowrap font-display text-lg sm:text-xl font-bold uppercase tracking-[0.14em]"
        >
          {[1, 2, 3].map((rep) => (
            <React.Fragment key={rep}>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#121e34] fill-current" />
                ST. SEBASTIAN SPORTS ACADEMY
              </span>
              <span className="text-[#1f4b50]">•</span>
              <span>CHAMPIONS FOR LIFE</span>
              <span className="text-[#1f4b50]">•</span>
              <span>400 STUDENT RESIDENTIAL CAPACITY</span>
              <span className="text-[#1f4b50]">•</span>
              <span>CAMBRIDGE INTERNATIONAL CURRICULUM</span>
              <span className="text-[#1f4b50]">•</span>
              <span>FIFA CONNECT PLAYER PATHWAY</span>
              <span className="text-[#1f4b50]">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 2. DEEP MULTI-LAYER PARALLAX BACKGROUND ENGINE */}
      {/* Layer A: Stadium Night Panorama with Counter-Scroll & Scale Zoom */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${heroBgShiftY}px, 0) scale(${heroBgScale})`,
          transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute -inset-28 z-0"
      >
        <img
          src="/assets/brand/juv_worldcup_stadium.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121e34]/80 via-[#121e34]/92 to-[#0b1322]" />
      </div>

      {/* Layer B: Interactive Mouse-Tracking Ambient Brand Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x.toFixed(1)}% ${mousePos.y.toFixed(
            1
          )}%, rgba(136, 176, 63, 0.16), rgba(31, 75, 80, 0.12) 40%, transparent 75%)`,
        }}
      />

      {/* Layer C: Diagonal Architectural Floodlight Rays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 96px)',
        }}
      />

      {/* Layer D: Counter-Scrolling Tactical Pitch Geometry SVG */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${pitchSvgShiftX}px, ${pitchSvgShiftY}px, 0)`,
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect
            x="70"
            y="50"
            width="1300"
            height="800"
            stroke="#88b03f"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
          <line x1="720" y1="50" x2="720" y2="850" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          <circle cx="720" cy="450" r="145" stroke="#88b03f" strokeWidth="1.5" />
          <circle cx="720" cy="450" r="55" stroke="#fed107" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="720" cy="450" r="5" fill="#fed107" />
          <rect x="70" y="250" width="190" height="400" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          <rect x="1180" y="250" width="190" height="400" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          <path
            d="M260 310 Q 520 210 720 450 T 1180 300"
            stroke="#fed107"
            strokeWidth="1.2"
            strokeDasharray="5 8"
          />
          <path
            d="M260 590 Q 520 690 720 450 T 1180 600"
            stroke="#88b03f"
            strokeWidth="1.2"
            strokeDasharray="5 8"
          />
        </svg>
      </div>

      {/* Layer E: Colossal Kinetic Hollow Parallax Watermark */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${watermarkShiftX}px, ${watermarkShiftY}px, 0)`,
          transition: 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute bottom-16 left-0 right-0 z-0 flex items-center whitespace-nowrap opacity-12"
      >
        <span
          className="font-display text-[120px] sm:text-[185px] lg:text-[240px] font-bold uppercase tracking-[0.04em] leading-none text-transparent"
          style={{
            WebkitTextStroke: '1.5px rgba(136, 176, 63, 0.65)',
          }}
        >
          ST. SEBASTIAN SPORTS ACADEMY · CHAMPIONS FOR LIFE · EXCELLENCE IN EVERY DETAIL ·
        </span>
      </div>

      {/* 3. FOREGROUND ARCHITECTURAL PARALLAX CONTAINER */}
      <div className="relative z-10 w-full max-w-[1366px] mx-auto px-5 sm:px-8 lg:px-10 pt-12 pb-10">
        {/* FLOATING 3D PARALLAX SHOWCASE CARD: CAMPUS & TRIAL ADMISSIONS */}
        <div
          style={{
            transform: `translate3d(0, ${floatingBannerY}px, 0)`,
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative mb-12 border border-white/15 bg-gradient-to-r from-[#1f4b50]/80 via-[#121e34]/90 to-[#1f4b50]/75 backdrop-blur-md p-6 sm:p-9 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#88b03f] via-[#fed107] to-[#E10600]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Crest & Headline */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="p-3.5 bg-[#121e34] border border-[#88b03f]/50 shadow-lg shrink-0">
                <AcademyCrest size={54} variant="reversed" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#fed107] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#88b03f]" />
                  <span>EXCELLENCE IN EVERY DETAIL · EST. 1985</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold uppercase tracking-[0.02em] text-white leading-[0.9]">
                  WHERE ATHLETIC PROWESS MEETS CAMBRIDGE EXCELLENCE
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-xl leading-relaxed">
                  Join 400 residential scholar-athletes aged 11+ across our world-class football
                  pitches, Cambridge International laboratories, and 24/7 pastoral boarding campus.
                </p>
              </div>
            </div>

            {/* Right Interactive Metrics & CTA Buttons */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => onNavigatePage('contact')}
                className="px-6 py-3.5 bg-[#88b03f] hover:bg-[#00a64f] text-[#121e34] hover:text-white font-display text-xl font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>APPLY FOR TRIAL</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('programs-page')}
                className="px-6 py-3.5 border border-white/30 bg-[#121e34]/60 hover:bg-white hover:text-[#121e34] text-white font-display text-xl font-semibold uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                EXPLORE PROGRAMS
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="group px-4 py-3.5 border border-[#fed107]/40 bg-[#121e34]/80 hover:bg-[#fed107] hover:text-[#121e34] text-[#fed107] font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TOP</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4 Quick Institutional Pillar Strip inside the Floating Parallax Dock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 pt-6 border-t border-white/15">
            {[
              { icon: Users, value: '400', label: 'Residential Scholars', accent: '#88b03f' },
              { icon: GraduationCap, value: '11+', label: 'Cambridge Boarding Age', accent: '#fed107' },
              { icon: Clock, value: '24/7', label: 'Pastoral Supervision', accent: '#00a64f' },
              { icon: Trophy, value: '30+', label: 'National Partner Clubs', accent: '#E10600' },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.label}
                  style={{
                    transform: `translate3d(0, ${Math.round(delta * (idx + 1) * 8)}px, 0)`,
                    transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="flex items-center gap-3 p-3 bg-[#121e34]/65 border border-white/10"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center bg-white/5 shrink-0"
                    style={{ color: stat.accent }}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 1: 5 ARCHITECTURAL COLUMNS WITH PROGRESSIVE STAGGERED PARALLAX (Exact match to 8_f725ad8f.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-12">
          {/* Col 1: TICKETS */}
          <div
            style={{
              transform: `translate3d(0, ${Math.round(delta * 20)}px, 0)`,
              transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 hover:border-[#E10600]/60 transition-colors"
          >
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#E10600] inline-block" />
              <span>TICKETS</span>
            </h3>
            <ul className="space-y-2.5 text-[12px] text-neutral-300">
              {['Standard', 'VIP Hospitality', 'Parking', 'Museum & Tour'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={onOpenTickets}
                    className="group flex items-center justify-between w-full hover:text-[#88b03f] transition-colors cursor-pointer text-left"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#88b03f]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: BIANCONERI */}
          <div
            style={{
              transform: `translate3d(0, ${Math.round(delta * 32)}px, 0)`,
              transition: 'transform 190ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 hover:border-[#88b03f]/60 transition-colors"
          >
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#88b03f] inline-block" />
              <span>BIANCONERI</span>
            </h3>
            <ul className="space-y-2.5 text-[12px] text-neutral-300">
              {[
                'Membership',
                'Official Fan Club',
                'St. Sebastian Card',
                'App',
                'Fan Experience',
                'SLO',
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('contact')}
                    className="group flex items-center justify-between w-full hover:text-[#88b03f] transition-colors cursor-pointer text-left"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#88b03f]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: TEAMS */}
          <div
            style={{
              transform: `translate3d(0, ${Math.round(delta * 44)}px, 0)`,
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 hover:border-[#fed107]/60 transition-colors"
          >
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#fed107] inline-block" />
              <span>TEAMS</span>
            </h3>
            <ul className="space-y-2.5 text-[12px] text-neutral-300">
              {[
                'First Team Men',
                'Women',
                'Next Gen',
                'U20 M',
                'U19 W',
                'Youth Men',
                'Youth Women',
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('programs-page')}
                    className="group flex items-center justify-between w-full hover:text-[#fed107] transition-colors cursor-pointer text-left"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#fed107]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: CLUB */}
          <div
            style={{
              transform: `translate3d(0, ${Math.round(delta * 56)}px, 0)`,
              transition: 'transform 210ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 hover:border-[#233e95]/80 transition-colors"
          >
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#233e95] inline-block" />
              <span>CLUB</span>
            </h3>
            <ul className="space-y-2.5 text-[12px] text-neutral-300">
              {[
                'About Us',
                'Places',
                'Corporate Governance',
                'Investor Relations',
                'Press Room',
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('the-project-way')}
                    className="group flex items-center justify-between w-full hover:text-[#88b03f] transition-colors cursor-pointer text-left"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#88b03f]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: ALLIANZ STADIUM */}
          <div
            style={{
              transform: `translate3d(0, ${Math.round(delta * 68)}px, 0)`,
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 hover:border-[#00a64f]/60 transition-colors col-span-2 sm:col-span-1"
          >
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#00a64f] inline-block" />
              <span>ALLIANZ STADIUM</span>
            </h3>
            <ul className="space-y-2.5 text-[12px] text-neutral-300">
              {['Our Home', 'Directions And Access', 'Welcome And Events'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('national-academy')}
                    className="group flex items-center justify-between w-full hover:text-[#00a64f] transition-colors cursor-pointer text-left"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#00a64f]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROW 2: INDENTED 3 COLUMNS + INTERACTIVE OFFICIAL APP QR CARD (Exact match to 8_f725ad8f.png) */}
        <div
          style={{
            transform: `translate3d(0, ${Math.round(delta * 36)}px, 0)`,
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative lg:pl-[6.5%] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          {/* Col A: ACADEMY */}
          <div className="lg:col-span-4 p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 transition-colors">
            <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#88b03f] inline-block" />
              <span>ACADEMY</span>
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-[12px] text-neutral-300">
              {[
                { label: 'National Academy', page: 'national-academy' as PageRoute },
                { label: 'Summer Camp', page: 'programs-page' as PageRoute },
                { label: 'Academy International', page: 'world-cup' as PageRoute },
                { label: 'Academy Residency', page: 'programs-page' as PageRoute },
                { label: 'Training Camp', page: 'programs-page' as PageRoute },
                { label: 'Training Experience', page: 'programs-page' as PageRoute },
                { label: 'Academy World Cup', page: 'world-cup' as PageRoute },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage(item.page)}
                    className="group flex items-center justify-between w-full hover:text-[#88b03f] transition-colors cursor-pointer text-left"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#88b03f]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col B: NEWS & DIRECT CONTACT */}
          <div className="lg:col-span-4 p-4 border border-white/10 bg-[#121e34]/55 hover:bg-[#1f4b50]/35 transition-colors flex flex-col justify-between">
            <div>
              <h3 className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#fed107] inline-block" />
                <span>NEWS</span>
              </h3>
              <ul className="space-y-2.5 text-[12px] text-neutral-300">
                <li>
                  <button
                    type="button"
                    onClick={onOpenArticle}
                    className="group flex items-center justify-between w-full hover:text-[#fed107] transition-colors cursor-pointer text-left"
                  >
                    <span>Articles</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#fed107]" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('national-academy')}
                    className="group flex items-center justify-between w-full hover:text-[#fed107] transition-colors cursor-pointer text-left"
                  >
                    <span>Galleries</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#fed107]" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5 text-[11px] text-white/75">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#88b03f]">
                ADMISSIONS DESK
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E10600]" />
                <span>+1 (919) 323-8933</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#88b03f]" />
                <span>info@sebastian.org</span>
              </div>
            </div>
          </div>

          {/* Col C: SHOP + OFFICIAL APP DIGITAL PASS BADGE */}
          <div className="lg:col-span-4 p-4 border border-white/10 bg-[#121e34]/55 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigatePage('contact')}
                className="font-display text-[25px] font-semibold uppercase tracking-[0.02em] text-white leading-none hover:text-[#88b03f] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span className="w-1.5 h-4 bg-[#E10600] inline-block" />
                <span>SHOP</span>
              </button>
              <span className="px-2 py-0.5 bg-[#88b03f]/20 border border-[#88b03f]/50 font-mono text-[10px] uppercase text-[#88b03f]">
                2026/27 KIT
              </span>
            </div>

            {/* Bottom-Right Official App Badge with Scannable QR Pass (Exact match to 8_f725ad8f.png) */}
            <div className="mt-6 border-b-2 border-[#88b03f] bg-[#1f4b50]/45 p-3.5 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#fed107]">
                  Download:
                </div>
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="text-white hover:text-[#88b03f] font-display text-2xl uppercase tracking-wide transition-colors cursor-pointer text-left leading-none mt-1 block"
                >
                  St. Sebastian Official App
                </button>
                <span className="text-[11px] text-white/65 block mt-1">
                  iOS &amp; Android · Athlete &amp; Parent Portal
                </span>
              </div>

              <svg
                viewBox="0 0 9 9"
                className="w-12 h-12 p-1 bg-white border border-[#88b03f] shrink-0"
                role="img"
                aria-label="St. Sebastian Official App QR Code"
              >
                {appQrMatrix.map((row, rIdx) =>
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
            </div>
          </div>
        </div>

        {/* BOTTOM ARCHITECTURAL STATUS BAR & BRAND COLOUR SPECTRUM */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-white/70">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#88b03f]" />
              <span>&copy; {new Date().getFullYear()} St. Sebastian Sports Academy. All Rights Reserved.</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-white/65">
              <MapPin className="w-3 h-3 text-[#fed107]" />
              <span>800 Park Offices Drive, Suite 3322, Research Triangle Park, NC 27713</span>
            </span>
          </div>

          {/* Official Primary & Secondary Brand Palette Swatch Bar */}
          <div className="flex items-center gap-1.5" aria-label="Official Brand Palette">
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#121e34]" title="Navy Blue #121e34" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#1f4b50]" title="Dark Teal #1f4b50" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#88b03f]" title="Green #88b03f" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#ffffff]" title="White #ffffff" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#E10600]" title="Red #E10600" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#233e95]" title="Royal Blue #233e95" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#fed107]" title="Electric Yellow #fed107" />
            <span className="w-3.5 h-3.5 border border-white/30 bg-[#00a64f]" title="Vibrant Green #00a64f" />
          </div>
        </div>
      </div>
    </footer>
  );
};
