import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false }),
    };
  }

  const isHttps = (event.headers['x-forwarded-proto'] || 'https') === 'https';

  return {
    statusCode: 200,
    headers: {
      ...headers,
      'Set-Cookie': `wedding_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${isHttps ? '; Secure' : ''}`,
    },
    body: JSON.stringify({ ok: true }),
  };
};
