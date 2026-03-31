<script lang="ts">
  import { onMount } from 'svelte';
  import { isSessionValid } from '$lib/auth';
  import { Hero, LoginGate, PageWrapper } from '$lib/components';

  let isAuthenticated = $state(false);

  onMount(async () => {
    // Check authentication status
    isAuthenticated = await isSessionValid();
  });
</script>

{#if isAuthenticated}
  <!-- Show home content when authenticated -->
  <PageWrapper
    backgroundImage="/images/hero-bg.webp"
    backgroundPosition="center top"
    showOrbs={true}
    showHearts={true}
  >
    <Hero />
  </PageWrapper>
{:else}
  <!-- Login / passcode gate -->
  <PageWrapper
    backgroundImage="/images/hero-bg.webp"
    backgroundPosition="center"
    showOrbs={true}
    showHearts={true}
    showGradientOverlay={true}
  >
    <LoginGate />
  </PageWrapper>
{/if}
