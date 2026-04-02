import { describe, it, expect } from 'vitest';
import { parseInlineLinks } from '$lib/utils';

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
    expect(result[0].href).toBeNull();
  });
});
