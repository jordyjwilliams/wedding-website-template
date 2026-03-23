// Shared TypeScript types for the wedding website

export interface LoveFact {
  icon: string;
  label: string;
  text: string;
}

export interface TimelineEvent {
  dayNumber: number;
  title: string;
  date: string;
  description: string;
}

export interface CeremonyTimelineItem {
  icon: string;
  time: string;
  event: string;
}

export interface Guest {
  name: string;
  email: string;
  attending: boolean;
  dietaryRequirements?: string;
  plusOne?: boolean;
  message?: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  dietaryRequirements: string;
  guests: number;
  accommodation: 'yes' | 'no' | '';
  message: string;
  side: 'bride' | 'groom' | '';
}

export interface AuthData {
  authenticated: boolean;
  timestamp: number;
  token: string;
}
