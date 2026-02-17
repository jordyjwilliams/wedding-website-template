// Generate calendar invite links

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

// Wedding event details
export const WEDDING_EVENT: CalendarEvent = {
  title: "Jordy & Nicole's Wedding Weekend",
  startDate: '20270319', // March 19, 2027
  endDate: '20270321', // March 21, 2027
  location: 'Seacroft Estate, 4990 Great Ocean Rd, Sugarloaf VIC 3234, Australia',
  details:
    'Join us for a three-day celebration at Seacroft Estate on the Great Ocean Road. Full schedule and details at [wedding website]',
};

export const weddingCalendarLink = generateGoogleCalendarLink(WEDDING_EVENT);
