// All website copy/content organized by section
// This makes it easy to update text without touching components

import { WEDDING } from './constants';

export const COPY = {
  // Meta / SEO
  meta: {
    title: `${WEDDING.couple.full} — Wedding`,
    description: `Join us for a three-day wedding weekend at ${WEDDING.venue.displayShort}`,
  },

  // Navigation
  nav: {
    brand: 'J & N',
    home: 'Home',
    aboutUs: 'Our Story',
    wedding: 'Wedding',
    venue: 'Venue',
    rsvp: 'RSVP',
  },

  // Hero Section
  hero: {
    eyebrow: "✨ We're getting married ✨",
    cta: 'RSVP Now →',
  },

  // About Us Section
  about: {
    title: 'Our Story',
    emoji: '💕',
    intro: "Every love story is beautiful, but we think our's is pretty cute.",
    story: `Once upon a time, ${WEDDING.couple.groom} was sitting on a train from Prague to Kutna Hora when he met ${WEDDING.couple.bride} (and Megan!). From a chance conversation, the rest, as they say is history.`,
    storyExtended: `
      Since that fateful train ride, we've traveled to XX countries together, lived in multiple
      cities, and now call Australia home. Every adventure, from the mundane to the magnificent,
      has been better together — whether it's hiking through the Himalayas, getting lost in
      European cities, or just enjoying a quiet coffee on a Sunday morning. Now, we're ready for
      our biggest adventure yet...
    `,
    factsSectionTitle: 'worked this out properly...',
  },

  // Wedding Details Section
  weddingDetails: {
    title: 'Wedding Weekend',
    emoji: '🌊',
    intro: `Join us for a three-day celebration at the stunning ${WEDDING.venue.name} on the ${WEDDING.venue.address}`,

    practical: {
      accommodation: {
        title: 'Accommodation',
        description:
          "Seacroft offers a mix of rooms and cabins. We'll allocate rooms once we have everyone's RSVPs and will confirm details closer to the date.",
      },
      packing: {
        title: 'What to Pack',
        description:
          "Think coastal comfort: layers for cool evenings, comfortable shoes, and anything you'd like for beach walks and outdoor time.",
      },
      transport: {
        title: 'Getting There',
        description:
          "Seacroft is located along the Great Ocean Road. Car-pooling is encouraged; we'll share more detailed directions closer to the day.",
      },
    },
  },

  // Venue Section
  venue: {
    title: WEDDING.venue.name,
    emoji: '🐠🏖️🏛️',
    intro: WEDDING.venue.description,

    features: {
      chapel: {
        title: 'The Chapel',
        description:
          "Inside: A beautifully restored 1920's chapel with stunning stained glass windows, original wood panelling, and ocean views through unique rectangular windows.",
      },
      views: {
        title: 'Ocean Views',
        description:
          'Outside: Set on 25 acres with 180-degree ocean views overlooking the Great Ocean Road. Perfect for photos and unforgettable sunsets.',
      },
      beach: {
        title: '(Private-ish) Beach',
        description:
          'Beach: Access to a secluded beach across the road. Perfect for morning swims, sunset walks, or just relaxing by the water.',
      },
      grounds: {
        title: 'Beautiful Grounds',
        description:
          'Stunning lawns and gardens, historic buildings, and even some friendly cows to keep you company during your stay.',
      },
    },

    ctaText: 'Want to learn more about this amazing venue?',
    ctaButton: `Explore ${WEDDING.venue.name}`,
  },

  // RSVP Section
  rsvp: {
    title: 'RSVP',
    emoji: '💌',
    intro: "We'd love to know if you can join us! Please RSVP by [date].",

    form: {
      name: {
        label: 'Your Name',
        placeholder: 'Enter your full name',
      },
      email: {
        label: 'Email Address',
        placeholder: 'your@email.com',
      },
      attending: {
        label: 'Will you be attending?',
        yes: "Yes, I'll be there! 🎉",
        no: "Sorry, can't make it 😢",
      },
      guests: {
        label: 'Number of Guests (including yourself)',
        description: 'Including yourself',
      },
      phone: {
        label: 'Phone Number',
        placeholder: '+61 123 456 789...',
        error: 'Please enter a valid mobile number (e.g., +61 4XX XXX XXX or 04XX XXX XXX)',
        errorRequired: 'Please enter a valid mobile number before submitting',
      },
      dietary: {
        label: 'Dietary Requirements or Allergies',
        placeholder:
          'Let us know if you have any dietary needs or allergies we should be aware of 🌱🥩',
      },
      accommodation: {
        label: 'Need Accommodation?',
        yes: 'Yes please',
        no: 'No thanks',
      },
      message: {
        label: 'Message for the Couple',
        placeholder: 'Share your excitement, request a song, or leave us a note...',
      },
      submit: 'Send RSVP',
      submitting: 'Sending...',
    },

    success: {
      title: 'RSVP Received! 🎊',
      message:
        "Thank you! We're so excited to celebrate with you. You'll receive a confirmation email shortly.",
    },

    error: {
      title: 'Oops!',
      message: 'Something went wrong. Please try again or contact us directly.',
    },

    contact: {
      title: 'Need Help?',
      description:
        "If you have trouble with the form, feel free to email or text us and we'll add your details manually.",
      bride: `👰 ${WEDDING.couple.bride}`,
      groom: `🤵 ${WEDDING.couple.groom}`,
    },
  },

  // Login/Passcode Page
  login: {
    eyebrow: 'are getting married!',
    welcome: `We're so excited to celebrate with you at ${WEDDING.venue.displayShort}. Enter the passcode from your invitation to view all the wedding details.`,
    privacy: 'This keeps our special day a little more private',
    placeholder: 'Enter passcode',
    submit: 'Enter Site ✨',
    submitting: 'Verifying...',

    errors: {
      incorrect: "Hmm, that code doesn't look quite right. Try again?",
      connection: 'Connection error. Please try again.',
    },
  },
} as const;
