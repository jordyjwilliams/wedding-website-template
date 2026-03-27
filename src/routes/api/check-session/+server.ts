// SvelteKit API route for session validation
// Replaces: netlify/functions/check-session.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface SessionResponse {
  valid: boolean;
}

function parseCookie(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map((part) => part.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${key}=`));
  return match ? decodeURIComponent(match.slice(key.length + 1)) : null;
}

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[a-f0-9]+$/i.test(hex) || hex.length % 2 !== 0) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function verifySignature(
  payload: string,
  signatureHex: string,
  secret: string
): Promise<boolean> {
  const signature = hexToBytes(signatureHex);
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  return globalThis.crypto.subtle.verify(
    'HMAC',
    key,
    signature as unknown as BufferSource,
    encoder.encode(payload) as unknown as BufferSource
  );
}

function isTokenShapeValid(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiresAtRaw, nonce, signature] = parts;
  if (!/^\d+$/.test(expiresAtRaw)) return false;
  if (!/^[a-f0-9]{32}$/i.test(nonce)) return false;
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;

  return true;
}

const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export const GET: RequestHandler = async ({ request }) => {
  const SESSION_SIGNING_SECRET = process.env.SESSION_SIGNING_SECRET || '';

  if (!SESSION_SIGNING_SECRET) {
    return json({ valid: false } satisfies SessionResponse, {
      status: 500,
      headers: securityHeaders,
    });
  }

  const cookieHeader = request.headers.get('cookie');
  const token = parseCookie(cookieHeader, 'wedding_auth');

  if (!token || !isTokenShapeValid(token)) {
    return json({ valid: false } satisfies SessionResponse, {
      status: 200,
      headers: securityHeaders,
    });
  }

  const [expiresAtRaw, nonce, signature] = token.split('.');
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return json({ valid: false } satisfies SessionResponse, {
      status: 200,
      headers: securityHeaders,
    });
  }

  const payload = `${expiresAt}.${nonce}`;
  const signatureValid = await verifySignature(payload, signature, SESSION_SIGNING_SECRET);

  return json({ valid: signatureValid } satisfies SessionResponse, {
    status: 200,
    headers: securityHeaders,
  });
};
