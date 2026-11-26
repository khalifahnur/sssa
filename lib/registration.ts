// Registering a player at the academy: what the form checks before it asks for
// payment. The K-Arena booking API repeats every one of these checks and works
// out the fee itself, so nothing here can change what anyone is charged.

/** Shown until the API says what the fee is. The API decides what is charged. */
export const DEFAULT_FEE_KES = 5_000;

export const MIN_PLAYER_AGE = 3;
export const MAX_PLAYER_AGE = 21;

/** "KSh 5,000" */
export function formatKes(amount: number): string {
  const grouped = String(Math.abs(Math.round(amount))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${amount < 0 ? '-' : ''}KSh ${grouped}`;
}

const NAME_PATTERN = /^[\p{L}\p{M}\p{Nd} '.&-]+$/u;
// Letters that draw as blank space, which would let a name that looks empty through.
const INVISIBLE_FILLER = /[ᅟᅠㅤﾠ឴឵]/u;
const PHONE_PATTERN = /^[17]\d{8}$/;

/** Tidies a name the way the server does: curly apostrophes, composed characters, single spaces. */
export function cleanName(raw: string): string {
  return raw
    .replace(/[‘’ʼ`´]/g, "'")
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ');
}

/** What is wrong with a name typed into the form, or undefined. `what` reads "Enter the …". */
export function nameError(raw: string, what: string): string | undefined {
  const name = cleanName(raw);
  if (!name) return `Enter the ${what}`;
  const length = [...name].length;
  if (length < 2 || length > 60) return 'Use between 2 and 60 characters';
  if (!NAME_PATTERN.test(name) || INVISIBLE_FILLER.test(name) || /\p{M}{3,}/u.test(name)) {
    return "Use letters, numbers, spaces and the characters . - & ' only";
  }
  if ((name.match(/[\p{L}\p{Nd}]/gu) ?? []).length < 2) return 'Include at least two letters or numbers';
  return undefined;
}

export function phoneError(digits: string): string | undefined {
  if (!digits) return 'Enter the M-Pesa number to charge';
  if (!PHONE_PATTERN.test(digits)) return 'Enter 9 digits starting with 7 or 1 (e.g. 712345678)';
  return undefined;
}

/**
 * Keeps the digits typed or pasted into the phone box and drops a leading 254 or
 * 0, since the +254 is already shown beside it: pasting "0712 345 678" or
 * "+254712345678" both give 712345678.
 */
export function normalizePhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('254')) digits = digits.slice(3);
  else if (digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, 9);
}

/** 712345678 -> "+254 712 345 678" */
export function formatPhone(digits: string): string {
  return `+254 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`.trim();
}

/** A player's age in whole years on the day `now`, or null if `dob` (YYYY-MM-DD) is not a real date. */
export function ageOn(dob: string, now: Date): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const born = new Date(Date.UTC(y, mo - 1, d));
  if (born.getUTCFullYear() !== y || born.getUTCMonth() !== mo - 1 || born.getUTCDate() !== d) return null;
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < mo || (now.getMonth() + 1 === mo && now.getDate() < d)) age--;
  return age;
}

/** What is wrong with the date of birth, or undefined. Pass the current time from an event handler. */
export function dobError(dob: string, now: Date): string | undefined {
  if (!dob) return "Enter the player's date of birth";
  const age = ageOn(dob, now);
  if (age === null) return "Enter the player's date of birth";
  if (age < 0) return 'The date of birth cannot be in the future';
  if (age < MIN_PLAYER_AGE || age > MAX_PLAYER_AGE) return `The player must be between ${MIN_PLAYER_AGE} and ${MAX_PLAYER_AGE} years old`;
  return undefined;
}

export interface RegistrationDetails {
  playerName: string;
  dateOfBirth: string; // YYYY-MM-DD
  guardianName: string;
  phone: string; // the 9 digits after +254
}
