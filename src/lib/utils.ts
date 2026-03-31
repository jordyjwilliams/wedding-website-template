import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type InlineLinkSegment = {
  text: string;
  href: string | null;
};

function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/.test(href.trim());
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
    segments.push({ text: isSafeHref(href) ? label : fullMatch, href: isSafeHref(href) ? href : null });

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
