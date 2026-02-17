// Generate calendar invite links

import { WEDDING } from './constants';

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

// Wedding event details
export const WEDDING_EVENT: CalendarEvent = {
  title: `${WEDDING.couple.full}'s Wedding Weekend`,
  startDate: toCalendarDate(WEDDING.dates.start),
  endDate: toCalendarDate(WEDDING.dates.end),
  location: WEDDING.venue.fullAddress,
  // TODO: link to website when deployed.
  details: `Join us for a three-day celebration at ${WEDDING.venue.name} on the ${WEDDING.venue.address}. Full schedule and details at [wedding website]`,
};

export const weddingCalendarLink = generateGoogleCalendarLink(WEDDING_EVENT);
