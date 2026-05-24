import { describe, it, expect } from 'vitest';
import { parseInlineLinks, isExternalLink, getCountdownTimeLeft } from '$lib/utils';

// Melbourne time example for testing other tz
const testDateTimeStr = '2027-03-20T16:00:00+10:00';
// cn not tested here it's from shadcn-svelte
// REF: https://github.com/huntabyte/shadcn-svelte/blob/4de0a05f149a3f9f4fb10016dea3ea62b4e9b760/docs/src/lib/utils.ts#L4-L6

describe('parseInlineLinks() - markdown link parser', () => {
  it.each([
    {
      name: 'parses simple markdown link',
      input: '[example](https://example.com)',
      expected: [{ text: 'example', href: 'https://example.com' }],
    },
    {
      name: 'handles relative links (/path)',
      input: '[internal](/about)',
      expected: [{ text: 'internal', href: '/about' }],
    },
    {
      name: 'handles email links (mailto:)',
      input: '[contact](mailto:test@example.com)',
      expected: [{ text: 'contact', href: 'mailto:test@example.com' }],
    },
    {
      name: 'handles phone links (tel:)',
      input: '[call us](tel:+1234567890)',
      expected: [{ text: 'call us', href: 'tel:+1234567890' }],
    },
    {
      name: 'handles hash/anchor links (#section)',
      input: '[jump](#top)',
      expected: [{ text: 'jump', href: '#top' }],
    },
    {
      name: 'handles tooltip links (tooltip:token)',
      input: '[view detail](tooltip:beers)',
      expected: [{ text: 'view detail', href: 'tooltip:beers' }],
    },
    {
      name: 'handles plain text without links',
      input: 'Just plain text here',
      expected: [{ text: 'Just plain text here', href: null }],
    },
  ])('$name', ({ input, expected }) => {
    const result = parseInlineLinks(input);

    expect(result).toEqual(expected);
  });

  it('parses multiple markdown links', () => {
    const input = 'Check [link1](https://a.com) and [link2](https://b.com)';
    const result = parseInlineLinks(input);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]?.text).toBe('Check ');
    expect(result[0]?.href).toBeNull();
    expect(result[1]?.text).toBe('link1');
    expect(result[1]?.href).toBe('https://a.com');
    // Verify we have at least one more link
    const link2 = result.find((seg) => seg.text === 'link2');
    expect(link2?.href).toBe('https://b.com');
  });

  it('handles text before and after links', () => {
    const input = 'Start [link](https://example.com) end';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      { text: 'Start ', href: null },
      { text: 'link', href: 'https://example.com' },
      { text: ' end', href: null },
    ]);
  });

  it.each([
    {
      name: 'blocks unsafe URLs with no href safe',
      input: '[click](javascript:alert("xss"))',
      blockedText: 'javascript',
    },
    {
      name: 'blocks data URLs (unsafe)',
      input: '[image](data:text/html,<script>alert("xss")</script>)',
      blockedText: 'data',
    },
  ])('$name', ({ input, blockedText }) => {
    const result = parseInlineLinks(input);

    // Unsafe URLs should not be parsed as links - the whole markdown should be returned as text
    expect(result[0]?.href).toBeNull();
    expect(result[0]?.text).toContain(blockedText);
  });

  it('handles empty string', () => {
    const input = '';
    const result = parseInlineLinks(input);

    // Empty input returns empty array
    expect(result).toHaveLength(0);
  });

  it('handles links with spaces in URLs', () => {
    const input = '[example](https ://example.com)';
    const result = parseInlineLinks(input);
    // Spaces in URLs are invalid, should not be parsed as safe
    expect(result[0]?.href).toBeNull();
  });
});

describe('isExternalLink() - detects external URLs', () => {
  it.each([
    {
      name: 'identifies https URLs as external',
      href: 'https://example.com',
      expected: true,
    },
    {
      name: 'identifies http URLs as external',
      href: 'http://example.com',
      expected: true,
    },
    {
      name: 'identifies relative paths as internal',
      href: '/about',
      expected: false,
    },
    {
      name: 'identifies hash anchors as internal',
      href: '#section',
      expected: false,
    },
    {
      name: 'identifies email links as internal',
      href: 'mailto:test@example.com',
      expected: false,
    },
    {
      name: 'identifies tel links as internal',
      href: 'tel:+1234567890',
      expected: false,
    },
    {
      name: 'identifies javascript URLs as internal',
      href: 'javascript:void(0)',
      expected: false,
    },
  ])('$name', ({ href, expected }) => {
    expect(isExternalLink(href)).toBe(expected);
  });
});

describe('getCountdownTimeLeft() - countdown math', () => {
  it('returns expected day/hour/minute/second breakdown', () => {
    const nowUtcMs = Date.UTC(2027, 2, 20, 0, 0, 0);
    const targetUtcMs = nowUtcMs + (1 * 86_400 + 2 * 3_600 + 3 * 60 + 4) * 1000;

    expect(getCountdownTimeLeft(targetUtcMs, nowUtcMs)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it('returns zeros once target time has passed', () => {
    const nowUtcMs = Date.UTC(2027, 2, 20, 0, 0, 5);
    const targetUtcMs = Date.UTC(2027, 2, 20, 0, 0, 0);

    expect(getCountdownTimeLeft(targetUtcMs, nowUtcMs)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});

describe('ceremonyDateTime timezone rendering - international visitors', () => {
  function getDateTimePartsInZone(date: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((part) => part.type === type)?.value ?? '0');

    return {
      year: get('year'),
      month: get('month'),
      day: get('day'),
      hour: get('hour'),
      minute: get('minute'),
    };
  }

  it('renders the expected local time for UK visitors', () => {
    const ceremony = new Date(testDateTimeStr);
    const uk = getDateTimePartsInZone(ceremony, 'Europe/London');

    expect(uk).toEqual({
      year: 2027,
      month: 3,
      day: 20,
      hour: 6,
      minute: 0,
    });
  });

  it('renders the expected local time for USA visitors (New York)', () => {
    const ceremony = new Date(testDateTimeStr);
    const usNy = getDateTimePartsInZone(ceremony, 'America/New_York');

    expect(usNy).toEqual({
      year: 2027,
      month: 3,
      day: 20,
      hour: 2,
      minute: 0,
    });
  });
});
