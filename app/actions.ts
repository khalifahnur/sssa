'use server';

import { randomUUID } from 'node:crypto';
import { ACADEMY_PROGRAMS, UPCOMING_FIXTURES } from '@/data/academyData';
import { calculateTicketOrder, validateTrialRequest, type TrialRequestInput } from '@/utils/academyLogic';

export type ActionResult = { ok: true; reference: string } | { ok: false; errors: Record<string, string> };

/**
 * Integration point: forward the validated enquiry to wherever admissions works from
 * (email provider, CRM, Google Sheet, Slack webhook, ...). Until that is wired up the request is only
 * validated and logged on the server, and a reference code is returned to the visitor.
 */
async function deliver(kind: 'trial' | 'ticket', payload: Record<string, unknown>) {
  console.info(`[sssa:${kind}]`, JSON.stringify(payload));
}

const token = () => randomUUID().slice(0, 6).toUpperCase();

export async function submitTrialRequest(input: TrialRequestInput): Promise<ActionResult> {
  const { valid, errors } = validateTrialRequest(input);
  if (!valid) return { ok: false, errors: errors as Record<string, string> };

  const program = ACADEMY_PROGRAMS.find((p) => p.id === input.programId);
  if (!program) return { ok: false, errors: { programId: 'Please select a training programme.' } };

  const reference = `TRIAL-${input.athleteAge}Y-${token()}`;
  await deliver('trial', { reference, ...input, program: program.title });
  return { ok: true, reference };
}

export async function reserveTickets(input: { fixtureId: string; name: string; email: string; quantity: number }): Promise<ActionResult> {
  const errors: Record<string, string> = {};
  if (input.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = 'Please enter a valid email address.';

  const fixture = UPCOMING_FIXTURES.find((f) => f.id === input.fixtureId);
  if (!fixture) return { ok: false, errors: { fixtureId: 'That fixture is no longer available.' } };

  const order = calculateTicketOrder(fixture, input.quantity);
  if (!order.valid) errors.quantity = order.error ?? 'Invalid quantity.';
  if (Object.keys(errors).length) return { ok: false, errors };

  const reference = `${fixture.ticketCode}-Q${input.quantity}-${token()}`;
  await deliver('ticket', { reference, fixture: fixture.matchTitle, ...input, total: order.totalCost });
  return { ok: true, reference };
}
