<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navigation from '$lib/components/Navigation.svelte';
  import { isSessionValid } from '$lib/auth';

  let isAuthenticated: boolean = false;
  let isLoading: boolean = true;

  onMount(() => {
    // Check if user is authenticated with valid session
    isAuthenticated = isSessionValid();
    isLoading = false;

    // Redirect to passcode page if not authenticated and not already there
    if (!isAuthenticated && $page.url.pathname !== '/') {
      goto('/');
    }
  });
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
    <slot />
  </main>
{/if}
