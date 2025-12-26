import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Environment-aware logging utility
export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(...args);
    }
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique meeting ID using crypto.randomUUID.
 * This ensures each meeting has a globally unique identifier.
 */
export function generateMeetingId(): string {
  return crypto.randomUUID();
}

/**
 * Generates a personal meeting ID based on the user's ID.
 * Format: personal-{userId}
 * This creates a consistent personal room for each user.
 */
export function generatePersonalMeetingId(userId: string): string {
  return `personal-${userId}`;
}

/**
 * Builds a shareable meeting link from the meeting ID.
 * The link directs users to the meeting page where they can join.
 * Throws error if baseUrl cannot be resolved to prevent silent failures.
 * Uses NEXT_PUBLIC_APP_URL for production deployment consistency.
 */
export function buildMeetingLink(meetingId: string): string {
  if (!meetingId) {
    throw new Error('Meeting ID is required to build meeting link');
  }

  // Use NEXT_PUBLIC_APP_URL for production, fallback to window.location.origin for local dev
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');

  if (!baseUrl) {
    throw new Error('Base URL not available - configure NEXT_PUBLIC_APP_URL or ensure window.location is accessible');
  }

  return `${baseUrl}/meeting/${meetingId}`;
}
