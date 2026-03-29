// Generate calendar invite links

import { WEDDING } from '$lib/constants';
import { COPY } from '$lib/content';

export interface CalendarEvent {
  title: string;
  startDate: string; // YYYYMMDD
  endDate: string; // YYYYMMDD
  location: string;
  details: string;
}

export function generateGoogleCalendarLink(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.startDate}/${event.endDate}`,
    details: event.details,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Helper to convert ISO date (YYYY-MM-DD) to calendar format (YYYYMMDD)
function toCalendarDate(isoDate: string): string {
  return isoDate.replace(/-/g, '');
}

// Google all-day events use an exclusive end date, so add one day.
function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

// Wedding event details
export const WEDDING_EVENT: CalendarEvent = {
  title: `${WEDDING.couple.full}'s Wedding Weekend`,
  startDate: toCalendarDate(WEDDING.dates.start),
  endDate: toCalendarDate(addDays(WEDDING.dates.end, 1)),
  location: WEDDING.venue.fullAddress,
  // TODO: link to website when deployed.
  details: `${COPY.meta.description}`,
};

export const weddingCalendarLink = generateGoogleCalendarLink(WEDDING_EVENT);
