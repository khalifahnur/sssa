import {
  ACADEMY_PROGRAMS,
  AcademyProgram,
  FixtureTicket,
  ProgramCategory,
} from '../data/academyData';

export interface TrialRequestInput {
  fullName: string;
  email: string;
  programId: string;
  athleteAge: string;
  message: string;
}

export interface TrialValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof TrialRequestInput, string>>;
}

export interface SubmittedBooking {
  id: string;
  type: 'trial' | 'ticket';
  title: string;
  applicantName: string;
  email: string;
  referenceCode: string;
  createdAt: string;
  details: string;
}

/**
 * Filters academy programs by category and optional search query.
 */
export function filterPrograms(
  programs: AcademyProgram[],
  category: ProgramCategory,
  searchQuery = ''
): AcademyProgram[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return programs.filter((program) => {
    const matchesCategory = category === 'all' || program.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      program.title.toLowerCase().includes(normalizedQuery) ||
      program.summary.toLowerCase().includes(normalizedQuery) ||
      program.ageRange.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Validates the Trial / Academy Admission Request form without silent fallbacks.
 */
export function validateTrialRequest(input: TrialRequestInput): TrialValidationResult {
  const errors: Partial<Record<keyof TrialRequestInput, string>> = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.fullName = 'Please enter the athlete or parent full name (min 2 characters).';
  }

  const trimmedEmail = input.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., athlete@domain.com).';
  }

  const ageNum = Number(input.athleteAge);
  if (!input.athleteAge.trim() || Number.isNaN(ageNum) || ageNum < 6 || ageNum > 23) {
    errors.athleteAge = 'Athlete age must be between 6 and 23 years.';
  }

  if (!input.programId.trim()) {
    errors.programId = 'Please select a training program.';
  }

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = 'Please include playing position, experience, or questions (min 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates newsletter email subscription.
 */
export function validateNewsletterEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

/**
 * Calculates ticket reservation total and updates remaining seat inventory.
 */
export function calculateTicketOrder(
  fixture: FixtureTicket,
  quantity: number
): { totalCost: number; remainingAfterBooking: number; valid: boolean; error?: string } {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      totalCost: 0,
      remainingAfterBooking: fixture.seatsRemaining,
      valid: false,
      error: 'Ticket quantity must be at least 1.',
    };
  }
  if (quantity > 10) {
    return {
      totalCost: 0,
      remainingAfterBooking: fixture.seatsRemaining,
      valid: false,
      error: 'Maximum 10 tickets per reservation.',
    };
  }
  if (quantity > fixture.seatsRemaining) {
    return {
      totalCost: 0,
      remainingAfterBooking: fixture.seatsRemaining,
      valid: false,
      error: `Only ${fixture.seatsRemaining} seats remaining for this fixture.`,
    };
  }

  return {
    totalCost: fixture.price * quantity,
    remainingAfterBooking: fixture.seatsRemaining - quantity,
    valid: true,
  };
}

/**
 * Generates a deterministic 7x7 binary matrix for the SVG QR code pass on fixture tickets.
 */
export function generateQrMatrix(seedCode: string): number[][] {
  const size = 9;
  const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(0));

  let hash = 2166136261;
  for (let i = 0; i < seedCode.length; i++) {
    hash ^= seedCode.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Corner finder patterns
      const isTopLeft = r < 3 && c < 3;
      const isTopRight = r < 3 && c >= size - 3;
      const isBottomLeft = r >= size - 3 && c < 3;
      if (isTopLeft || isTopRight || isBottomLeft) {
        const localR = r < 3 ? r : r - (size - 3);
        const localC = c < 3 ? c : c - (size - 3);
        matrix[r][c] = localR === 1 && localC === 1 ? 1 : localR === 0 || localR === 2 || localC === 0 || localC === 2 ? 1 : 0;
      } else {
        const bitIndex = (r * size + c) % 31;
        matrix[r][c] = ((Math.abs(hash) >> bitIndex) ^ (r + c)) & 1;
      }
    }
  }
  return matrix;
}

export function getDefaultPrograms(): AcademyProgram[] {
  return ACADEMY_PROGRAMS;
}

