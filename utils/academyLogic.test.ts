import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTicketOrder,
  filterPrograms,
  generateQrMatrix,
   getDefaultFixtures,
  getDefaultPrograms,
  validateNewsletterEmail,
  validateTrialRequest,
} from './academyLogic';

test('filterPrograms returns all programs when category is all', () => {
  const programs = getDefaultPrograms();
  const result = filterPrograms(programs, 'all');
  assert.equal(result.length, 4);
});

test('filterPrograms filters by specific category and search query', () => {
  const programs = getDefaultPrograms();
  const youthOnly = filterPrograms(programs, 'youth');
  assert.equal(youthOnly.length, 1);
  assert.equal(youthOnly[0].id, 'prog-youth');

  const searchResult = filterPrograms(programs, 'all', '1-2-1');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].category, 'specialist');
});

test('validateTrialRequest rejects empty or invalid fields and accepts valid input', () => {
  const invalidResult = validateTrialRequest({
    fullName: 'A',
    email: 'not-an-email',
    programId: '',
    athleteAge: '4',
    message: 'Too short',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.programId);
  assert.ok(invalidResult.errors.athleteAge);
  assert.ok(invalidResult.errors.message);

  const validResult = validateTrialRequest({
    fullName: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    programId: 'prog-scholar',
    athleteAge: '17',
    message: 'Central midfielder with 5 years regional club experience seeking scholar residency trial.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('calculateTicketOrder computes total and deducts seat count accurately', () => {
  const fixture = getDefaultFixtures()[0];
  const order = calculateTicketOrder(fixture, 3);
  assert.equal(order.valid, true);
  assert.equal(order.totalCost, fixture.price * 3);
  assert.equal(order.remainingAfterBooking, fixture.seatsRemaining - 3);

  const overOrder = calculateTicketOrder(fixture, 99);
  assert.equal(overOrder.valid, false);
  assert.ok(overOrder.error);
});

test('validateNewsletterEmail validates email syntax', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('invalid@').valid, false);
  assert.equal(validateNewsletterEmail('supporter@sebastian.org').valid, true);
});

test('generateQrMatrix produces deterministic 9x9 matrix with corner finders', () => {
  const m1 = generateQrMatrix('STSEB-2026-JUV14');
  const m2 = generateQrMatrix('STSEB-2026-JUV14');
  assert.equal(m1.length, 9);
  assert.equal(m1[0].length, 9);
  assert.deepEqual(m1, m2);
  assert.equal(m1[0][0], 1);
});
