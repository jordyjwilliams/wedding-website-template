import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    // Force Vite to bundle this package through the Svelte plugin
    // rather than letting Node try to load the raw .svelte file directly.
    noExternal: ['@lottiefiles/dotlottie-svelte'],
  },
});
