// Wedding event constants

export const WEDDING = {
  // Couple names
  couple: {
    bride: 'Partner One',
    groom: 'Partner Two',
    full: 'Partner One & Partner Two',
  },

  // Dates
  // Example dates for template: Replace as needed!
  dates: {
    start: '2027-01-01',
    end: '2027-01-03',
    ceremony: '2027-01-02',
    displayFull: '1st - 3rd January 2027',
    displayDay1: '1st January 2027',
    displayDay2: '2nd January 2027',
    displayDay3: '3rd January 2027',
  },

  // Countdown
  // NOTE: all logic for dates will be set on component.
  countdown: {
    isPastTarget: "Today's the big day!",
    isNotPastTarget: "Counting down to the big day",
  },

  // Venue
  venue: {
    name: 'Your Venue Name',
    address: 'Your City, Region',
    fullAddress: '123 Venue Street, City, Region, Country',
    displayShort: 'Your Venue Name - Your City, Region',
    description:
      'A beautiful venue with scenic views and great spaces for celebrating with family and friends.',
    website: 'https://your-venue-website.example.com',
  },

  // Contact
  contact: {
    groom: {
      email: 'partner-two@example.com',
      phone: '+00 000 000 000',
    },
    bride: {
      email: 'partner-one@example.com',
      phone: '+00 000 000 001',
    },
  },
} as const;

// Navigation routes
export const ROUTES = {
  home: '/',
  wedding: '/wedding',
  rsvp: '/rsvp',
} as const;

// Love story facts
export const LOVE_FACTS = [
  {
    icon: '☕',
    label: 'First Date',
    text: 'A memorable first date story goes here',
  },
  {
    icon: '✈️',
    label: 'Adventures',
    text: 'List a few places you have explored together',
  },
  {
    icon: '💍',
    label: 'The Proposal',
    text: 'Share where or how the proposal happened',
  },
] as const;

// Timeline events
export const TIMELINE_EVENTS = [
  {
    dayNumber: 1,
    title: 'Friday — Arrival & Welcome',
    date: WEDDING.dates.displayDay1,
    description:
      "Arrive, settle into your room and breathe in that sea air. We'll have a casual welcome drink in the evening so everyone can mingle and relax after the drive.",
    isHighlight: false,
  },
  {
    dayNumber: 2,
    title: 'Saturday — Ceremony & Celebration 💒',
    date: WEDDING.dates.displayDay2,
    description:
      'The ceremony will be held on the grounds overlooking the ocean, followed by lawn games, canapés and a relaxed dinner and dancing under the stars. TODO: Define this all properly...',
    isHighlight: true,
  },
  {
    dayNumber: 3,
    title: 'Sunday — Slow Goodbyes',
    date: WEDDING.dates.displayDay3,
    description:
      "Sleep in, grab a coffee, wander the cliffs or dip your toes in the water. We'll share a simple brunch before saying our goodbyes. Travel plans... Next steps etc etc.",
    isHighlight: false,
  },
] as const;

// Ceremony timeline
export const CEREMONY_TIMELINE = [
  { icon: 'ph:sun-horizon-fill', time: '4:00 PM', event: 'Ceremony' },
  { icon: 'ph:champagne', time: '5:30 PM', event: 'Cocktail Hour' },
  { icon: 'ph:fork-knife-fill', time: '7:00 PM', event: 'Dinner' },
  { icon: 'ph:music-notes-fill', time: '9:00 PM', event: 'Dancing' },
] as const;
