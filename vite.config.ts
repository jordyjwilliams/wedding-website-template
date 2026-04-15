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
  build: {
    rollupOptions: {
      output: {
        // Split large dependencies into separate chunks to keep individual chunks under 500 KB
        manualChunks: (id) => {
          if (id.includes('bits-ui')) return 'bits-ui';
          if (id.includes('dotlottie')) return 'lottie';
          if (id.includes('@lucide/svelte')) return 'lucide';
        },
      },
    },
  },
});
