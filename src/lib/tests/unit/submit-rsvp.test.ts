import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { handler as submitRsvpHandler } from '../../../../netlify/functions/submit-rsvp';

const mockContext: HandlerContext = {} as HandlerContext;

type TestEvent = Partial<HandlerEvent> & {
  httpMethod: string;
  headers: Record<string, string>;
  body?: string;
};

const VALID_BODY = JSON.stringify({
  firstName: 'Jordan',
  lastName: 'Williams',
  email: 'jordan@example.com',
  phone: '+61412345678',
  attendance: true,
  guestCount: 2,
  additionalGuestNames: ['Nicole Williams'],
  fridayEveningBbq: true,
  sundayRecoveryBreakfast: true,
  stayingOnSite: false,
  dietaryRestrictions: 'None',
  message: 'Cannot wait!',
  timestamp: new Date().toISOString(),
});

function mockFetch(response: { ok?: boolean; status?: number; body: unknown }): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: response.ok ?? true,
      status: response.status ?? 200,
      text: () => Promise.resolve(JSON.stringify(response.body)),
    })
  );
}

describe('submit-rsvp Netlify function', () => {
  beforeEach(() => {
    process.env.GOOGLE_SCRIPT_URL = 'https://test-script.example.com/exec';
    process.env.GOOGLE_SCRIPT_SECRET = 'test-script-secret';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('request method validation', () => {
    it('rejects GET requests with 405', async () => {
      const event: TestEvent = { httpMethod: 'GET', headers: {} };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(405);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('METHOD_NOT_ALLOWED');
      expect(body.status).toBe('error');
    });

    it('rejects PUT requests with 405', async () => {
      const event: TestEvent = { httpMethod: 'PUT', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(405);
    });
  });

  describe('request body validation', () => {
    it('returns 400 for invalid JSON body', async () => {
      const event: TestEvent = {
        httpMethod: 'POST',
        headers: {},
        body: 'not-valid-json{{{',
      };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('INVALID_REQUEST');
    });

    it('accepts an empty body as empty object', async () => {
      mockFetch({ body: { status: 'success' } });
      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: '' };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      // Should reach Apps Script, not fail on body parsing
      expect(result.statusCode).toBe(200);
    });
  });

  describe('successful submission', () => {
    it('returns 200 when Apps Script confirms success', async () => {
      mockFetch({ body: { status: 'success' } });

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body!);
      expect(body.status).toBe('success');
      expect(body.code).toBe('SUBMITTED');
    });

    it('attaches the shared secret to the upstream request', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify({ status: 'success' })),
      });
      vi.stubGlobal('fetch', fetchSpy);

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      await submitRsvpHandler(event as HandlerEvent, mockContext);

      const [, fetchOptions] = fetchSpy.mock.calls[0] as [string, RequestInit];
      const sentBody = JSON.parse(fetchOptions.body as string) as Record<string, unknown>;
      expect(sentBody.secret).toBe('test-script-secret');
    });

    it('does not expose the secret in the response', async () => {
      mockFetch({ body: { status: 'success' } });

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.body).not.toContain('test-script-secret');
    });
  });

  describe('duplicate email handling', () => {
    it('returns 409 when Apps Script returns duplicate status', async () => {
      mockFetch({ body: { status: 'duplicate', message: 'Email already submitted.' } });

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(409);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('DUPLICATE_ALREADY_SUBMITTED');
      expect(body.status).toBe('error');
    });
  });

  describe('upstream error handling', () => {
    it('returns 502 when Apps Script returns error status', async () => {
      mockFetch({ body: { status: 'error', message: 'Sheet not found.' } });

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(502);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('UPSTREAM_ERROR');
    });

    it('returns 502 on unexpected fetch errors', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.statusCode).toBe(502);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('UPSTREAM_ERROR');
    });
  });

  describe('response headers', () => {
    it('includes security headers on all responses', async () => {
      const event: TestEvent = { httpMethod: 'GET', headers: {} };
      const result = (await submitRsvpHandler(
        event as HandlerEvent,
        mockContext
      )) as HandlerResponse;

      expect(result.headers!['X-Content-Type-Options']).toBe('nosniff');
      expect(result.headers!['Cache-Control']).toBe('no-store');
      expect(result.headers!['Content-Type']).toBe('application/json');
    });
  });

  describe('misconfiguration', () => {
    it('returns 503 when GOOGLE_SCRIPT_URL is not set', async () => {
      // Module-level constant requires a fresh import after clearing the env var
      vi.resetModules();
      const savedUrl = process.env.GOOGLE_SCRIPT_URL;
      delete process.env.GOOGLE_SCRIPT_URL;

      const { handler } = await import('../../../../netlify/functions/submit-rsvp');
      const event: TestEvent = { httpMethod: 'POST', headers: {}, body: VALID_BODY };
      const result = (await handler(event as HandlerEvent, mockContext)) as HandlerResponse;

      expect(result.statusCode).toBe(503);
      const body = JSON.parse(result.body!);
      expect(body.code).toBe('NOT_CONFIGURED');

      // Restore for subsequent tests
      process.env.GOOGLE_SCRIPT_URL = savedUrl;
      vi.resetModules();
    });
  });
});
