import { describe, expect, it } from 'vitest';
import {
  createWeekendAnswers,
  createYesNoOptions,
  getNormalizedGuestCount,
  getMissingRequiredWeekendField,
  isYesNoResponse,
  optionalYesNoToBoolean,
  parseGuestCount,
  RSVP_WEEKEND_FIELDS,
  RSVP_WEEKEND_QUESTIONS_BY_KEY,
  RSVP_WEEKEND_TRIGGER_IDS,
  selectYesNoQuestions,
  validatePhone,
  yesNoToBoolean,
} from '$lib/rsvp/utils';

// Simple unit tests for RSVP form handling utilities.
describe('rsvp/utils', () => {
  describe('createYesNoOptions()', () => {
    it('creates a typed yes/no option list from labels', () => {
      expect(createYesNoOptions({ yes: 'Yep', no: 'Nope' })).toEqual([
        { value: 'yes', label: 'Yep' },
        { value: 'no', label: 'Nope' },
      ]);
    });
  });

  describe('weekend field metadata', () => {
    it('derives field keys from selectYesNoQuestions', () => {
      expect(RSVP_WEEKEND_FIELDS).toEqual(selectYesNoQuestions.map((q) => q.key));
    });

    it('each question has all required fields', () => {
      for (const q of selectYesNoQuestions) {
        expect(q.key).toBeTruthy();
        expect(q.label).toBeTruthy();
        expect(q.yes).toBeTruthy();
        expect(q.no).toBeTruthy();
        expect(q.errorRequired).toBeTruthy();
        expect(q.triggerId).toBeTruthy();
      }
    });

    it('derives trigger IDs from selectYesNoQuestions', () => {
      for (const q of selectYesNoQuestions) {
        expect(RSVP_WEEKEND_TRIGGER_IDS[q.key]).toBe(q.triggerId);
      }
    });

    it('RSVP_WEEKEND_QUESTIONS_BY_KEY matches selectYesNoQuestions', () => {
      for (const q of selectYesNoQuestions) {
        expect(RSVP_WEEKEND_QUESTIONS_BY_KEY[q.key]).toBe(q);
      }
    });
  });

  describe('createWeekendAnswers()', () => {
    it('creates a record keyed by all weekend fields', () => {
      const result = createWeekendAnswers(() => 'yes');
      expect(Object.keys(result)).toEqual(RSVP_WEEKEND_FIELDS);
    });

    it('applies the factory value to every field', () => {
      const result = createWeekendAnswers(() => 'no');
      for (const field of RSVP_WEEKEND_FIELDS) {
        expect(result[field]).toBe('no');
      }
    });

    it('can initialise all fields to undefined', () => {
      const result = createWeekendAnswers(() => undefined);
      for (const field of RSVP_WEEKEND_FIELDS) {
        expect(result[field]).toBeUndefined();
      }
    });
  });

  describe('isYesNoResponse()', () => {
    it.each([
      { value: 'yes', expected: true },
      { value: 'no', expected: true },
      // Simulating initial unselected case - want to have nice placeholder
      { value: 'maybe', expected: false },
      { value: '', expected: false },
    ])('returns $expected for "$value"', ({ value, expected }) => {
      expect(isYesNoResponse(value)).toBe(expected);
    });
  });

  describe('yesNoToBoolean()', () => {
    it.each([
      { value: 'yes', expected: true },
      { value: 'no', expected: false },
    ] as const)('maps "$value" to $expected', ({ value, expected }) => {
      expect(yesNoToBoolean(value)).toBe(expected);
    });
  });

  describe('optionalYesNoToBoolean()', () => {
    it('uses fallback for undefined', () => {
      expect(optionalYesNoToBoolean(undefined)).toBe(false);
      expect(optionalYesNoToBoolean(undefined, true)).toBe(true);
    });

    it('maps concrete yes/no values', () => {
      expect(optionalYesNoToBoolean('yes')).toBe(true);
      expect(optionalYesNoToBoolean('no')).toBe(false);
    });
  });

  describe('getMissingRequiredWeekendField()', () => {
    it('returns each field in turn as the first missing one', () => {
      for (let i = 0; i < RSVP_WEEKEND_FIELDS.length; i++) {
        const answers = createWeekendAnswers((field) =>
          RSVP_WEEKEND_FIELDS.indexOf(field) < i ? 'yes' : undefined
        );
        expect(getMissingRequiredWeekendField(answers)).toBe(RSVP_WEEKEND_FIELDS[i]);
      }
    });

    it('returns null when all fields are answered', () => {
      expect(getMissingRequiredWeekendField(createWeekendAnswers(() => 'yes'))).toBeNull();
    });
  });

  describe('parseGuestCount()', () => {
    it.each([
      { value: '1', expected: 1 },
      { value: '5', expected: 5 },
      { value: 'abc', expected: null },
      { value: '', expected: null },
    ])('parses "$value" to $expected', ({ value, expected }) => {
      expect(parseGuestCount(value)).toBe(expected);
    });
  });

  describe('getNormalizedGuestCount()', () => {
    const min = 1;
    const max = 5;

    it.each([
      { value: '0', expected: 1 },
      { value: '10', expected: 5 },
      { value: 'abc', expected: 1 },
      { value: '3', expected: 3 },
    ])('normalizes "$value" to $expected', ({ value, expected }) => {
      expect(getNormalizedGuestCount(value, min, max)).toBe(expected);
    });
  });

  describe('validatePhone()', () => {
    it.each([
      // Empty - optinal field on form
      { value: '', expected: true },
      { value: '   ', expected: true },
      // Valid numbers
      { value: '0412345678', expected: true },
      { value: '+61412345678', expected: true },
      { value: '04 1234 5678', expected: true },
      { value: '+12345678901', expected: true },
      // Invalid numbers
      { value: '12345', expected: false },
      { value: '+12', expected: false },
      { value: '0412-ABCD', expected: false },
    ])('returns $expected for "$value"', ({ value, expected }) => {
      expect(validatePhone(value)).toBe(expected);
    });
  });
});
