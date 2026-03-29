import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  ssr: {
    // Force Vite to bundle this package through the Svelte plugin
    // rather than letting Node try to load the raw .svelte file directly.
    noExternal: ['@lottiefiles/dotlottie-svelte'],
  },
});
