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
    faqs: 'FAQs',
    rsvp: 'RSVP',
  },

  // Hero Section
  hero: {
    eyebrow: 'are getting married',
    ctaButton: 'RSVP Now →',
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
  // NOTE: all other info on `WeddingDetails` is set by `event` and `ceremony`
  weddingDetails: {
    title: 'Wedding Weekend',
    emoji: '',
    intro: `Join us for a three-day celebration at the stunning ${WEDDING.venue.name} on the ${WEDDING.venue.address}`,
    ctaText: 'Want to learn more about our event, or have questions?',
    ctaButton: 'Check out our FAQs',
  },

  // FAQ Section
  faq: {
    title: 'FAQ',
    emoji: '',
    intro:
      "We've put together some answers to questions we think you might have about the wedding weekend. More information will be added in due course here.",
    practical: {
      accommodation: {
        title: 'Accommodation',
        icon: 'ph:house-bold',
        description: `Share accommodation details here, including room options, booking approach, and when guests can expect confirmation.`,
        bullets: [
          'Check-in available from 2pm Friday',
          'Complimentary breakfast included daily',
          'Free on-site parking for all guests',
          'Contact concierge for early check-in requests',
        ],
      },
      dressCode: {
        title: 'Dress Code',
        icon: 'ph:high-heel-bold',
        description: `Formal elegant attire requested for the ceremony and reception.

We recommend light layers for outdoor events, and comfortable shoes for the welcome drinks and garden strolls.`,
        bullets: [
          'Ceremony: Formal elegant (suits, dresses, cocktail attire)',
          'Reception: Same as ceremony',
          'Welcome drinks: Smart casual fine',
          'Outdoor events: Layer up, sun protection recommended',
        ],
      },
      gifts: {
        title: 'Gifts',
        icon: 'ph:gift-bold',
        description: `Your presence is our greatest gift! We've set up a registry if you'd like to give something.`,
        bullets: [
          'Registry link: [coming soon]',
          'Monetary gifts welcome via bank transfer',
          'Gift vouchers to local experiences appreciated',
          'No gifts necessary — your attendance means the world',
        ],
      },
      weather: {
        title: 'Weather',
        icon: 'ph:cloud-sun-bold',
        description: `Expect mild summer weather with occasional warm afternoons.

Pack layers for cooler evenings and bring sun protection for daytime events.`,
        bullets: [
          'Average temperature: 22-26°C (72-79°F)',
          'Pack: Light layers, hat, sunscreen, sunglasses',
          'Umbrella recommended (occasional showers)',
          'Comfortable walking shoes essential',
        ],
      },
      kids: {
        title: 'Kids',
        icon: 'ph:baby-carriage-bold',
        description: `Children are absolutely welcome! We want families to celebrate together.`,
        bullets: [
          'Kids activities and childcare available during reception',
          'High chairs and bottle warmers provided',
          'Special kids menu available',
          'Quiet space available for breaks',
        ],
      },
      plusOne: {
        title: 'Plus Ones',
        icon: 'ph:hand-heart-bold',
        description: `We've allocated plus ones based on your invitation. Additional guests have been included where indicated.`,
        bullets: [
          'Plus ones confirmed on your invitation',
          'Partners/spouses automatically included',
          'Feel free to bring a date if indicated on your invite',
          'Let us know ASAP if circumstances change',
        ],
      },
      packing: {
        title: 'What to Pack',
        icon: 'ph:backpack-bold',
        description: `Think coastal comfort! Here's a packing guide for our weekend celebration.`,
        bullets: [
          'Light layers and comfortable shoes for all day',
          'Sun protection: hat, sunscreen, sunglasses',
          'Formal outfit for ceremony and reception',
          'Smart casual for other events',
          'Light jacket or wrap for cool evenings',
          "Beach outfit if you'd like to explore nearby",
        ],
      },
      transport: {
        title: 'Getting There',
        icon: 'ph:car-bold',
        description: `Multiple transport options available for your convenience.`,
        bullets: [
          'Complimentary shuttle service from downtown (details TBA)',
          'Ample on-site parking available (free for guests)',
          'Public transit: Bus route 42 or train station 10-min walk',
          'Ride-share pickup near main entrance',
          'Carpooling encouraged — ask on the Facebook group',
          'Contact us if you need transport assistance',
        ],
      },
      accommodationAlternatives: {
        title: 'Accommodation Alternatives',
        icon: 'ph:bed-bold',
        description: `While we have on-site options, here are excellent nearby alternatives if you prefer to stay off-site.`,
        bullets: [
          'Hotel A: 5 mins away (mention discount code if available)',
          'Hotel B: 10 mins away (group rate available)',
          'Airbnb/vacation rentals: Highly rated in surrounding area',
          'Budget options: Hostels and guest houses nearby',
          'All within 15-minute radius of venue',
        ],
      },
      thingsToDo: {
        title: 'Things to Do',
        icon: 'ph:map-pin-area-bold',
        description: `Explore the beautiful area during the wedding weekend. Here are some favorite local spots.`,
        bullets: [
          'Scenic beach walks along the coastline',
          'Local farmers market (Saturdays 8am-1pm)',
          'Hiking trails with stunning views',
          'Quaint village shops and cafes',
          'Water sports rentals on the beach',
          'Local restaurants: [add recommendations]',
        ],
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
        description: 'Describe the main ceremony area and what guests can expect when they arrive.',
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
        firstNameLabel: 'First Name',
        firstNamePlaceholder: 'First name',
        lastNameLabel: 'Last Name',
        lastNamePlaceholder: 'Last name',
      },
      email: {
        label: 'Email Address',
        placeholder: 'your@email.com',
      },
      attending: {
        label: 'Will you be attending?',
        yes: "Yes, I'll be there! 🎉",
        no: "Sorry, can't make it 😢",
        placeholder: 'Please select...',
        errorRequired: 'Please select whether you are attending before submitting.',
      },
      guests: {
        label: 'Number of Guests (including yourself)',
        description: 'Including yourself',
        additionalNamesLabel: 'Additional Guest Full Name(s)',
        additionalNamePlaceholderPrefix: 'Guest',
        additionalNamesRequired: 'Please add the full name for each additional guest.',
      },
      phone: {
        label: 'Phone Number: (Include Country Code)',
        placeholder: '+61 123 456 789 (AU) or +1 123 456 7890 (US)...',
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
      title: 'RSVP Received!',
      attending:
        "🎊 Thank you! We're so excited to celebrate with you. You'll receive a confirmation email shortly.",
      notAttending:
        "😢 Thank you for letting us know. We'll miss celebrating with you in person and really appreciate your RSVP.",
    },

    error: {
      title: 'Oops!',
      message: 'Something went wrong. Please try again or contact us directly.',
      timeout:
        'Request timed out. Please check your internet connection and try again, or contact us directly.',
      submitFailed: 'Oops! Something went wrong. Please try again or contact us directly.',
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
