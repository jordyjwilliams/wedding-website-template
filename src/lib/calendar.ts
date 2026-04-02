// Generate calendar invite links

import { browser } from '$app/environment';
import { PUBLIC_SITE_URL } from '$env/static/public';
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

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

function getWeddingWebsiteUrl(): string {
  if (PUBLIC_SITE_URL) {
    return normalizeUrl(PUBLIC_SITE_URL);
  }

  return browser ? normalizeUrl(window.location.origin) : '';
}

const weddingWebsiteUrl = getWeddingWebsiteUrl();
const weddingDetails = weddingWebsiteUrl
  ? `${COPY.meta.description}\n\nWebsite: ${weddingWebsiteUrl}`
  : COPY.meta.description;

// Wedding event details
export const WEDDING_EVENT: CalendarEvent = {
  title: `${WEDDING.couple.full}'s Wedding Weekend`,
  startDate: toCalendarDate(WEDDING.dates.start),
  endDate: toCalendarDate(addDays(WEDDING.dates.end, 1)),
  location: WEDDING.venue.fullAddress,
  details: weddingDetails,
};

export const weddingCalendarLink = generateGoogleCalendarLink(WEDDING_EVENT);
