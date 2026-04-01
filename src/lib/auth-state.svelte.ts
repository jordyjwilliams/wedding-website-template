import { isSessionValid } from '$lib/auth';

export const authState = $state({
  isChecking: true,
  isAuthenticated: false,
});

export async function refreshAuthState(): Promise<boolean> {
  authState.isChecking = true;
  authState.isAuthenticated = await isSessionValid();
  authState.isChecking = false;
  return authState.isAuthenticated;
}
