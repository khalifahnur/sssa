import { DEFAULT_FEE_KES, type RegistrationDetails, cleanName } from '@/lib/registration';

const API_URL = (process.env.NEXT_PUBLIC_KARENA_API_URL ?? '').replace(/\/$/, '');
const WS_URL = (process.env.NEXT_PUBLIC_KARENA_WS_URL ?? '').replace(/\/$/, '');

export const REGISTRATION_ENABLED = API_URL !== '';

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


const READABLE_STATUSES = new Set([400, 409, 413, 415, 422, 429]);

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const marked = res.headers.get('X-User-Message') === '1';
  if (!marked && !READABLE_STATUSES.has(res.status)) return fallback;
  const text = (await res.text()).trim();
  if (!text || text.length > 400 || text.startsWith('<')) return fallback;
  return text;
}


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
    throw new RegistrationError(FAILED, res.status);
  }
}
