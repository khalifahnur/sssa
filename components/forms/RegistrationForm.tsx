'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Field } from './Field';
import { SubmitButton } from '@/components/ui/Button';
import { BRAND_CONTACT } from '@/data/academyData';
import { FAILED, REGISTRATION_ENABLED, RegistrationError, fetchAcademyFee, registerPlayer } from '@/lib/karena';
import {
  DEFAULT_FEE_KES,
  cleanName,
  dobError,
  formatKes,
  formatPhone,
  nameError,
  normalizePhoneInput,
  phoneError,
  type RegistrationDetails,
} from '@/lib/registration';
import { usePaymentStatus } from '@/lib/usePaymentStatus';

type Errors = Partial<Record<keyof RegistrationDetails, string>>;

const EMPTY: RegistrationDetails = { playerName: '', dateOfBirth: '', guardianName: '', phone: '' };

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationDetails>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState<{ reference: string; total: number; player: string; phone: string } | null>(null);
  const [fee, setFee] = useState(DEFAULT_FEE_KES);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let live = true;
    fetchAcademyFee().then((f) => {
      if (live) setFee(f);
    });
    return () => {
      live = false;
    };
  }, []);

  const change = <K extends keyof RegistrationDetails>(key: K, value: RegistrationDetails[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    setSubmitError(null);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const found: Errors = {
      playerName: nameError(values.playerName, "player's full name"),
      dateOfBirth: dobError(values.dateOfBirth, new Date()),
      guardianName: nameError(values.guardianName, "parent or guardian's full name"),
      phone: phoneError(values.phone),
    };
    setErrors(found);
    const first = (Object.keys(found) as (keyof Errors)[]).find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await registerPlayer(values);
      setStarted({ ...result, player: cleanName(values.playerName), phone: values.phone });
    } catch (err) {
      setSubmitError(err instanceof RegistrationError ? err.message : FAILED);
    } finally {
      setSubmitting(false);
    }
  }

  if (started) {
    return (
      <Payment
        key={started.reference}
        reference={started.reference}
        total={started.total}
        player={started.player}
        phone={started.phone}
        onTryAgain={() => setStarted(null)}
        onAnother={() => {
          setStarted(null);
          setValues((v) => ({ ...EMPTY, guardianName: v.guardianName, phone: v.phone }));
        }}
      />
    );
  }

  if (!REGISTRATION_ENABLED) {
    return (
      <div role="status" className="border-l-[6px] border-sun bg-white p-8">
        <p className="text-xs font-extrabold uppercase tracking-label text-teal">Online registration</p>
        <p className="display mt-3 text-4xl">Not available right now</p>
        <p className="mt-4 max-w-lg opacity-80">
          Please call the academy on{' '}
          <a className="font-bold underline underline-offset-4 hover:text-teal" href={`tel:${BRAND_CONTACT.phone.replace(/[^+\d]/g, '')}`}>
            {BRAND_CONTACT.phone}
          </a>{' '}
          to register.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Player's full name" error={errors.playerName}>
          {(p) => (
            <input
              {...p}
              name="playerName"
              type="text"
              autoComplete="off"
              placeholder="Full name"
              value={values.playerName}
              onChange={(e) => change('playerName', e.target.value)}
            />
          )}
        </Field>
      </div>
      <Field label="Date of birth" error={errors.dateOfBirth}>
        {(p) => (
          <input
            {...p}
            name="dateOfBirth"
            type="date"
            autoComplete="bday"
            value={values.dateOfBirth}
            onChange={(e) => change('dateOfBirth', e.target.value)}
          />
        )}
      </Field>
      <Field label="Parent or guardian's full name" error={errors.guardianName}>
        {(p) => (
          <input
            {...p}
            name="guardianName"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={values.guardianName}
            onChange={(e) => change('guardianName', e.target.value)}
          />
        )}
      </Field>
      <div className="sm:col-span-2">
        <Field label="M-Pesa phone number" error={errors.phone} hint="The payment prompt and your confirmation go to this number.">
          {(p) => (
            <div className="flex items-end gap-3">
              <span aria-hidden="true" className="border-b-[3px] border-navy/25 py-3 text-base font-extrabold text-navy/70">
                +254
              </span>
              <input
                {...p}
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="7XXXXXXXX"
                value={values.phone}
                onChange={(e) => change('phone', normalizePhoneInput(e.target.value))}
              />
            </div>
          )}
        </Field>
      </div>

      <div className="sm:col-span-2">
        <p className="border-l-[6px] border-green bg-white p-5 text-sm leading-relaxed text-navy/80">
          Registration fee: <strong className="text-navy">{formatKes(fee)}</strong>, paid once by M-Pesa. You will get a
          prompt on the number above and a confirmation SMS when it goes through.
        </p>
        {submitError && (
          <p role="alert" className="mt-4 border-l-[6px] border-alert bg-white p-4 text-sm font-semibold text-alert">
            {submitError}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <SubmitButton disabled={submitting}>{submitting ? 'Sending the M-Pesa prompt…' : `Pay ${formatKes(fee)} and register`}</SubmitButton>
      </div>
    </form>
  );
}

function Payment({
  reference,
  total,
  player,
  phone,
  onTryAgain,
  onAnother,
}: {
  reference: string;
  total: number;
  player: string;
  phone: string;
  onTryAgain: () => void;
  onAnother: () => void;
}) {
  const status = usePaymentStatus(reference);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [status]);

  if (status === 'Completed') {
    return (
      <div role="status" className="border-l-[6px] border-green bg-white p-8 sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-label text-green">Payment received</p>
        <h3 ref={heading} tabIndex={-1} className="display mt-3 text-5xl outline-none">
          {player} is registered.
        </h3>
        <p className="mt-4 max-w-lg opacity-80">
          Thank you. We have received {formatKes(total)} and sent a confirmation SMS to {formatPhone(phone)}.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="text-sm font-extrabold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-teal">
            Back to home
          </Link>
          <button type="button" onClick={onAnother} className="text-sm font-extrabold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-teal">
            Register another player
          </button>
        </div>
      </div>
    );
  }

  if (status === 'Failed') {
    return (
      <div role="alert" className="border-l-[6px] border-alert bg-white p-8 sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-label text-alert">Not confirmed</p>
        <h3 ref={heading} tabIndex={-1} className="display mt-3 text-5xl outline-none">
          We could not confirm your payment.
        </h3>
        <p className="mt-4 max-w-lg opacity-80">
          The prompt may have timed out or been cancelled, the PIN may have been wrong, or the balance was too low.
        </p>
        <p className="mt-4 max-w-lg bg-sun/20 p-4 text-sm leading-relaxed">
          <strong>Already paid?</strong> Please do not pay again. Once we confirm your payment we will register {player} and
          send you an SMS. Need help? Call{' '}
          <a className="font-bold underline" href={`tel:${BRAND_CONTACT.phone.replace(/[^+\d]/g, '')}`}>
            {BRAND_CONTACT.phone}
          </a>
          .
        </p>
        <button type="button" onClick={onTryAgain} className="mt-8 text-sm font-extrabold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-teal">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div role="status" className="border-l-[6px] border-teal bg-white p-8 sm:p-10">
      <p className="text-xs font-extrabold uppercase tracking-label text-teal">Waiting for M-Pesa</p>
      <h3 ref={heading} tabIndex={-1} className="display mt-3 text-5xl outline-none">
        Check your phone.
      </h3>
      <p className="mt-4 max-w-lg opacity-80">
        We have sent an M-Pesa prompt for <strong>{formatKes(total)}</strong> to <strong className="whitespace-nowrap">{formatPhone(phone)}</strong>.
        Enter your M-Pesa PIN to finish registering {player}.
      </p>
      <p className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-teal">
        <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-teal/25 border-t-teal" />
        Waiting for confirmation…
      </p>
      <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">
        Changing the details does <strong>not</strong> cancel the prompt on your phone. If you enter your PIN we will still
        register {player} and confirm by SMS.
      </p>
      <button type="button" onClick={onTryAgain} className="mt-4 text-sm font-extrabold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-teal">
        Change the details
      </button>
    </div>
  );
}
