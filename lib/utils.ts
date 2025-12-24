import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMeetingId(): string {
  return crypto.randomUUID();
}

export function generatePersonalMeetingId(userId: string): string {
  return `personal-${userId}`;
}

export function buildMeetingLink(meetingId: string): string {
  if (!meetingId) {
    console.error('Meeting ID is undefined, cannot build link');
    return '';
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/meeting/${meetingId}`;
}
