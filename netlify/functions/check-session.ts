import type { Handler, HandlerEvent } from '@netlify/functions';

declare const process: {
  env: Record<string, string | undefined>;
};

const SESSION_SIGNING_SECRET = process.env.SESSION_SIGNING_SECRET || '';

interface SessionResponse {
  valid: boolean;
}

function parseCookie(cookieHeader: string | undefined, key: string): string | null {
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

async function verifySignature(payload: string, signatureHex: string, secret: string): Promise<boolean> {
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

export const handler: Handler = async (event: HandlerEvent) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ valid: false }),
    };
  }

  if (!SESSION_SIGNING_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ valid: false }),
    };
  }

  const token = parseCookie(event.headers.cookie, 'wedding_auth');
  if (!token || !isTokenShapeValid(token)) {
    const response: SessionResponse = { valid: false };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  }

  const [expiresAtRaw, nonce, signature] = token.split('.');
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    const response: SessionResponse = { valid: false };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  }

  const payload = `${expiresAt}.${nonce}`;
  const signatureValid = await verifySignature(payload, signature, SESSION_SIGNING_SECRET);

  const response: SessionResponse = { valid: signatureValid };
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response),
  };
};
