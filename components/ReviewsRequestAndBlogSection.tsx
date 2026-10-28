import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  MapPin,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import {
  ACADEMY_PROGRAMS,
} from '../data/academyData';
import {
  TrialRequestInput,
  validateTrialRequest,
} from '../utils/academyLogic';
import { ScrollReveal } from './AnimatedText';
import { PageRoute } from './DedicatedPages';

interface ReviewsRequestAndBlogSectionProps {
  selectedProgramId: string;
  onBackToPrograms: () => void;
  onNavigatePage: (page: PageRoute) => void;
  contactModalOpen: boolean;
  onSetContactModalOpen: (open: boolean) => void;
  locatorModalOpen: boolean;
  onSetLocatorModalOpen: (open: boolean) => void;
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
    region: 'Research Triangle Park, NC (Academy Elite)',
    address: '800 Park Offices Drive, Suite 3322, RTP, NC 27713',
    programs: 'U8–U21 Full-Time Scholar Residency & Elite Pathway',
  },
  {
    name: 'St. Sebastian Academy Piedmont Hub',
    region: 'Charlotte & Piedmont Triad (Academy Elite)',
    address: '420 Champions Way, Charlotte, NC 28202',
    programs: 'U8–U16 Youth Foundation & Summer Camp Experience',
  },
  {
    name: 'St. Sebastian Atlantic Coastal Center',
    region: 'Wilmington & East Coast (Academy National)',
    address: '115 Coastal Pitch Blvd, Wilmington, NC 28401',
    programs: 'Seasonal Training Camps & Regional Showcases',
  },
  {
    name: 'St. Sebastian Blue Ridge Training Base',
    region: 'Asheville & High Country (Academy National)',
    address: '900 Summit Ridge Road, Asheville, NC 28801',
    programs: 'Resort Experience & High-Altitude Pre-Season Camp',
  },
];

export const ReviewsRequestAndBlogSection: React.FC<ReviewsRequestAndBlogSectionProps> = ({
  selectedProgramId,
  onBackToPrograms,
  onNavigatePage,
  contactModalOpen,
  onSetContactModalOpen,
  locatorModalOpen,
  onSetLocatorModalOpen,
  onTrialSubmitted,
}) => {
  const [formState, setFormState] = useState<TrialRequestInput>({
    fullName: '',
    email: '',
    programId: selectedProgramId || ACADEMY_PROGRAMS[0].id,
    athleteAge: '',
    message: '',
  });

  React.useEffect(() => {
    if (selectedProgramId) {
      setFormState((prev) => ({ ...prev, programId: selectedProgramId }));
    }
  }, [selectedProgramId]);

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
      `Trial & Admission request confirmed for ${formState.fullName.trim()} (${chosenProgram.title}). Your digital pass is now available in the top-right Athlete Portal.`
    );
    setFormState({
      fullName: '',
      email: '',
      programId: selectedProgramId || ACADEMY_PROGRAMS[0].id,
      athleteAge: '',
      message: '',
    });
  };

  return (
    <>
      {/* SECTION: FIND THE PROGRAM THAT BEST SUITS YOUR NEEDS (Exact match to 7_6cad68dd.png) */}
      <section className="py-14 sm:py-16 bg-white border-t border-neutral-100">
        <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-[32px] sm:text-[46px] lg:text-[52px] font-semibold uppercase tracking-[0.01em] text-[#121e34] text-center leading-none mb-12 sm:mb-16">
              FIND THE PROGRAM THAT BEST SUITS YOUR NEEDS
            </h2>
          </ScrollReveal>

          {/* 3-Column Grid with Vertical Dashed Dividers (Exact match to 7_6cad68dd.png) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-neutral-300">
            {/* Column 1: ACADEMY LOCATOR */}
            <div className="py-8 md:py-2 px-6 flex flex-col items-center text-center">
              <h3 className="font-display text-[26px] font-medium uppercase tracking-[0.03em] text-neutral-400 leading-none">
                ACADEMY LOCATOR
              </h3>

              {/* Dotted Circle + Map Pin Line Icon */}
              <div className="w-24 h-24 rounded-full border border-dashed border-neutral-300 flex items-center justify-center my-7">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 12L13.5 9L22.5 12L30 9V27L22.5 30L13.5 27L6 30V12Z"
                    stroke="#121e34"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 9V27M22.5 12V30"
                    stroke="#121e34"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="18"
                    cy="14"
                    r="3.5"
                    fill="#ffffff"
                    stroke="#121e34"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => onNavigatePage('national-academy')}
                className="w-[165px] py-2.5 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors cursor-pointer"
              >
                CLICK HERE
              </button>
            </div>

            {/* Column 2: BACK TO THE PROGRAMS */}
            <div className="py-8 md:py-2 px-6 flex flex-col items-center text-center">
              <h3 className="font-display text-[26px] font-medium uppercase tracking-[0.03em] text-neutral-400 leading-none">
                BACK TO THE PROGRAMS
              </h3>

              {/* Dotted Circle + Football Pitch Schematic Line Icon */}
              <div className="w-24 h-24 rounded-full border border-dashed border-neutral-300 flex items-center justify-center my-7">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="26"
                    height="16"
                    stroke="#121e34"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="18"
                    y1="10"
                    x2="18"
                    y2="26"
                    stroke="#121e34"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="3"
                    stroke="#121e34"
                    strokeWidth="1.3"
                  />
                  <rect
                    x="5"
                    y="14"
                    width="4"
                    height="8"
                    stroke="#121e34"
                    strokeWidth="1.3"
                  />
                  <rect
                    x="27"
                    y="14"
                    width="4"
                    height="8"
                    stroke="#121e34"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={onBackToPrograms}
                className="w-[165px] py-2.5 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors cursor-pointer"
              >
                CLICK HERE
              </button>
            </div>

            {/* Column 3: CONTACT US */}
            <div className="py-8 md:py-2 px-6 flex flex-col items-center text-center">
              <h3 className="font-display text-[26px] font-medium uppercase tracking-[0.03em] text-neutral-400 leading-none">
                CONTACT US
              </h3>

              {/* Dotted Circle + Support Person with Headset Line Icon */}
              <div className="w-24 h-24 rounded-full border border-dashed border-neutral-300 flex items-center justify-center my-7">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="18"
                    cy="14"
                    r="5.5"
                    stroke="#121e34"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11 28C11 23.8 14 21.5 18 21.5C22 21.5 25 23.8 25 28"
                    stroke="#121e34"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.5 14C12.5 10.5 15 8 18 8C21 8 23.5 10.5 23.5 14V16.5C23.5 17.5 22.5 18.5 21 18.5H19"
                    stroke="#121e34"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => onNavigatePage('contact')}
                className="w-[165px] py-2.5 border border-[#121e34] text-[#121e34] hover:bg-[#121e34] hover:text-white font-display text-[19px] font-semibold uppercase tracking-[0.04em] transition-colors cursor-pointer"
              >
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL 1: ACADEMY LOCATOR (30+ Partner Clubs & Regional Hubs) */}
      {locatorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#121e34]/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white text-[#121e34] max-w-3xl w-full border border-[#121e34] p-7 sm:p-10 relative my-8">
            <button
              type="button"
              onClick={() => onSetLocatorModalOpen(false)}
              aria-label="Close Academy Locator"
              className="absolute top-5 right-5 p-2 text-neutral-500 hover:text-[#121e34] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E10600] mb-1">
              NATIONAL ACADEMY NETWORK · 30 PARTNER CLUBS
            </div>
            <h3 className="font-display text-5xl font-semibold uppercase tracking-wide text-[#121e34] leading-none mb-6">
              ACADEMY LOCATOR
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PARTNER_HUBS.map((hub) => (
                <div
                  key={hub.name}
                  className="p-5 border border-neutral-300 bg-neutral-50 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#88b03f]">
                      {hub.region}
                    </div>
                    <h4 className="font-display text-2xl uppercase text-[#121e34] mt-1 leading-tight">
                      {hub.name}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E10600] shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-semibold text-neutral-700">
                    {hub.programs}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200">
              <div className="text-xs text-neutral-600">
                Want to register for a trial at your nearest Academy Hub?
              </div>
              <button
                type="button"
                onClick={() => {
                  onSetLocatorModalOpen(false);
                  onSetContactModalOpen(true);
                }}
                className="px-7 py-2.5 bg-[#121e34] hover:bg-[#88b03f] text-white font-display text-xl uppercase tracking-wider transition-colors cursor-pointer"
              >
                APPLY FOR TRIAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONTACT US & TRIAL REGISTRATION DESK */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#121e34]/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white text-[#121e34] max-w-2xl w-full border border-[#121e34] p-7 sm:p-10 relative my-8">
            <button
              type="button"
              onClick={() => onSetContactModalOpen(false)}
              aria-label="Close Contact Us Modal"
              className="absolute top-5 right-5 p-2 text-neutral-500 hover:text-[#121e34] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E10600] mb-1">
              OFFICIAL ADMISSIONS &amp; TRIAL REGISTRATION
            </div>
            <h3 className="font-display text-5xl font-semibold uppercase tracking-wide text-[#121e34] leading-none mb-2">
              CONTACT US &amp; APPLY FOR TRIAL
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mb-6">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#E10600]" />
                +1 (919) 323-8933
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#88b03f]" />
                info@sebastian.org
              </span>
            </div>

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
                  htmlFor="req-fullname"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  FULL NAME <span className="text-[#E10600]">*</span>
                </label>
                <input
                  id="req-fullname"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, fullName: e.target.value }))
                  }
                  placeholder="E.G. MELSON D. DOWSON"
                  className="w-full px-4 py-2.5 border border-neutral-300 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
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
                    htmlFor="req-email"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    EMAIL ADDRESS <span className="text-[#E10600]">*</span>
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="INFO@SEBASTIAN.ORG"
                    className="w-full px-4 py-2.5 border border-neutral-300 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
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
                    htmlFor="req-age"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    ATHLETE AGE <span className="text-[#E10600]">*</span>
                  </label>
                  <input
                    id="req-age"
                    type="number"
                    min={6}
                    max={23}
                    value={formState.athleteAge}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, athleteAge: e.target.value }))
                    }
                    placeholder="15"
                    className="w-full px-4 py-2.5 border border-neutral-300 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34] tabular-nums"
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
                  htmlFor="req-program"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  PROGRAM PATHWAY <span className="text-[#E10600]">*</span>
                </label>
                <select
                  id="req-program"
                  value={formState.programId}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, programId: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-neutral-300 text-sm text-[#121e34] bg-white focus:outline-none focus:border-[#121e34]"
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
                  htmlFor="req-message"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  MESSAGE &amp; PLAYING POSITION <span className="text-[#E10600]">*</span>
                </label>
                <textarea
                  id="req-message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder="PREFERRED POSITION, CURRENT CLUB, OR RESIDENCY INQUIRY..."
                  className="w-full px-4 py-2.5 border border-neutral-300 text-sm text-[#121e34] focus:outline-none focus:border-[#121e34]"
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
                className="w-full py-3 px-6 bg-[#121e34] hover:bg-[#88b03f] text-white font-display text-2xl font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                SUBMIT TRIAL REQUEST
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
