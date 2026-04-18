import type {
  OptionalYesNoResponse,
  RsvpWeekendAnswers,
  RsvpWeekendFieldKey,
  YesNoLabels,
  YesNoOption,
  YesNoResponse,
} from '$lib/rsvp/types';

// Necessary to handle initial undefined/unselected state.
export function isAttendanceResponse(value: string): value is AttendanceResponse {
  return value === 'yes' || value === 'no';
}

export function yesNoToBoolean(value: YesNoResponse): boolean {
  return value === 'yes';
}

export function optionalYesNoToBoolean(
  value: OptionalYesNoResponse,
  fallback = false
): boolean {
  if (!value) return fallback;

  return yesNoToBoolean(value);
}

export function getMissingRequiredWeekendField(
  answers: RsvpWeekendAnswers<OptionalYesNoResponse>
): RsvpWeekendFieldKey | null {
  for (const field of RSVP_WEEKEND_FIELDS) {
    if (!answers[field]) return field;
  }

  return null;
}

export function parseGuestCount(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function getNormalizedGuestCount(value: string, min: number, max: number): number {
  const parsedGuestCount = parseGuestCount(value);
  if (parsedGuestCount === null) return min;

  return Math.min(max, Math.max(min, parsedGuestCount));
}

export function validatePhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return true;

  const cleanPhone = phone.replace(/[\s()-]/g, '');

  const australianMobileRegex = /^(\+61|0)?4\d{8}$/;
  const internationalRegex = /^\+\d{7,15}$/;

  return australianMobileRegex.test(cleanPhone) || internationalRegex.test(cleanPhone);
}
