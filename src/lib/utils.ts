import { onMount } from 'svelte';
import { afterNavigate } from '$app/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to the element matching a URL hash string (e.g. "#saturday").
 * The 150 ms delay gives the DOM time to settle after navigation/state changes.
 */
export function scrollToHash(hash: string): void {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

/**
 * Svelte composable: reads the current hash on mount and after SvelteKit
 * navigation, invoking `handler` whenever a hash is present.
 *
 * Set `listenHashChange: true` when the component also needs to respond to
 * in-page hashchange events (e.g. accordion-style links within the same page).
 *
 * Must be called synchronously during component initialisation.
 */
export function useHashNavigation(
  handler: (hash: string) => void,
  { listenHashChange = false }: { listenHashChange?: boolean } = {}
): void {
  onMount(() => {
    if (window.location.hash) handler(window.location.hash);

    if (listenHashChange) {
      const onHashChange = () => {
        if (window.location.hash) handler(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }
  });

  afterNavigate(({ to }) => {
    if (to?.url.hash) handler(to.url.hash);
  });
}

export type InlineLinkSegment = {
  text: string;
  href: string | null;
  bold?: boolean;
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
  return /^(https?:\/\/|mailto:|tel:|tooltip:|\/|#)/.test(href.trim());
}
// Detects if a link is an external/absolute URL
export function isExternalLink(href: string): boolean {
  return /^https?:\/\//.test(href);
}
// Parse simple markdown (bold **text** and links [label](href)) into safe segments.
export function parseInlineLinks(input: string): InlineLinkSegment[] {
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const segments: InlineLinkSegment[] = [];
  let cursor = 0;

  for (const match of input.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;
    const [fullMatch, boldText, rawLabel, rawHref] = match;

    if (matchIndex > cursor) {
      segments.push({ text: input.slice(cursor, matchIndex), href: null });
    }

    if (boldText !== undefined) {
      segments.push({ text: boldText, href: null, bold: true });
    } else {
      const label = String(rawLabel);
      const href = String(rawHref).trim();
      const safeHref = isSafeHref(href);
      segments.push({
        text: safeHref ? label : fullMatch,
        href: safeHref ? href : null,
      });
    }

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
