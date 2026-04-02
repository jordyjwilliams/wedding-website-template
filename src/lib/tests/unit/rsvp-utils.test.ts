import { describe, expect, it } from 'vitest';
import {
  getNormalizedGuestCount,
  isAttendanceResponse,
  parseGuestCount,
  validatePhone,
} from '$lib/rsvp/utils';

// Simple unit tests for RSVP form handling utilities.
describe('rsvp/utils', () => {
  describe('isAttendanceResponse()', () => {
    it.each([
      { value: 'yes', expected: true },
      { value: 'no', expected: true },
      // Simulating initial unselected case - want to have nice placeholder
      { value: 'maybe', expected: false },
      { value: '', expected: false },
    ])('returns $expected for "$value"', ({ value, expected }) => {
      expect(isAttendanceResponse(value)).toBe(expected);
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
