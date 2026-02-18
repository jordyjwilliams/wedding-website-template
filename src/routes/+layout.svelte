<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Navigation } from '$lib/components';
  import { isSessionValid } from '$lib/auth';
  import { ModeWatcher } from 'mode-watcher';

  let isAuthenticated = $state(false);
  let isLoading = $state(true);

  onMount(() => {
    // Check if user is authenticated with valid session
    isAuthenticated = isSessionValid();
    isLoading = false;

    // Redirect to passcode page if not authenticated and not already there
    if (!isAuthenticated && $page.url.pathname !== '/') {
      goto('/');
    }
  });
  let { children } = $props();
</script>

<svelte:head>
  <title>Jordy & Nicole — Wedding</title>
  <meta
    name="description"
    content="Join us for a three-day wedding weekend at Seacroft Estate on the Great Ocean Road"
  />
</svelte:head>

{#if !isLoading}
  {#if isAuthenticated}
    <Navigation />
  {/if}

  <main class="min-h-screen">
    <ModeWatcher />
    {@render children?.()}
  </main>
{/if}
