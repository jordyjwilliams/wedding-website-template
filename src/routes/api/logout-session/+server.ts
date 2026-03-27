// SvelteKit API route for session logout
// Replaces: netlify/functions/logout-session.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export const POST: RequestHandler = async ({ request }) => {
  const isHttps = request.url.startsWith('https://');

  return json(
    { ok: true },
    {
      status: 200,
      headers: {
        ...securityHeaders,
        'Set-Cookie': `wedding_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${isHttps ? '; Secure' : ''}`,
      },
    }
  );
};
