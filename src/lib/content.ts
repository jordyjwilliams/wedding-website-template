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
    brand: 'X & Y',
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
    emoji: '',
    intro: 'Every love story is unique. This is where yours begins.',
    story: `Share how ${WEDDING.couple.groom} and ${WEDDING.couple.bride} met and what made that moment special.`,
    storyExtended: `
      Add your relationship highlights here: places you've visited, milestones you've celebrated,
      and the moments that brought you closer together. Keep this section in your own voice so
      guests feel connected to your journey. This is also a great place to share a little humor,
      gratitude, and excitement for the wedding weekend ahead.
    `,
    factsSectionTitle: 'A Few Fun Facts',
  },

  // Wedding Details Section
  weddingDetails: {
    title: 'Wedding Weekend',
    emoji: '',
    intro: `Join us for a three-day celebration at the stunning ${WEDDING.venue.name} on the ${WEDDING.venue.address}`,

    practical: {
      accommodation: {
        title: 'Accommodation',
        description:
          'Share accommodation details here, including room options, booking approach, and when guests can expect confirmation.',
      },
      packing: {
        title: 'What to Pack',
        description:
          "Think coastal comfort: layers for cool evenings, comfortable shoes, and anything you'd like for beach walks and outdoor time.",
      },
      transport: {
        title: 'Getting There',
        description:
          'Add travel guidance, transfer options, and any parking or car-pooling recommendations for guests.',
      },
    },
  },

  // Venue Section
  venue: {
    title: WEDDING.venue.name,
    emoji: '',
    intro: WEDDING.venue.description,
    features: {
      chapel: {
        title: 'The Ceremony Space',
        description:
          'Describe the main ceremony area and what guests can expect when they arrive.',
      },
      views: {
        title: 'Scenic Views',
        description:
          'Highlight the surrounding scenery and any standout photography spots at your venue.',
      },
      beach: {
        title: 'Nearby Nature',
        description:
          'Mention nearby beaches, gardens, trails, or local attractions guests can enjoy during the weekend.',
      },
      grounds: {
        title: 'Venue Highlights',
        description:
          'Add any extra details guests should know, like gardens, architecture, local character, or unique spaces.',
      },
    },

    ctaText: 'Want to learn more about this amazing venue?',
    ctaButton: `Explore ${WEDDING.venue.name}`,
  },

  // RSVP Section
  rsvp: {
    title: 'RSVP',
    emoji: '',
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
