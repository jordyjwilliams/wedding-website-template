<script lang="ts">
  import { authState } from '$lib/auth-state.svelte';
  import { Hero, LoginGate, PageWrapper } from '$lib/components';
</script>

{#if authState.isChecking}
  <!-- Show just background whilst state is loading -->
  <PageWrapper
    backgroundImage="/images/hero-bg.webp"
    backgroundPosition="center"
    showOrbs={true}
    showHearts={true}
    showGradientOverlay={true}
  />
{:else if authState.isAuthenticated}
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
