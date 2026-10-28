import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Ticket,
  Play,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import {
  AcademyProgram,
  BlogArticle,
  FixtureTicket,
  HighlightClip,
} from '../data/academyData';
import {
  calculateTicketOrder,
  generateQrMatrix,
  SubmittedBooking,
} from '../utils/academyLogic';

interface SyllabusModalProps {
  program: AcademyProgram | null;
  onClose: () => void;
  onApplyForProgram: (program: AcademyProgram) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  program,
  onClose,
  onApplyForProgram,
}) => {
  if (!program) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="syllabus-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121e34]/80 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        <div className="relative h-48 bg-[#121e34]">
          <img
            src={program.image}
            alt={program.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121e34] via-[#121e34]/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close syllabus modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-[#88b03f]">
              {program.categoryLabel} · {program.ageRange} · {program.coachRatio}
            </div>
            <h3 id="syllabus-modal-title" className="font-display text-3xl font-extrabold uppercase">
              {program.title}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-xs font-bold text-[#1f4b50] bg-slate-100 px-3.5 py-2 rounded-lg">
            Schedule: {program.schedule}
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#121e34] mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#88b03f]" />
              <span>Official Curriculum Modules</span>
            </h4>
            <ul className="space-y-2">
              {program.syllabus.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#88b03f] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#88b03f]/15 border border-[#88b03f]/30 text-xs sm:text-sm text-[#121e34]">
            <strong>Pathway Outcome:</strong> {program.outcomes}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold uppercase text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyForProgram(program);
                onClose();
              }}
              className="px-6 py-2.5 rounded-lg bg-[#E10600] hover:bg-[#c40500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Apply for This Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TicketBookingModalProps {
  fixture: FixtureTicket | null;
  onClose: () => void;
  onConfirmReservation: (
    fixtureId: string,
    quantity: number,
    supporterName: string,
    supporterEmail: string
  ) => void;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({
  fixture,
  onClose,
  onConfirmReservation,
}) => {
  const [quantity, setQuantity] = useState(2);
  const [supporterName, setSupporterName] = useState('');
  const [supporterEmail, setSupporterEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!fixture) return null;

  const orderCalc = calculateTicketOrder(fixture, quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supporterName.trim() || supporterName.trim().length < 2) {
      setError('Please enter supporter full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supporterEmail.trim())) {
      setError('Please enter a valid email address for QR ticket delivery.');
      return;
    }
    if (!orderCalc.valid) {
      setError(orderCalc.error || 'Invalid ticket quantity.');
      return;
    }

    setError(null);
    onConfirmReservation(
      fixture.id,
      quantity,
      supporterName.trim(),
      supporterEmail.trim()
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121e34]/80 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        <div className="bg-[#121e34] text-white p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#88b03f]">
              {fixture.competition}
            </div>
            <h3 id="ticket-modal-title" className="font-display text-2xl font-extrabold uppercase">
              {fixture.matchTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket reservation modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Calendar className="w-4 h-4 text-[#E10600]" />
              {fixture.dateFormatted} · {fixture.kickoffTime}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-[#88b03f]" />
              {fixture.location}
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="ticket-name"
              className="block text-xs font-bold uppercase text-[#121e34] mb-1"
            >
              Supporter Full Name
            </label>
            <input
              id="ticket-name"
              type="text"
              value={supporterName}
              onChange={(e) => setSupporterName(e.target.value)}
              placeholder="e.g. Jordan Brooks"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-[#121e34]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="ticket-email"
                className="block text-xs font-bold uppercase text-[#121e34] mb-1"
              >
                Email Address
              </label>
              <input
                id="ticket-email"
                type="email"
                value={supporterEmail}
                onChange={(e) => setSupporterEmail(e.target.value)}
                placeholder="supporter@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-[#121e34]"
              />
            </div>

            <div>
              <label
                htmlFor="ticket-qty"
                className="block text-xs font-bold uppercase text-[#121e34] mb-1"
              >
                Seats (${fixture.price} ea)
              </label>
              <input
                id="ticket-qty"
                type="number"
                min={1}
                max={Math.min(10, fixture.seatsRemaining)}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-[#121e34] font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Total Match Pass Amount</div>
              <div className="font-mono text-2xl font-extrabold text-[#88b03f] tabular-nums">
                ${orderCalc.totalCost.toFixed(2)}
              </div>
            </div>
            <div className="text-right text-xs text-slate-300 tabular-nums">
              {orderCalc.remainingAfterBooking} seats remaining after booking
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold uppercase text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E10600] hover:bg-[#c40500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Confirm QR Match Pass</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface HighlightModalProps {
  clip: HighlightClip | null;
  onClose: () => void;
}

export const HighlightModal: React.FC<HighlightModalProps> = ({ clip, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!clip) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="highlight-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121e34]/85 backdrop-blur-md"
    >
      <div className="bg-[#0d1627] text-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/15">
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={clip.image}
            alt={clip.title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-black/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close highlight video modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Simulated Tactical Telestrator Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 bg-[#121e34]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="px-4 py-2 rounded-lg bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlaying ? 'Pause Breakdown' : 'Resume Clip'}</span>
            </button>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-[#88b03f] rounded-full" />
            </div>
            <span className="font-mono text-xs text-slate-300 tabular-nums">
              {clip.duration}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#88b03f]">
              {clip.category} · {clip.date} · {clip.location}
            </div>
            <h3 id="highlight-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold uppercase mt-1">
              {clip.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {clip.tacticalNotes}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10">
            {clip.keyStats.map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-white/5">
                <div className="text-[11px] text-slate-400">{stat.label}</div>
                <div className="font-mono text-lg font-extrabold text-[#88b03f] tabular-nums mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121e34]/80 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="relative h-56 bg-[#121e34]">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121e34] via-[#121e34]/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article reader"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-[#88b03f]">
              {article.category} · {article.date} · By {article.author}
            </div>
            <h3 id="article-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold uppercase mt-1">
              {article.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#121e34] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookingsModalProps {
  isOpen: boolean;
  bookings: SubmittedBooking[];
  onClose: () => void;
}

export const BookingsModal: React.FC<BookingsModalProps> = ({
  isOpen,
  bookings,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121e34]/80 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#88b03f]">
              ST. SEBASTIAN SPORTS ACADEMY
            </div>
            <h3 id="bookings-modal-title" className="font-display text-2xl font-extrabold uppercase text-[#121e34]">
              My Confirmed Passes &amp; Trial Registrations ({bookings.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close passes modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500 py-8 text-center">
            No passes or trial registrations yet.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((item) => {
              const matrix = generateQrMatrix(item.referenceCode);
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#1f4b50]">
                      {item.type === 'ticket' ? 'Matchday Seat Pass' : 'Academy Trial Pass'} ·{' '}
                      <span className="font-mono">{item.referenceCode}</span>
                    </div>
                    <div className="font-bold text-sm text-[#121e34]">{item.title}</div>
                    <div className="text-xs text-slate-600">
                      Holder: {item.applicantName} ({item.email})
                    </div>
                    <div className="text-xs text-[#1f4b50] font-medium">{item.details}</div>
                  </div>

                  <svg
                    viewBox="0 0 9 9"
                    className="w-16 h-16 p-1 bg-white border border-slate-300 rounded shrink-0"
                    aria-label={`Pass QR ${item.referenceCode}`}
                  >
                    {matrix.map((row, r) =>
                      row.map((val, c) =>
                        val ? (
                          <rect
                            key={`${r}-${c}`}
                            x={c}
                            y={r}
                            width={0.9}
                            height={0.9}
                            fill="#121e34"
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
