import { DEFAULT_FEE_KES, type RegistrationDetails, cleanName } from '@/lib/registration';

// Registration payments are taken by the K-Arena booking API (the academy's
// M-Pesa account), not by this site. The browser talks to it directly, so its
// address is public, and that API must list this site's origin in its
// ALLOWED_ORIGINS or the browser will refuse the calls.
//
// NEXT_PUBLIC_ values are fixed into the page when it is built.
const API_URL = (process.env.NEXT_PUBLIC_KARENA_API_URL ?? '').replace(/\/$/, '');
const WS_URL = (process.env.NEXT_PUBLIC_KARENA_WS_URL ?? '').replace(/\/$/, '');

/** Is the payment API set up for this build? */
export const REGISTRATION_ENABLED = API_URL !== '';

/** Where the payment-status WebSocket lives: set explicitly, or the API's own host. */
export function paymentSocketUrl(reference: string): string | null {
  let base = WS_URL;
  if (!base && API_URL) {
    try {
      const u = new URL(API_URL);
      base = `${u.protocol === 'https:' ? 'wss:' : 'ws:'}//${u.host}`;
    } catch {
      return null;
    }
  }
  return base ? `${base}/ws/v1/payment-status?reference=${encodeURIComponent(reference)}` : null;
}

/** A failed registration; `message` is safe to show on the form as it is. */
export class RegistrationError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
  ) {
    super(message);
    this.name = 'RegistrationError';
  }
}

const UNREACHABLE =
  "We couldn't reach the registration service. Please check your connection and try again. If an M-Pesa prompt arrives, you can still enter your PIN and we'll confirm by SMS.";
export const FAILED =
  "We couldn't start your registration just now. Please try again in a moment. If an M-Pesa prompt arrives, you can still enter your PIN and we'll confirm by SMS.";

// The API answers a refusal with a short sentence written for the person filling in
// the form and marks it with X-User-Message. Without the marker only the usual 4xx
// refusals are trusted: a 502 page from a proxy is not, so it becomes `fallback`.
const READABLE_STATUSES = new Set([400, 409, 413, 415, 422, 429]);

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const marked = res.headers.get('X-User-Message') === '1';
  if (!marked && !READABLE_STATUSES.has(res.status)) return fallback;
  const text = (await res.text()).trim();
  if (!text || text.length > 400 || text.startsWith('<')) return fallback;
  return text;
}

/** The registration fee in KSh, as the API states it. Falls back to the usual fee if it cannot be reached. */
export async function fetchAcademyFee(): Promise<number> {
  if (!REGISTRATION_ENABLED) return DEFAULT_FEE_KES;
  try {
    const res = await fetch(`${API_URL}/academy`, { cache: 'no-store' });
    if (!res.ok) return DEFAULT_FEE_KES;
    const body: unknown = await res.json();
    const fee = (body as { fee?: unknown } | null)?.fee;
    return typeof fee === 'number' && Number.isFinite(fee) && fee > 0 ? fee : DEFAULT_FEE_KES;
  } catch {
    return DEFAULT_FEE_KES;
  }
}

/** Starts a registration: checks it and sends the M-Pesa prompt for the fee. */
export async function registerPlayer(details: RegistrationDetails): Promise<{ reference: string; total: number }> {
  if (!REGISTRATION_ENABLED) throw new RegistrationError('Online registration is not available right now.', null);
  let res: Response;
  try {
    res = await fetch(`${API_URL}/academy/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName: cleanName(details.playerName),
        dateOfBirth: details.dateOfBirth,
        guardianName: cleanName(details.guardianName),
        phoneNumber: `254${details.phone}`,
      }),
    });
  } catch {
    throw new RegistrationError(UNREACHABLE, null);
  }
  if (!res.ok) throw new RegistrationError(await errorMessage(res, FAILED), res.status);
  try {
    const body = await res.json();
    if (typeof body?.reference !== 'string' || typeof body?.total !== 'number') throw new Error('bad body');
    return { reference: body.reference, total: body.total };
  } catch {
    // The prompt may well have been sent; do not show a parsing error.
    throw new RegistrationError(FAILED, res.status);
  }
}
