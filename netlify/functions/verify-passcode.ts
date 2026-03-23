// Netlify Serverless Function for Secure Passcode Verification
// This runs on the server, so the actual passcode is never exposed to clients

import type { Handler, HandlerEvent } from '@netlify/functions';

declare const process: {
  env: Record<string, string | undefined>;
};

const CORRECT_PASSCODE = process.env.WEDDING_PASSCODE || '';
const SESSION_SIGNING_SECRET = process.env.SESSION_SIGNING_SECRET || '';
const SESSION_DURATION_SECONDS = 24 * 60 * 60;

if (!CORRECT_PASSCODE) {
  console.error('WEDDING_PASSCODE environment variable is not set!');
}

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

// Check if IP has exceeded rate limit
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = attemptTracker.get(ip) || [];
  const recentAttempts = attempts.filter((t) => now - t < WINDOW_MS);
  attemptTracker.set(ip, recentAttempts);
  return recentAttempts.length >= MAX_ATTEMPTS;
}

// Record an attempt for an IP
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
  const hex = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
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

export const handler: Handler = async (event: HandlerEvent) => {
  // Get client IP for rate limiting
  const clientIp = (event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (!SESSION_SIGNING_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        valid: false,
        message: 'Server session signing key is not configured.',
      }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  // Check rate limit
  if (isRateLimited(clientIp)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        valid: false,
        message: 'Too many attempts. Please try again later.',
      }),
    };
  }

  try {
    const { passcode } = JSON.parse(event.body || '{}') as PasscodeRequest;
    
    // Record this attempt
    recordAttempt(clientIp);

    // Verify passcode using constant-time comparison to prevent timing attacks
    const isValid = passcode.length === CORRECT_PASSCODE.length &&
                    passcode.split('').reduce((acc, char, i) => acc | (char.charCodeAt(0) ^ CORRECT_PASSCODE.charCodeAt(i)), 0) === 0;
    
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
      };
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Set-Cookie': `wedding_auth=${sessionToken}; HttpOnly; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; SameSite=Lax${isHttps ? '; Secure' : ''}`,
        },
        body: JSON.stringify(response),
      };
    } else {
      const response: PasscodeResponse = {
        valid: false,
        message: 'Invalid passcode',
      };
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify(response),
      };
    }
  } catch {
    const response: PasscodeResponse = {
      valid: false,
      message: 'Invalid request',
    };
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(response),
    };
  }
};
