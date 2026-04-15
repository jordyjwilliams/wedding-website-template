// Wedding event constants

export const WEDDING = {
  // Couple names
  couple: {
    bride: 'Nicole',
    groom: 'Jordy',
    full: 'Jordy & Nicole',
    initials: 'J & N',
  },

  // Dates
  dates: {
    start: '2027-03-19',
    end: '2027-03-21',
    ceremony: '2027-03-20',
    displayFull: '19th - 21st March 2027',
    displayDay1: '19th March 2027',
    displayDay2: '20th March 2027',
    displayDay3: '21st March 2027',
  },

  // Countdown
  // NOTE: all logic for dates will be set on component.
  countdown: {
    isPastTarget: "Today's the big day!",
    isNotPastTarget: 'Counting down to the big day',
  },

  // Venue
  venue: {
    name: 'Seacroft Estate',
    address: 'Great Ocean Road, VIC',
    fullAddress: '4990 Great Ocean Rd, Sugarloaf VIC 3234, Australia',
    displayShort: 'Seacroft Estate · Great Ocean Road, VIC',
    description:
      'A historic estate on 25 acres with breathtaking 180° views over the iconic Great Ocean Road.',
    website: 'https://www.seacroft.com/weddings/',
  },

  // Contact
  contact: {
    groom: {
      email: 'jordy_williams@hotmail.co.uk',
      phone: '+61 403 765 534',
    },
    bride: {
      email: 'nfrances369@gmail.com',
      phone: '+61 403 932 003',
    },
  },
} as const;

export const RSVP_LIMITS = {
  guestCountMin: 1,
  guestCountMax: 5, // Including main guest
} as const;

// Love story facts
export const LOVE_FACTS = [
  {
    icon: 'ph:coffee',
    animation: 'pulse',
    label: 'First Date',
    text: 'Trains, then a trip in a murder van to Iceland 🇮🇸',
  },
  {
    icon: 'ph:airplane-tilt',
    animation: 'pulse',
    label: 'Adventures',
    text: 'XX countries together. Current location: 🇦🇺',
  },
  {
    icon: 'ph:sketch-logo',
    animation: 'pulse',
    label: 'The Proposal',
    text: 'Larkya La Pass, Nepal',
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
