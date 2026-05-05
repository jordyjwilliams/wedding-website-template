import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type InlineLinkSegment = {
  text: string;
  href: string | null;
};

export type CountdownTimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdownTimeLeft(
  targetUtcMs: number,
  nowUtcMs = Date.now()
): CountdownTimeLeft {
  const diff = targetUtcMs - nowUtcMs;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/.test(href.trim());
}
// Detects if a link is an external/absolute URL
export function isExternalLink(href: string): boolean {
  return /^https?:\/\//.test(href);
}
// Parse simple markdown links ([label](href)) into safe text/link segments.
export function parseInlineLinks(input: string): InlineLinkSegment[] {
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const segments: InlineLinkSegment[] = [];
  let cursor = 0;

  for (const match of input.matchAll(markdownLinkPattern)) {
    const matchIndex = match.index ?? 0;
    const [fullMatch, rawLabel, rawHref] = match;

    if (matchIndex > cursor) {
      segments.push({ text: input.slice(cursor, matchIndex), href: null });
    }

    const label = String(rawLabel);
    const href = String(rawHref).trim();
    const safeHref = isSafeHref(href);
    segments.push({
      text: safeHref ? label : fullMatch,
      href: safeHref ? href : null,
    });

    cursor = matchIndex + fullMatch.length;
  }

  if (cursor < input.length) {
    segments.push({ text: input.slice(cursor), href: null });
  }

  return segments;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
