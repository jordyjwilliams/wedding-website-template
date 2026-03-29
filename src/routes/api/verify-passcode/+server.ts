// SvelteKit API route for secure passcode verification
// Replaces: netlify/functions/verify-passcode.ts
// This runs on the server — the actual passcode is never exposed to clients.

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const SESSION_DURATION_SECONDS = 24 * 60 * 60;

interface PasscodeRequest {
  passcode: string;
}

interface PasscodeResponse {
  valid: boolean;
  message: string;
}

// Rate limiting: track attempts per IP
const attemptTracker = new Map<string, number[]>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = attemptTracker.get(ip) || [];
  const recentAttempts = attempts.filter((t) => now - t < WINDOW_MS);
  attemptTracker.set(ip, recentAttempts);
  return recentAttempts.length >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string): void {
  const now = Date.now();
  const attempts = attemptTracker.get(ip) || [];
  const recentAttempts = attempts.filter((t) => now - t < WINDOW_MS);
  recentAttempts.push(now);
  attemptTracker.set(ip, recentAttempts);
}

function generateNonce(): string {
  const randomBytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
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

const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const clientIp = getClientAddress();
  const CORRECT_PASSCODE = process.env.WEDDING_PASSCODE || '';
  const SESSION_SIGNING_SECRET = process.env.SESSION_SIGNING_SECRET || '';

  if (!CORRECT_PASSCODE) {
    console.error('WEDDING_PASSCODE environment variable is not set!');
  }

  if (!SESSION_SIGNING_SECRET) {
    return json(
      {
        valid: false,
        message: 'Server session signing key is not configured.',
      } satisfies PasscodeResponse,
      { status: 500, headers: securityHeaders }
    );
  }

  if (isRateLimited(clientIp)) {
    return json(
      {
        valid: false,
        message: 'Too many attempts. Please try again later.',
      } satisfies PasscodeResponse,
      { status: 429, headers: securityHeaders }
    );
  }

  let body: PasscodeRequest;
  try {
    body = (await request.json()) as PasscodeRequest;
  } catch {
    return json(
      { valid: false, message: 'Invalid request' } satisfies PasscodeResponse,
      { status: 400, headers: securityHeaders }
    );
  }

  const { passcode } = body;

  recordAttempt(clientIp);

  // Verify passcode using constant-time comparison to prevent timing attacks
  const isValid =
    passcode.length === CORRECT_PASSCODE.length &&
    passcode
      .split('')
      .reduce((acc, char, i) => acc | (char.charCodeAt(0) ^ CORRECT_PASSCODE.charCodeAt(i)), 0) ===
      0;

  if (isValid && passcode === CORRECT_PASSCODE) {
    const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
    const nonce = generateNonce();
    const payload = `${expiresAt}.${nonce}`;
    const signature = await signPayload(payload, SESSION_SIGNING_SECRET);
    const sessionToken = `${payload}.${signature}`;
    const isHttps = request.url.startsWith('https://');

    return json(
      { valid: true, message: 'Access granted' } satisfies PasscodeResponse,
      {
        status: 200,
        headers: {
          ...securityHeaders,
          'Set-Cookie': `wedding_auth=${sessionToken}; HttpOnly; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; SameSite=Lax${isHttps ? '; Secure' : ''}`,
        },
      }
    );
  }

  return json(
    { valid: false, message: 'Invalid passcode' } satisfies PasscodeResponse,
    { status: 401, headers: securityHeaders }
  );
};
