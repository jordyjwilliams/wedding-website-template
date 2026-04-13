// Netlify Serverless Function for Secure Passcode Verification
// This runs on the server, so the actual passcode is never exposed to clients

import type { Config, Handler, HandlerEvent } from '@netlify/functions';

declare const process: {
  env: Record<string, string | undefined>;
};

const CORRECT_PASSCODE = process.env.WEDDING_PASSCODE || '';
const SESSION_SIGNING_SECRET = process.env.SESSION_SIGNING_SECRET || '';
const SESSION_DURATION_SECONDS = process.env.SESSION_DURATION_SECONDS
  ? parseInt(process.env.SESSION_DURATION_SECONDS, 10)
  : 24 * 60 * 60; // Default to 24 hours if not set
// For local dev testing, allow overriding rate limits via env vars for quicker iteration.
// Usage: RATE_LIMIT_TEST_WINDOW=10 RATE_LIMIT_TEST_LIMIT=2 pnpm netlify:dev
const RATE_LIMIT_WINDOW_SECONDS = process.env.RATE_LIMIT_TEST_WINDOW
  ? parseInt(process.env.RATE_LIMIT_TEST_WINDOW, 10)
  : 15 * 60;
const RATE_LIMIT_WINDOW_LIMIT = process.env.RATE_LIMIT_TEST_LIMIT
  ? parseInt(process.env.RATE_LIMIT_TEST_LIMIT, 10)
  : 5;

if (!CORRECT_PASSCODE) {
  console.error('WEDDING_PASSCODE environment variable is not set!');
}

interface PasscodeRequest {
  passcode: string;
}

type PasscodeCode =
  | 'ACCESS_GRANTED'
  | 'SERVER_MISCONFIGURED'
  | 'METHOD_NOT_ALLOWED'
  | 'INVALID_PASSCODE'
  | 'INVALID_REQUEST';

interface PasscodeResponse {
  valid: boolean;
  message: string;
  code: PasscodeCode;
}

type HandlerResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

// Native Netlify edge rate limiting applies before this handler runs.
export const config: Config = {
  path: '/.netlify/functions/verify-passcode',
  rateLimit: {
    // action: 'rewrite',
    // to: '/.netlify/functions/rate-limited-passcode',
    windowLimit: RATE_LIMIT_WINDOW_LIMIT,
    windowSize: RATE_LIMIT_WINDOW_SECONDS,
    aggregateBy: ['ip', 'domain'],
  },
};

function generateNonce(): string {
  const randomBytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(randomBytes);
  const hex = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex;
}

function toHex(input: Uint8Array): string {
  return Array.from(input)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await globalThis.crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return toHex(new Uint8Array(signature));
}

function jsonResponse(
  statusCode: number,
  headers: Record<string, string>,
  payload: PasscodeResponse,
  extraHeaders: Record<string, string> = {}
): HandlerResponse {
  return {
    statusCode,
    headers: {
      ...headers,
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (!SESSION_SIGNING_SECRET) {
    const response: PasscodeResponse = {
      valid: false,
      message: 'Server session signing key is not configured.',
      code: 'SERVER_MISCONFIGURED',
    };
    return jsonResponse(500, headers, response);
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    const response: PasscodeResponse = {
      valid: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    };
    return jsonResponse(405, headers, response);
  }

  try {
    const { passcode } = JSON.parse(event.body || '{}') as PasscodeRequest;

    if (typeof passcode !== 'string') {
      const response: PasscodeResponse = {
        valid: false,
        message: 'Invalid request',
        code: 'INVALID_REQUEST',
      };
      return jsonResponse(400, headers, response);
    }

    // Verify passcode using constant-time comparison to prevent timing attacks
    const isValid =
      passcode.length === CORRECT_PASSCODE.length &&
      passcode
        .split('')
        .reduce(
          (acc, char, i) => acc | (char.charCodeAt(0) ^ CORRECT_PASSCODE.charCodeAt(i)),
          0
        ) === 0;

    if (isValid && passcode === CORRECT_PASSCODE) {
      const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
      const nonce = generateNonce();
      const payload = `${expiresAt}.${nonce}`;
      const signature = await signPayload(payload, SESSION_SIGNING_SECRET);
      const sessionToken = `${payload}.${signature}`;
      const isHttps = (event.headers['x-forwarded-proto'] || 'https') === 'https';

      const response: PasscodeResponse = {
        valid: true,
        message: 'Access granted',
        code: 'ACCESS_GRANTED',
      };
      return jsonResponse(200, headers, response, {
        'Set-Cookie': `wedding_auth=${sessionToken}; HttpOnly; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; SameSite=Lax${isHttps ? '; Secure' : ''}`,
      });
    } else {
      const response: PasscodeResponse = {
        valid: false,
        message: 'Invalid passcode',
        code: 'INVALID_PASSCODE',
      };
      return jsonResponse(401, headers, response);
    }
  } catch {
    const response: PasscodeResponse = {
      valid: false,
      message: 'Invalid request',
      code: 'INVALID_REQUEST',
    };
    return jsonResponse(400, headers, response);
  }
};
