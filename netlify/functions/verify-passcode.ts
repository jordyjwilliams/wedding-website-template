// Netlify Serverless Function for Secure Passcode Verification
// This runs on the server, so the actual passcode is never exposed to clients

import type { Handler, HandlerEvent } from '@netlify/functions';

const CORRECT_PASSCODE = process.env.WEDDING_PASSCODE || '';

if (!CORRECT_PASSCODE) {
  console.error('WEDDING_PASSCODE environment variable is not set!');
}

interface PasscodeRequest {
  passcode: string;
}

interface PasscodeResponse {
  valid: boolean;
  message: string;
  token?: string;
}

// Generate a secure token
function generateToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const random2 = Math.random().toString(36).substring(2, 15);
  return `wt_${timestamp}${random}${random2}`;
}

export const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers for development
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
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

  try {
    const { passcode } = JSON.parse(event.body || '{}') as PasscodeRequest;

    // Verify passcode
    if (passcode === CORRECT_PASSCODE) {
      const response: PasscodeResponse = {
        valid: true,
        message: 'Access granted',
        token: generateToken(),
      };
      return {
        statusCode: 200,
        headers,
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
