// Netlify Serverless Function for RSVP Submission
// Proxies to Google Apps Script so the script URL and shared secret
// are never exposed in client-side code.

import type { Handler, HandlerEvent } from '@netlify/functions';

declare const process: {
  env: Record<string, string | undefined>;
};

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
const GOOGLE_SCRIPT_SECRET = process.env.GOOGLE_SCRIPT_SECRET || '';

type SubmitCode =
  | 'SUBMITTED'
  | 'METHOD_NOT_ALLOWED'
  | 'INVALID_REQUEST'
  | 'NOT_CONFIGURED'
  | 'UPSTREAM_ERROR'
  | 'DUPLICATE_ALREADY_SUBMITTED';

// Codes returned by Apps Script that map to specific client-facing responses
const APPS_SCRIPT_DUPLICATE_STATUS = 'duplicate';

interface SubmitResponse {
  status: 'success' | 'error';
  code: SubmitCode;
  message: string;
}

type HandlerResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

const HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

function jsonResponse(statusCode: number, payload: SubmitResponse): HandlerResponse {
  return { statusCode, headers: HEADERS, body: JSON.stringify(payload) };
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method not allowed.',
    });
  }

  if (!GOOGLE_SCRIPT_URL) {
    console.error('GOOGLE_SCRIPT_URL environment variable is not set.');
    return jsonResponse(503, {
      status: 'error',
      code: 'NOT_CONFIGURED',
      message: 'RSVP submission is not configured. Please contact us directly.',
    });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, {
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request body.',
    });
  }

  // Attach the shared secret server-side — never sent from the client
  const payload = GOOGLE_SCRIPT_SECRET ? { ...body, secret: GOOGLE_SCRIPT_SECRET } : body;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Apps Script always returns HTTP 200 — read text first so we can log
    // the raw body if JSON parsing fails (e.g. Google login redirect or error page).
    const responseText = await response.text();
    let result: { status: string; message?: string };
    try {
      result = JSON.parse(responseText) as { status: string; message?: string };
    } catch {
      console.error(
        'Apps Script returned non-JSON response (HTTP ' + response.status + '): ',
        responseText.slice(0, 500)
      );
      return jsonResponse(502, {
        status: 'error',
        code: 'UPSTREAM_ERROR',
        message: 'Failed to record your RSVP. Please try again or contact us directly.',
      });
    }

    if (result.status === APPS_SCRIPT_DUPLICATE_STATUS) {
      return jsonResponse(409, {
        status: 'error',
        code: 'DUPLICATE_ALREADY_SUBMITTED',
        message:
          'It looks like this email has already submitted an RSVP. If you need to make changes, please contact us directly.',
      });
    }

    if (result.status !== 'success') {
      console.error('Apps Script returned error:', JSON.stringify(result));
      return jsonResponse(502, {
        status: 'error',
        code: 'UPSTREAM_ERROR',
        message: 'Failed to record your RSVP. Please try again or contact us directly.',
      });
    }

    return jsonResponse(200, {
      status: 'success',
      code: 'SUBMITTED',
      message: 'RSVP submitted successfully.',
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return jsonResponse(502, {
      status: 'error',
      code: 'UPSTREAM_ERROR',
      message: 'Failed to submit your RSVP. Please try again or contact us directly.',
    });
  }
};
