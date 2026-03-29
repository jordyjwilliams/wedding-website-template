// Shared authentication utilities
interface SessionCheckResponse {
  valid: boolean;
}

export async function isSessionValid(): Promise<boolean> {
  try {
    const response = await fetch('/.netlify/functions/check-session', {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return false;
    const data = (await response.json()) as SessionCheckResponse;
    return data.valid === true;
  } catch {
    return false;
  }
}

export async function clearAuth(): Promise<void> {
  try {
    await fetch('/.netlify/functions/logout-session', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
    });
  } catch {
    // Ignore network errors while logging out.
  }
}
