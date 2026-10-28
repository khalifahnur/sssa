'use client';

import { useState, useTransition } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Field } from '@/components/forms/Field';
import { SubmitButton } from '@/components/ui/Button';
import { reserveTickets } from '@/app/actions';
import { calculateTicketOrder, generateQrMatrix } from '@/utils/academyLogic';
import { UPCOMING_FIXTURES, type FixtureTicket } from '@/data/academyData';

function QrPass({ code }: { code: string }) {
  const matrix = generateQrMatrix(code);
  return (
    <svg viewBox="0 0 9 9" className="h-24 w-24 bg-white p-1.5" role="img" aria-label={`Pass code ${code}`} shapeRendering="crispEdges">
      {matrix.flatMap((row, r) => row.map((v, c) => (v ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#121e34" /> : null)))}
    </svg>
  );
}

function TicketPanel({ fixture, onBooked }: { fixture: FixtureTicket; onBooked: (qty: number) => void }) {
  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const order = calculateTicketOrder(fixture, qty);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await reserveTickets({
        fixtureId: fixture.id,
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        quantity: qty,
      });
      if (result.ok) {
        setReference(result.reference);
        onBooked(qty);
      } else setErrors(result.errors);
    });
  }

  if (reference) {
    return (
      <div role="status" className="flex flex-col gap-6 bg-navy p-8 text-white sm:flex-row sm:items-center">
        <QrPass code={reference} />
        <div>
          <p className="text-xs font-extrabold uppercase tracking-label text-green">Pass reserved</p>
          <p className="display mt-1 text-4xl">{fixture.matchTitle}</p>
          <p className="mt-2 text-sm text-white/70">
            {qty} × match pass · {fixture.dateFormatted} · {fixture.kickoffTime}
          </p>
          <p className="mt-3 font-mono text-sm tracking-wider text-green">{reference}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 bg-mist p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-8">
      <Field label="Name" error={errors.name}>
        {(p) => <input {...p} name="name" autoComplete="name" placeholder="Full name" />}
      </Field>
      <Field label="Email" error={errors.email}>
        {(p) => <input {...p} name="email" type="email" autoComplete="email" placeholder="you@example.com" />}
      </Field>
      <div>
        <p id={`qty-${fixture.id}`} className="text-xs font-extrabold uppercase tracking-label text-teal">
          Passes
        </p>
        <div role="group" aria-labelledby={`qty-${fixture.id}`} className="mt-2 flex items-center gap-4">
          <button type="button" aria-label="Fewer passes" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 border-2 border-navy text-xl font-bold hover:bg-navy hover:text-white">
            −
          </button>
          <output aria-live="polite" className="w-6 text-center text-xl font-extrabold">
            {qty}
          </output>
          <button type="button" aria-label="More passes" onClick={() => setQty((q) => Math.min(10, q + 1))} className="h-11 w-11 border-2 border-navy text-xl font-bold hover:bg-navy hover:text-white">
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold">
          {order.valid ? (
            <>
              Total <span className="text-xl font-extrabold">${order.totalCost}</span> · {order.remainingAfterBooking} seats remain after this booking
            </>
          ) : (
            <span className="text-alert">{order.error ?? errors.quantity}</span>
          )}
        </p>
        <SubmitButton disabled={pending || !order.valid}>{pending ? 'Reserving…' : 'Reserve passes'}</SubmitButton>
      </div>
    </form>
  );
}

export function FixtureBoard() {
  const [fixtures, setFixtures] = useState(UPCOMING_FIXTURES);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="border-t-[3px] border-navy">
      {fixtures.map((f) => {
        const open = openId === f.id;
        const low = f.seatsRemaining <= 20;
        return (
          <li key={f.id} id={f.id} className="border-b border-navy/15">
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 py-7 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-10 lg:py-9">
              <time dateTime={f.startsAt} className="text-center leading-none">
                <span className="display block text-6xl sm:text-7xl">{f.dayNumber}</span>
                <span className="mt-1 block text-[0.65rem] font-extrabold uppercase tracking-label text-green">{f.monthName.slice(0, 3)}</span>
              </time>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">{f.competition}</p>
                <h3 className="display mt-1 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[0.98]">{f.matchTitle}</h3>
                <p className="mt-2 text-sm opacity-70">
                  {f.dayName.charAt(0) + f.dayName.slice(1).toLowerCase()} · {f.kickoffTime} · {f.location}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-5 sm:col-span-1 sm:justify-end">
                <div className="text-right">
                  <p className="text-2xl font-extrabold">${f.price}</p>
                  <p className={`mt-0.5 inline-block rounded-[3px] px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] ${low ? 'bg-sun text-navy' : 'bg-navy/8'}`}>{f.seatsRemaining} left</p>
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`panel-${f.id}`}
                  disabled={f.seatsRemaining === 0}
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="rounded-[3px] bg-navy px-5 py-3.5 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-teal disabled:opacity-40"
                >
                  {f.seatsRemaining === 0 ? 'Sold out' : open ? 'Close' : 'Reserve'}
                </button>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`panel-${f.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8">
                    <TicketPanel
                      fixture={f}
                      onBooked={(qty) => setFixtures((prev) => prev.map((x) => (x.id === f.id ? { ...x, seatsRemaining: Math.max(0, x.seatsRemaining - qty) } : x)))}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
