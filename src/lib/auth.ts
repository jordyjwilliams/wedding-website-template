// Shared authentication utilities
export const SESSION_DURATION_HOURS = 24;

interface AuthData {
  authenticated: boolean;
  timestamp: number;
  token: string;
}

export function isSessionValid(): boolean {
  const authData = localStorage.getItem('wedding_auth');
  if (!authData) return false;

  try {
    const { authenticated, timestamp, token } = JSON.parse(authData) as AuthData;
    if (!authenticated || !timestamp || !token) return false;

    const now = Date.now();
    const sessionAge = now - timestamp;
    const maxAge = SESSION_DURATION_HOURS * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      localStorage.removeItem('wedding_auth');
      return false;
    }

    // Validate token format (must be returned from server)
    if (!token.startsWith('wt_') || token.length < 32) {
      localStorage.removeItem('wedding_auth');
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem('wedding_auth');
    return false;
  }
}

export function clearAuth(): void {
  localStorage.removeItem('wedding_auth');
}
