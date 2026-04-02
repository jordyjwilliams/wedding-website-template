import { describe, it, expect } from 'vitest';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { handler as logoutSessionHandler } from '../../../../netlify/functions/logout-session';

// NOTE: logout-session: called in clearAuth
// Only component that uses it is only visable if VITE_DEBUG_MODE=true

const mockContext: HandlerContext = {} as HandlerContext;

type TestEvent = Partial<HandlerEvent> & {
  httpMethod: string;
  headers: Record<string, string>;
  body?: string;
};

describe('logout-session Netlify function', () => {
  it('requires POST method', async () => {
    const event: TestEvent = {
      httpMethod: 'GET',
      headers: {},
    };
    const result = (await logoutSessionHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    expect(result.statusCode).toBe(405);
  });

  it.each([
    {
      name: 'clears auth cookie on POST',
      proto: 'https',
      expectSecure: true,
      includeBaseCookieAssertions: true,
    },
    {
      name: 'sets secure cookie attributes',
      proto: 'https',
      expectSecure: true,
      includeBaseCookieAssertions: false,
    },
    // In the deployed site https will be enforced.
    // This is a purely theoretical test.
    {
      name: 'handles HTTP protocol (no Secure flag)',
      proto: 'http',
      expectSecure: false,
      includeBaseCookieAssertions: false,
    },
  ])('$name', async ({ proto, expectSecure, includeBaseCookieAssertions }) => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {
        'x-forwarded-proto': proto,
      },
    };
    const result = (await logoutSessionHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    expect(result.statusCode).toBe(200);
    const setCookie = result.headers!['Set-Cookie'];

    if (includeBaseCookieAssertions) {
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain('wedding_auth=');
      expect(setCookie).toContain('Max-Age=0'); // Immediately expires
    }

    expect(setCookie).toContain('HttpOnly');
    expect(setCookie).toContain('SameSite=Lax');
    if (expectSecure) {
      expect(setCookie).toContain('Secure');
    } else {
      expect(setCookie).not.toContain('Secure');
    }
  });

  it('includes security headers', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: { 'x-forwarded-proto': 'https' },
    };
    const result = (await logoutSessionHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    expect(result.headers!['X-Content-Type-Options']).toBe('nosniff');
    expect(result.headers!['X-Frame-Options']).toBe('DENY');
    expect(result.headers!['Cache-Control']).toBe('no-store');
  });
});
