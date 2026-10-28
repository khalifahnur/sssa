'use client';

import { useSearchParams } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { Field } from './Field';
import { SubmitButton } from '@/components/ui/Button';
import { submitTrialRequest } from '@/app/actions';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

type Errors = Record<string, string>;

export function TrialForm() {
  const params = useSearchParams();
  const preselected = ACADEMY_PROGRAMS.find((p) => p.slug === params.get('program'))?.id ?? '';

  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = {
      fullName: String(data.get('fullName') ?? ''),
      email: String(data.get('email') ?? ''),
      athleteAge: String(data.get('athleteAge') ?? ''),
      programId: String(data.get('programId') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    startTransition(async () => {
      const result = await submitTrialRequest(input);
      if (result.ok) {
        setErrors({});
        setReference(result.reference);
      } else {
        setErrors(result.errors);
        // move focus to the first invalid field
        const first = Object.keys(result.errors)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
    });
  }

  if (reference) {
    return (
      <div role="status" className="border-l-[6px] border-green bg-mist p-8 sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-label text-green">Request received</p>
        <p className="display mt-3 text-5xl">Thank you — we have your trial request.</p>
        <p className="mt-4 max-w-lg opacity-80">
          Keep this reference handy when the admissions team gets in touch to arrange the evaluation:
        </p>
        <p className="display mt-4 text-4xl text-teal">{reference}</p>
        <button type="button" onClick={() => setReference(null)} className="mt-8 text-sm font-extrabold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-teal">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <Field label="Parent or athlete name" error={errors.fullName}>
        {(p) => <input {...p} name="fullName" type="text" autoComplete="name" placeholder="Full name" />}
      </Field>
      <Field label="Email" error={errors.email}>
        {(p) => <input {...p} name="email" type="email" autoComplete="email" placeholder="you@example.com" />}
      </Field>
      <Field label="Athlete age" error={errors.athleteAge} hint="Between 6 and 23">
        {(p) => <input {...p} name="athleteAge" type="number" inputMode="numeric" min={6} max={23} placeholder="14" />}
      </Field>
      <Field label="Program" error={errors.programId}>
        {(p) => (
          <select {...p} name="programId" defaultValue={preselected}>
            <option value="" disabled>
              Choose a program
            </option>
            {ACADEMY_PROGRAMS.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.title} ({prog.ageRange})
              </option>
            ))}
          </select>
        )}
      </Field>
      <div className="sm:col-span-2">
        <Field label="Position, experience and questions" error={errors.message}>
          {(p) => <textarea {...p} name="message" rows={4} placeholder="Central midfielder, five years at a regional club…" />}
        </Field>
      </div>
      <div className="sm:col-span-2">
        <SubmitButton disabled={pending}>{pending ? 'Sending…' : 'Request a trial'}</SubmitButton>
      </div>
    </form>
  );
}
