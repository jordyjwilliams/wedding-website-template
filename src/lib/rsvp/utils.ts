import type {
  OptionalYesNoResponse,
  RsvpWeekendQuestion,
  RsvpWeekendAnswers,
  YesNoLabels,
  YesNoOption,
  RsvpWeekendFieldKey,
  YesNoResponse,
} from '$lib/rsvp/types';
import { COPY } from '$lib/content';

export const selectYesNoQuestions = COPY.rsvp.form.selectYesNoQuestions;

export const RSVP_WEEKEND_FIELDS = selectYesNoQuestions.map((q) => q.key) as RsvpWeekendFieldKey[];

export const RSVP_WEEKEND_TRIGGER_IDS = Object.fromEntries(
  selectYesNoQuestions.map((q) => [q.key, q.triggerId])
) as Record<RsvpWeekendFieldKey, string>;

export const RSVP_WEEKEND_QUESTIONS_BY_KEY = Object.fromEntries(
  selectYesNoQuestions.map((q) => [q.key, q])
) as Record<RsvpWeekendFieldKey, RsvpWeekendQuestion>;

export type { RsvpWeekendFieldKey };

export function createYesNoOptions(labels: YesNoLabels): YesNoOption[] {
  return [
    { value: 'yes', label: labels.yes },
    { value: 'no', label: labels.no },
  ];
}

// Necessary to handle initial undefined/unselected state.
export function isYesNoResponse(value: string): value is YesNoResponse {
  return value === 'yes' || value === 'no';
}

export function yesNoToBoolean(value: YesNoResponse): boolean {
  return value === 'yes';
}

export function optionalYesNoToBoolean(value: OptionalYesNoResponse, fallback = false): boolean {
  if (!value) return fallback;

  return yesNoToBoolean(value);
}

export function createWeekendAnswers<TAnswer>(
  createValue: (field: RsvpWeekendFieldKey) => TAnswer
): Record<RsvpWeekendFieldKey, TAnswer> {
  return Object.fromEntries(
    RSVP_WEEKEND_FIELDS.map((field) => [field, createValue(field)])
  ) as Record<RsvpWeekendFieldKey, TAnswer>;
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
