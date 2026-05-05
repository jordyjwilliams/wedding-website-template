import { afterEach, vi, beforeAll } from 'vitest';

// These must be set at module load time because some Netlify functions
// read env vars during import and log warnings if they are missing.
process.env.WEDDING_PASSCODE = 'test-passcode-123';
process.env.SESSION_SIGNING_SECRET = 'test-secret-key-32-chars-minimum!';
process.env.GOOGLE_SCRIPT_URL = 'https://test-script.example.com/exec';
process.env.GOOGLE_SCRIPT_SECRET = 'test-script-secret';

// Set environment for client-side rendering
beforeAll(() => {
  process.env.VITE_DEBUG_MODE = 'false';
});

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
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
  } as unknown as Crypto;
}
