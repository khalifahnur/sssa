"use client";

import React, { useEffect, useState } from 'react';
import {
  ACADEMY_PROGRAMS,
  AcademyProgram,
  BLOG_UPDATES,
  BlogArticle,
  FixtureTicket,
  HighlightClip,
  TRENDING_HIGHLIGHTS,
  UPCOMING_FIXTURES,
} from '@/data/academyData';
import { SubmittedBooking } from '@/utils/academyLogic';
import { ActiveTabId, Header, StickySubNav } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SpiritAndFoundationSection } from '@/components/SpiritAndFoundationSection';
import { ProgramsAndCoachingSection } from '@/components/ProgramsAndCoachingSection';
import { TicketsAndHighlightsSection } from '@/components/TicketsAndHighlightsSection';
import { ReviewsRequestAndBlogSection } from '@/components/ReviewsRequestAndBlogSection';
import { ParallaxFooter } from '@/components/ParallaxFooter';
import { DedicatedPages, PageRoute } from '@/components/DedicatedPages';
import {
  ArticleModal,
  BookingsModal,
  HighlightModal,
  SyllabusModal,
  TicketBookingModal,
} from '@/components/InteractiveModals';

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [activeTab, setActiveTab] = useState<ActiveTabId>('the-project');
  const [fixtures, setFixtures] = useState<FixtureTicket[]>(UPCOMING_FIXTURES);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(ACADEMY_PROGRAMS[0].id);

  // Active modals state
  const [syllabusModalProgram, setSyllabusModalProgram] = useState<AcademyProgram | null>(null);
  const [ticketModalFixture, setTicketModalFixture] = useState<FixtureTicket | null>(null);
  const [activeHighlightClip, setActiveHighlightClip] = useState<HighlightClip | null>(null);
  const [activeBlogArticle, setActiveBlogArticle] = useState<BlogArticle | null>(null);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [locatorModalOpen, setLocatorModalOpen] = useState(false);

  // Confirmed user bookings (Trials + Matchday Passes)
  const [bookings, setBookings] = useState<SubmittedBooking[]>([]);

  // Scroll spy to automatically update the red underline on StickySubNav when on home page
  useEffect(() => {
    if (activePage !== 'home') return;

    const sectionIds: ActiveTabId[] = [
      'the-project',
      'programs',
      'academy-world-cup',
      'national-academy',
    ];

    const handleScroll = () => {
      const scrollCheckY = window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollCheckY) {
            setActiveTab(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const navigateToPage = (page: PageRoute, sectionId?: string) => {
    setActivePage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: ActiveTabId) => {
    setActiveTab(id);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProgramPage = (program: AcademyProgram) => {
    setSelectedProgramId(program.id);
    navigateToPage('programs-page');
  };

  const handleSelectProgramForTrial = (program: AcademyProgram) => {
    setSelectedProgramId(program.id);
    setSyllabusModalProgram(null);
    setContactModalOpen(true);
  };

  const handleConfirmTicketReservation = (
    fixtureId: string,
    quantity: number,
    supporterName: string,
    supporterEmail: string
  ) => {
    const targetFixture = fixtures.find((f) => f.id === fixtureId);
    if (!targetFixture) return;

    setFixtures((prev) =>
      prev.map((f) =>
        f.id === fixtureId
          ? { ...f, seatsRemaining: Math.max(0, f.seatsRemaining - quantity) }
          : f
      )
    );

    const newBooking: SubmittedBooking = {
      id: `bk-${Date.now()}`,
      type: 'ticket',
      title: targetFixture.matchTitle,
      applicantName: supporterName,
      email: supporterEmail,
      referenceCode: `${targetFixture.ticketCode}-Q${quantity}`,
      createdAt: new Date().toISOString(),
      details: `${quantity}x Match Pass(es) · ${targetFixture.dateFormatted} · $${
        targetFixture.price * quantity
      }`,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setBookingsModalOpen(true);
  };

  const handleTrialSubmitted = (submission: {
    fullName: string;
    email: string;
    programTitle: string;
    athleteAge: string;
    message: string;
  }) => {
    const newBooking: SubmittedBooking = {
      id: `tr-${Date.now()}`,
      type: 'trial',
      title: `${submission.programTitle} — Trial Evaluation`,
      applicantName: submission.fullName,
      email: submission.email,
      referenceCode: `TRIAL-${submission.athleteAge}Y-${bookings.length + 101}`,
      createdAt: new Date().toISOString(),
      details: `Age ${submission.athleteAge} · Research Triangle Park Pitch Complex`,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const activeProgramObj =
    ACADEMY_PROGRAMS.find((p) => p.id === selectedProgramId) || ACADEMY_PROGRAMS[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121e34]">
      {/* 1. Top Primary Navy Blue Navigation Bar */}
      <Header
        activeTab={activeTab}
        activePage={activePage}
        onSelectTab={scrollToSection}
        onNavigatePage={(p) => navigateToPage(p)}
        onOpenTickets={() => setTicketModalFixture(fixtures[0])}
        onOpenVideo={() => setActiveHighlightClip(TRENDING_HIGHLIGHTS[2])}
        onOpenContactModal={() => navigateToPage('contact')}
        onOpenLocatorModal={() => navigateToPage('national-academy')}
        onSelectProgram={handleOpenProgramPage}
        bookingsCount={bookings.length}
        onOpenBookingsModal={() => setBookingsModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {activePage === 'home' ? (
          <>
            {/* 2. Full-Bleed "ACADEMY" Hero (1_19a46680.png) */}
            <HeroSection onScrollToProject={() => scrollToSection('the-project')} />

            {/* 3. Sticky White 4-Tab Sub-Navigation Bar (2_a5c6368f.png - 8_f725ad8f.png) */}
            <StickySubNav activeTab={activeTab} onSelectTab={scrollToSection} />

            {/* 4. THE PROJECT + Overlapping Split Cards + Video Banner (2_a5c6368f.png, 2-2_bd5da107.png, 3_9e5c670d.png) */}
            <SpiritAndFoundationSection
              onWatchVideo={() => setActiveHighlightClip(TRENDING_HIGHLIGHTS[2])}
              onNavigatePage={(p) => navigateToPage(p)}
            />

            {/* 5. PROGRAMS Carousel Section (4_2e7be1a4.png & 4-4_2dfd8b8d.png) */}
            <ProgramsAndCoachingSection
              onSelectProgramForTrial={handleSelectProgramForTrial}
              onOpenProgramPage={handleOpenProgramPage}
            />

            {/* 6. ACADEMY WORLD CUP + NATIONAL ACADEMY + Asymmetric Collage + Facilities (5_e18f672e.png, 6_2cf4ac3c.png, 6-6_5f7bd2fe.png) */}
            <TicketsAndHighlightsSection
              fixtures={fixtures}
              onReserveTicket={(fixture) => setTicketModalFixture(fixture)}
              onSelectHighlight={(clip) => setActiveHighlightClip(clip)}
              onNavigatePage={(p) => navigateToPage(p)}
            />

            {/* 7. FIND THE PROGRAM THAT BEST SUITS YOUR NEEDS (7_6cad68dd.png) */}
            <ReviewsRequestAndBlogSection
              selectedProgramId={selectedProgramId}
              onBackToPrograms={() => navigateToPage('programs-page')}
              onNavigatePage={(p) => navigateToPage(p)}
              contactModalOpen={contactModalOpen}
              onSetContactModalOpen={setContactModalOpen}
              locatorModalOpen={locatorModalOpen}
              onSetLocatorModalOpen={setLocatorModalOpen}
              onTrialSubmitted={handleTrialSubmitted}
            />
          </>
        ) : (
          <>
            {/* Sticky Sub-Nav remains accessible on dedicated pages so users can jump anywhere */}
            <StickySubNav activeTab={activeTab} onSelectTab={scrollToSection} />

            <DedicatedPages
              page={activePage}
              selectedProgram={activeProgramObj}
              onSelectProgram={(prog) => setSelectedProgramId(prog.id)}
              onNavigate={navigateToPage}
              fixtures={fixtures}
              onReserveTicket={(fixture) => setTicketModalFixture(fixture)}
              onSelectHighlight={(clip) => setActiveHighlightClip(clip)}
              onTrialSubmitted={handleTrialSubmitted}
            />

            {/* Keep global modals accessible from dedicated pages */}
            <ReviewsRequestAndBlogSection
              selectedProgramId={selectedProgramId}
              onBackToPrograms={() => navigateToPage('programs-page')}
              onNavigatePage={(p) => navigateToPage(p)}
              contactModalOpen={contactModalOpen}
              onSetContactModalOpen={setContactModalOpen}
              locatorModalOpen={locatorModalOpen}
              onSetLocatorModalOpen={setLocatorModalOpen}
              onTrialSubmitted={handleTrialSubmitted}
            />
          </>
        )}
      </main>

      {/* 8. Multi-Column Primary Navy Architectural Footer (8_f725ad8f.png) */}
      <ParallaxFooter
        onSelectTab={scrollToSection}
        onNavigatePage={navigateToPage}
        onOpenTickets={() => setTicketModalFixture(fixtures[0])}
        onOpenContactModal={() => navigateToPage('contact')}
        onOpenLocatorModal={() => navigateToPage('national-academy')}
        onOpenArticle={() => setActiveBlogArticle(BLOG_UPDATES[0])}
      />

      {/* Interactive Modals */}
      <SyllabusModal
        program={syllabusModalProgram}
        onClose={() => setSyllabusModalProgram(null)}
        onApplyForProgram={handleSelectProgramForTrial}
      />

      <TicketBookingModal
        fixture={ticketModalFixture}
        onClose={() => setTicketModalFixture(null)}
        onConfirmReservation={handleConfirmTicketReservation}
      />

      <HighlightModal
        clip={activeHighlightClip}
        onClose={() => setActiveHighlightClip(null)}
      />

      <ArticleModal
        article={activeBlogArticle}
        onClose={() => setActiveBlogArticle(null)}
      />

      <BookingsModal
        isOpen={bookingsModalOpen}
        bookings={bookings}
        onClose={() => setBookingsModalOpen(false)}
      />
    </div>
  );
}
