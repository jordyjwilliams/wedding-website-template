import { afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// These must be set at module load time because some Netlify functions
// read env vars during import and log warnings if they are missing.
process.env.WEDDING_PASSCODE ||= 'test-passcode-123';
process.env.SESSION_SIGNING_SECRET ||= 'test-secret-key-32-chars-minimum!';

// Set environment for client-side rendering
globalThis.window = globalThis.window || {};
globalThis.document = globalThis.document || {};

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Set environment variables for tests
beforeAll(() => {
  process.env.VITE_DEBUG_MODE = 'false';
  process.env.VITE_GOOGLE_SCRIPT_URL = 'https://example.com/script';
});

// Mock crypto for Node environment tests
if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    subtle: {
      importKey: async () => ({}),
      sign: async () => new ArrayBuffer(64),
      verify: async () => true,
    },
  } as unknown as SubtleCrypto & { getRandomValues: (arr: Uint8Array) => Uint8Array };
}
