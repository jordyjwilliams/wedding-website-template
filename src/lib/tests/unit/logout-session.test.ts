import { describe, it, expect } from 'vitest';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';
import { handler as logoutSessionHandler } from '../../../../netlify/functions/logout-session';

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
    const result = await logoutSessionHandler(event as HandlerEvent, mockContext);

    expect(result.statusCode).toBe(405);
  });

  it('clears auth cookie on POST', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {
        'x-forwarded-proto': 'https',
      },
    };
    const result = await logoutSessionHandler(event as HandlerEvent, mockContext);

    expect(result.statusCode).toBe(200);
    expect(result.headers['Set-Cookie']).toBeDefined();
    expect(result.headers['Set-Cookie']).toContain('wedding_auth=');
    expect(result.headers['Set-Cookie']).toContain('Max-Age=0'); // Immediately expires
  });

  it('sets secure cookie attributes', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {
        'x-forwarded-proto': 'https',
      },
    };
    const result = await logoutSessionHandler(event as HandlerEvent, mockContext);

    expect(result.headers['Set-Cookie']).toContain('HttpOnly');
    expect(result.headers['Set-Cookie']).toContain('SameSite=Lax');
    expect(result.headers['Set-Cookie']).toContain('Secure');
  });

  // NOTE: https enforced by setup and netlify.
  // Theoretical validation.
  it('handles HTTP protocol (no Secure flag)', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {
        'x-forwarded-proto': 'http',
      },
    };
    const result = await logoutSessionHandler(event as HandlerEvent, mockContext);
    expect(result.statusCode).toBe(200);
    // Should not have Secure flag for HTTP
    const setCookie = result.headers['Set-Cookie'];
    expect(setCookie).toContain('HttpOnly');
    expect(setCookie).toContain('SameSite=Lax');
  });

  it('includes security headers', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: { 'x-forwarded-proto': 'https' },
    };
    const result = await logoutSessionHandler(event as HandlerEvent, mockContext);

    expect(result.headers['X-Content-Type-Options']).toBe('nosniff');
    expect(result.headers['X-Frame-Options']).toBe('DENY');
    expect(result.headers['Cache-Control']).toBe('no-store');
  });
});
