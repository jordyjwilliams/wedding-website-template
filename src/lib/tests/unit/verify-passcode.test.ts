import { describe, it, expect, beforeEach } from 'vitest';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import {
  config as verifyPasscodeConfig,
  handler as verifyPasscodeHandler,
} from '../../../../netlify/functions/verify-passcode';

const mockContext: HandlerContext = {} as HandlerContext;

type TestEvent = Partial<HandlerEvent> & {
  httpMethod: string;
  headers: Record<string, string>;
  body?: string;
};

describe('verify-passcode Netlify function', () => {
  beforeEach(() => {
    // Ensure environment variables are set
    process.env.SESSION_SIGNING_SECRET = 'test-secret-key-32-chars-minimum!';
  });

  it('rejects wrong passcode', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: { 'client-ip': '127.0.0.1' },
      body: JSON.stringify({ passcode: 'completely-wrong' }),
    };
    const result = (await verifyPasscodeHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    const body = JSON.parse(result.body!);
    expect(result.statusCode).toBe(401);
    expect(body.valid).toBe(false);
    expect(body.code).toBe('INVALID_PASSCODE');
    expect(body.message).toBe('Invalid passcode');
  });

  it('grants access for valid passcode from test setup', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: {
        'client-ip': '10.0.0.11',
        'x-forwarded-proto': 'https',
      },
      body: JSON.stringify({ passcode: process.env.WEDDING_PASSCODE }),
    };
    const result = (await verifyPasscodeHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    expect(result.statusCode).toBe(200);
    expect(result.headers!['Set-Cookie']).toContain('wedding_auth=');
    expect(result.headers!['Set-Cookie']).toContain('HttpOnly');
    const body = JSON.parse(result.body!);
    expect(body.code).toBe('ACCESS_GRANTED');
    expect(body.message).toBe('Access granted');
  });

  it('includes security headers in response', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: { 'client-ip': '127.0.0.1' },
      body: JSON.stringify({ passcode: 'test' }),
    };
    const result = (await verifyPasscodeHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;

    expect(result.headers!['X-Content-Type-Options']).toBe('nosniff');
    expect(result.headers!['X-Frame-Options']).toBe('DENY');
    expect(result.headers!['Cache-Control']).toBe('no-store');
  });

  it('rejects non POST requests', async () => {
    const event: TestEvent = {
      httpMethod: 'GET',
      headers: {},
      body: '',
    };
    const result = (await verifyPasscodeHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;
    const body = JSON.parse(result.body!);

    expect(result.statusCode).toBe(405);
    expect(body.code).toBe('METHOD_NOT_ALLOWED');
    expect(body.message).toBe('Method not allowed');
  });

  it('handles malformed JSON gracefully', async () => {
    const event: TestEvent = {
      httpMethod: 'POST',
      headers: { 'client-ip': '127.0.0.1' },
      body: 'not valid json {',
    };
    const result = (await verifyPasscodeHandler(
      event as HandlerEvent,
      mockContext
    )) as HandlerResponse;
    const body = JSON.parse(result.body!);
    expect(result.statusCode).toBe(400);
    expect(body.code).toBe('INVALID_REQUEST');
    expect(body.message).toBe('Invalid request');
  });

  it('declares native Netlify rate limiting for passcode verification', () => {
    expect(verifyPasscodeConfig.path).toBe('/.netlify/functions/verify-passcode');
      expect(verifyPasscodeConfig.rateLimit).toBeDefined();
      if (!verifyPasscodeConfig.rateLimit) {
        throw new Error('Expected verify-passcode rate limit config to be defined');
      }
      expect(verifyPasscodeConfig.rateLimit.windowLimit).toBe(5);
      expect(verifyPasscodeConfig.rateLimit.windowSize).toBe(900);
      expect(verifyPasscodeConfig.rateLimit.aggregateBy).toEqual(['ip', 'domain']);
  });

});
