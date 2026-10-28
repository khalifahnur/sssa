'use server';

import { randomUUID } from 'node:crypto';
import { ACADEMY_PROGRAMS } from '@/data/academyData';
import { calculateTicketOrder, validateTrialRequest, type TrialRequestInput } from '@/utils/academyLogic';

export type ActionResult = { ok: true; reference: string } | { ok: false; errors: Record<string, string> };

async function deliver(kind: 'trial' | 'ticket', payload: Record<string, unknown>) {
  console.info(`[sssa:${kind}]`, JSON.stringify(payload));
}

const token = () => randomUUID().slice(0, 6).toUpperCase();

export async function submitTrialRequest(input: TrialRequestInput): Promise<ActionResult> {
  const { valid, errors } = validateTrialRequest(input);
  if (!valid) return { ok: false, errors: errors as Record<string, string> };

  const program = ACADEMY_PROGRAMS.find((p) => p.id === input.programId);
  if (!program) return { ok: false, errors: { programId: 'Please select a training program.' } };

  const reference = `TRIAL-${input.athleteAge}Y-${token()}`;
  await deliver('trial', { reference, ...input, program: program.title });
  return { ok: true, reference };
}

