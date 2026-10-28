import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Search, HelpCircle, User, ArrowRight } from 'lucide-react';
import { AcademyCrest } from './AcademyCrest';
import { ACADEMY_PROGRAMS, AcademyProgram } from '../data/academyData';
import { PageRoute } from './DedicatedPages';

export type ActiveTabId =
  | 'the-project'
  | 'programs'
  | 'academy-world-cup'
  | 'national-academy';

export const SUB_NAV_TABS: { id: ActiveTabId; label: string; page: PageRoute }[] = [
  { id: 'the-project', label: 'THE PROJECT', page: 'the-project-way' },
  { id: 'programs', label: 'PROGRAMS', page: 'programs-page' },
  { id: 'academy-world-cup', label: 'ACADEMY WORLD CUP', page: 'world-cup' },
  { id: 'national-academy', label: 'NATIONAL ACADEMY', page: 'national-academy' },
];

interface HeaderProps {
  activeTab: ActiveTabId;
  activePage: PageRoute;
  onSelectTab: (tab: ActiveTabId) => void;
  onNavigatePage: (page: PageRoute) => void;
  onOpenTickets: () => void;
  onOpenVideo: () => void;
  onOpenContactModal?: () => void;
  onOpenLocatorModal?: () => void;
  onSelectProgram: (program: AcademyProgram) => void;
  bookingsCount: number;
  onOpenBookingsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigatePage,
  onOpenVideo,
  onSelectProgram,
  bookingsCount,
  onOpenBookingsModal,
}) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuDrawerOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredPrograms = ACADEMY_PROGRAMS.filter(
    (p) =>
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ageRange.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* TOP FIXED PRIMARY NAVY BAR (#121e34) — Always fixed at top: 0 */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-[#121e34] text-white border-b border-white/15 shadow-[0_4px_20px_rgba(18,30,52,0.35)]">
        <div className="h-full w-full flex items-center justify-between pr-3 sm:pr-8 relative">
          {/* Left Zone: Square Hamburger Button + Condensed Uppercase Links */}
          <div className="flex items-center h-full">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setMenuDrawerOpen((prev) => !prev);
              }}
              aria-label={menuDrawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuDrawerOpen}
              className="w-14 sm:w-16 h-16 border-r border-white/20 flex items-center justify-center text-white bg-[#1f4b50]/60 hover:bg-[#1f4b50] transition-colors cursor-pointer shrink-0"
            >
              {menuDrawerOpen ? (
                <X className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.75]" />
              )}
            </button>

            <nav
              aria-label="Top Club Navigation"
              className="hidden md:flex items-center gap-6 pl-6 font-display text-[21px] font-medium tracking-[0.04em] uppercase"
            >
              <button
                type="button"
                onClick={() => onNavigatePage('world-cup')}
                className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer whitespace-nowrap"
              >
                TICKETS
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('programs-page')}
                className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer whitespace-nowrap"
              >
                PROGRAMS
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('the-project-way')}
                className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer whitespace-nowrap"
              >
                FACILITIES
              </button>
              <button
                type="button"
                onClick={onOpenVideo}
                className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer whitespace-nowrap"
              >
                VIDEO
              </button>
            </nav>
          </div>

          {/* Center Zone: Centered Crest Emblem */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="St. Sebastian Sports Academy Home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center group"
          >
            <AcademyCrest
              size={38}
              variant="reversed"
              className="group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Right Zone: Search, Help/Locator, Profile/Passes Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => {
                setMenuDrawerOpen(false);
                setSearchOpen((prev) => !prev);
              }}
              aria-label="Search Academy Programs"
              className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer p-1.5"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigatePage('national-academy')}
              aria-label="Academy Locator & Facilities"
              className="text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer p-1.5"
            >
              <HelpCircle className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (bookingsCount > 0) {
                  onOpenBookingsModal();
                } else {
                  onNavigatePage('contact');
                }
              }}
              aria-label="Athlete Portal & Confirmed Passes"
              className="relative text-white/90 hover:text-[#88b03f] transition-colors cursor-pointer p-1.5 flex items-center gap-1.5"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
              {bookingsCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#E10600] text-white rounded-full leading-none">
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed top 64px header */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* SLIDE-DOWN SEARCH PANEL */}
      {searchOpen && (
        <div className="fixed inset-x-0 top-16 z-50 bg-[#121e34]/98 text-white border-b border-white/15 p-4 sm:p-10 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/20">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#88b03f] shrink-0" />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH PROGRAMS, CAMBRIDGE ACADEMICS, OR RESIDENCY..."
                  className="w-full bg-transparent font-display text-xl sm:text-3xl uppercase tracking-wide text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {filteredPrograms.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    onSelectProgram(prog);
                    onNavigatePage('programs-page');
                  }}
                  className="p-4 border border-white/15 hover:border-[#88b03f] text-left transition-colors group cursor-pointer bg-[#1f4b50]/30"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#88b03f]">
                    {prog.ageRange}
                  </div>
                  <div className="font-display text-2xl uppercase text-white group-hover:text-[#88b03f] mt-0.5">
                    {prog.title}
                  </div>
                  <div className="text-xs text-white/75 line-clamp-2 mt-1">
                    {prog.summary}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL NAVIGATION DRAWER (Opened via Top-Left Hamburger Icon) */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-[#121e34] text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 sm:px-12 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            <div className="md:col-span-6 space-y-5 border-b md:border-b-0 md:border-r border-white/15 pb-8 md:pb-0 md:pr-10">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#88b03f]">
                ST. SEBASTIAN SPORTS ACADEMY · PAGES
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'HOME OVERVIEW', page: 'home' as PageRoute },
                  { label: 'THE PROJECT & FACILITIES', page: 'the-project-way' as PageRoute },
                  { label: 'OUR PHILOSOPHY', page: 'philosophy' as PageRoute },
                  { label: 'PROGRAMS (01–03 PATHWAYS)', page: 'programs-page' as PageRoute },
                  { label: 'ACADEMY WORLD CUP & TICKETS', page: 'world-cup' as PageRoute },
                  { label: 'NATIONAL ACADEMY & LOCATOR', page: 'national-academy' as PageRoute },
                  { label: 'ADMISSIONS & CONTACT US', page: 'contact' as PageRoute },
                ].map((item) => (
                  <li key={item.page}>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuDrawerOpen(false);
                        onNavigatePage(item.page);
                      }}
                      className="font-display text-3xl sm:text-5xl font-semibold uppercase tracking-wide text-white hover:text-[#88b03f] transition-colors flex items-center gap-3 cursor-pointer text-left"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-5 h-5 text-[#E10600] shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="font-display text-2xl uppercase text-[#88b03f]">
                  RESIDENTIAL &amp; CAMBRIDGE CAMPUS
                </div>
                <ul className="space-y-2.5 text-sm text-white/80">
                  <li>400 Student Boarding Capacity</li>
                  <li>11+ Starting Age · 24/7 Pastoral Care</li>
                  <li>Cambridge International Curriculum</li>
                  <li>FIFA Connect System Integration</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-display text-2xl uppercase text-[#88b03f]">
                  HEADQUARTERS
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  800 Park Offices Drive, Suite 3322
                  <br />
                  Research Triangle Park, NC 27713
                  <br />
                  +1 (919) 323-8933 · info@sebastian.org
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMenuDrawerOpen(false);
                    onNavigatePage('contact');
                  }}
                  className="mt-2 inline-block px-6 py-2.5 bg-[#88b03f] text-[#121e34] hover:bg-[#00a64f] hover:text-white font-display text-xl font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  REGISTER FOR TRIAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * SECOND HEADER: WHITE 4-TAB SUB-NAVIGATION BAR
 * Sits directly below the Hero on initial load, and automatically locks as `fixed top-16`
 * right below the main header as soon as the user scrolls to it.
 */
export const StickySubNav: React.FC<{
  activeTab: ActiveTabId;
  onSelectTab: (tab: ActiveTabId) => void;
}> = ({ activeTab, onSelectTab }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      const el = sentinelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 64px is the height of the fixed top header (h-16)
      setIsPinned(rect.top <= 64);
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  return (
    <div ref={sentinelRef} className="relative w-full h-13 sm:h-14 z-40">
      <div
        className={`${
          isPinned
            ? 'fixed top-16 left-0 right-0 z-40 shadow-[0_10px_28px_rgba(18,30,52,0.14)]'
            : 'relative'
        } w-full bg-[#ffffff] border-b border-[#121e34]/15 h-13 sm:h-14 transition-shadow duration-200`}
      >
        <div className="max-w-5xl mx-auto h-full px-3 sm:px-6 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar">
          <nav
            aria-label="Academy Section Navigation"
            className="flex items-center gap-4 sm:gap-10 h-full min-w-max"
          >
            {SUB_NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`h-full px-2 sm:px-4 inline-flex items-center justify-center font-display text-[18px] sm:text-[23px] font-semibold uppercase tracking-[0.03em] transition-colors whitespace-nowrap cursor-pointer border-b-[3px] ${
                    isActive
                      ? 'border-[#E10600] text-[#121e34]'
                      : 'border-transparent text-[#121e34]/80 hover:text-[#1f4b50]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
