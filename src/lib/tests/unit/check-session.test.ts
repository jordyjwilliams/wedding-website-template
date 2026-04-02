import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { HandlerEvent } from '@netlify/functions';
import { handler as checkSessionHandler } from '../../../../netlify/functions/check-session';

type TestEvent = Partial<HandlerEvent> & {
  httpMethod: string;
  headers: Record<string, string>;
  body?: string;
};

describe('check-session Netlify function', () => {
  beforeEach(() => {
    process.env.SESSION_SIGNING_SECRET = 'test-secret-key-32-chars-minimum!';
  });

  afterEach(() => {
    // Restore after each test
    process.env.SESSION_SIGNING_SECRET = 'test-secret-key-32-chars-minimum!';
  });

  it('requires GET method', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {},
      body: '',
    };
    const result = await checkSessionHandler(event as HandlerEvent);

    expect(result.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('returns valid response when authenticated', async () => {
    const event: TestEvent = {
      httpMethod: 'GET',
      headers: {},
    };
    const result = await checkSessionHandler(event as HandlerEvent);

    expect(result.statusCode).toBeGreaterThanOrEqual(200);
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('valid');
    expect(typeof body.valid).toBe('boolean');
  });

  it('handles missing SECRET gracefully', async () => {
    vi.resetModules();
    delete process.env.SESSION_SIGNING_SECRET;
    const event: TestEvent = {
      httpMethod: 'GET',
      headers: {},
    };

    const { handler } = await import('../../../../netlify/functions/check-session');
    const result = await handler(event as HandlerEvent);

    expect(result.statusCode).toBe(500);
  });

  it('includes security headers', async () => {
    const event: TestEvent = {
      httpMethod: 'GET',
      headers: {},
    };
    const result = await checkSessionHandler(event as HandlerEvent);

    expect(result.headers['X-Content-Type-Options']).toBe('nosniff');
    expect(result.headers['X-Frame-Options']).toBe('DENY');
    expect(result.headers['Cache-Control']).toBe('no-store');
  });
});
