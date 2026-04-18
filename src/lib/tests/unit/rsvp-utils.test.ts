import { describe, expect, it } from 'vitest';
import {
  createYesNoOptions,
  getNormalizedGuestCount,
  getMissingRequiredWeekendField,
  isYesNoResponse,
  optionalYesNoToBoolean,
  parseGuestCount,
  RSVP_WEEKEND_FIELDS,
  RSVP_WEEKEND_TRIGGER_IDS,
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
    it('keeps weekend field order stable', () => {
      expect(RSVP_WEEKEND_FIELDS).toEqual([
        'fridayEveningBbq',
        'sundayRecoveryBreakfast',
        'stayingOnSite',
      ]);
    });

    it('maps weekend fields to select trigger IDs', () => {
      expect(RSVP_WEEKEND_TRIGGER_IDS).toEqual({
        fridayEveningBbq: 'friday-evening-bbq-trigger',
        sundayRecoveryBreakfast: 'sunday-recovery-breakfast-trigger',
        stayingOnSite: 'staying-on-site-trigger',
      });
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
    it('returns first missing field in configured order', () => {
      expect(
        getMissingRequiredWeekendField({
          fridayEveningBbq: undefined,
          sundayRecoveryBreakfast: undefined,
          stayingOnSite: undefined,
        })
      ).toBe('fridayEveningBbq');

      expect(
        getMissingRequiredWeekendField({
          fridayEveningBbq: 'yes',
          sundayRecoveryBreakfast: undefined,
          stayingOnSite: undefined,
        })
      ).toBe('sundayRecoveryBreakfast');

      expect(
        getMissingRequiredWeekendField({
          fridayEveningBbq: 'yes',
          sundayRecoveryBreakfast: 'no',
          stayingOnSite: undefined,
        })
      ).toBe('stayingOnSite');
    });

    it('returns null when all required weekend fields are answered', () => {
      expect(
        getMissingRequiredWeekendField({
          fridayEveningBbq: 'yes',
          sundayRecoveryBreakfast: 'no',
          stayingOnSite: 'yes',
        })
      ).toBeNull();
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
