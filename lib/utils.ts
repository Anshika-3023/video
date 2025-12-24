import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
 * Returns empty string if meetingId is invalid to prevent broken links.
 */
export function buildMeetingLink(meetingId: string): string {
  if (!meetingId) {
    console.error('Meeting ID is undefined, cannot build link');
    return '';
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/meeting/${meetingId}`;
}
