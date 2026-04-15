<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/stores';
  import { Navigation } from '$lib/components';
  import { authState, refreshAuthState } from '$lib/auth-state.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { COPY } from '$lib/content';

  onMount(async () => {
    const isAuthenticated = await refreshAuthState();

    // Redirect to passcode page if not authenticated and not already there
    if (!isAuthenticated && $page.url.pathname !== '/') {
      goto(resolve('/', {}));
    }
  });
  let { children } = $props();
</script>

<svelte:head>
  <title>{COPY.meta.title}</title>
  <meta name="description" content={COPY.meta.description} />
</svelte:head>

<ModeWatcher />

{#if authState.isAuthenticated}
  <Navigation />
{/if}

<main class="min-h-screen {authState.isAuthenticated ? 'pt-(--nav-height)' : ''}">
  {@render children?.()}
</main>
