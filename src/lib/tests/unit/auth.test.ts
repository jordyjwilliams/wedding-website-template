import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isSessionValid, clearAuth } from '$lib/auth';

type FetchMock = ReturnType<typeof vi.fn>;

describe('auth utilities', () => {
  // Mock fetch globally
  (globalThis.fetch as unknown) = vi.fn() as FetchMock;

  const mockFetch = globalThis.fetch as unknown as FetchMock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isSessionValid()', () => {
    it('returns true when session is valid', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true }),
      });

      const result = await isSessionValid();

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        '/.netlify/functions/check-session',
        expect.objectContaining({
          method: 'GET',
          credentials: 'same-origin',
        })
      );
    });

    it('returns false when session is invalid', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: false }),
      });

      const result = await isSessionValid();

      expect(result).toBe(false);
    });

    it('returns false when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const result = await isSessionValid();

      expect(result).toBe(false);
    });

    it('returns false on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await isSessionValid();

      expect(result).toBe(false);
    });

    it('sets correct headers and cache options', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true }),
      });

      await isSessionValid();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: 'no-store',
          headers: {
            Accept: 'application/json',
          },
        })
      );
    });
  });

  describe('clearAuth()', () => {
    it('calls logout endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await clearAuth();

      expect(mockFetch).toHaveBeenCalledWith(
        '/.netlify/functions/logout-session',
        expect.objectContaining({
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
        })
      );
    });

    it('does not throw on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      expect(async () => {
        await clearAuth();
      }).not.toThrow();
    });

    it('ignores response errors silently', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      expect(async () => {
        await clearAuth();
      }).not.toThrow();
    });
  });
});
