import { describe, it, expect } from 'vitest';
import { parseInlineLinks } from '$lib/utils';

// cn not tested here it's from shadcn-svelte
// REF: https://github.com/huntabyte/shadcn-svelte/blob/4de0a05f149a3f9f4fb10016dea3ea62b4e9b760/docs/src/lib/utils.ts#L4-L6

describe('parseInlineLinks() - markdown link parser', () => {
  it('parses simple markdown link', () => {
    const input = '[example](https://example.com)';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'example',
        href: 'https://example.com',
      },
    ]);
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

  it('handles relative links (/path)', () => {
    const input = '[internal](/about)';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'internal',
        href: '/about',
      },
    ]);
  });

  it('handles email links (mailto:)', () => {
    const input = '[contact](mailto:test@example.com)';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'contact',
        href: 'mailto:test@example.com',
      },
    ]);
  });

  it('handles phone links (tel:)', () => {
    const input = '[call us](tel:+1234567890)';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'call us',
        href: 'tel:+1234567890',
      },
    ]);
  });

  it('handles hash/anchor links (#section)', () => {
    const input = '[jump](#top)';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'jump',
        href: '#top',
      },
    ]);
  });

  it('blocks unsafe URLs with no href safe', () => {
    const input = '[click](javascript:alert("xss"))';
    const result = parseInlineLinks(input);

    // Unsafe URLs should not be parsed as links - the whole markdown should be returned as text
    expect(result[0]?.href).toBeNull();
    expect(result[0]?.text).toContain('javascript');
  });

  it('blocks data URLs (unsafe)', () => {
    const input = '[image](data:text/html,<script>alert("xss")</script>)';
    const result = parseInlineLinks(input);

    // Data URLs are not safe - should not be parsed as links
    expect(result[0]?.href).toBeNull();
    expect(result[0]?.text).toContain('data');
  });

  it('handles plain text without links', () => {
    const input = 'Just plain text here';
    const result = parseInlineLinks(input);

    expect(result).toEqual([
      {
        text: 'Just plain text here',
        href: null,
      },
    ]);
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
