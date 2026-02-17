<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import AboutUs from '$lib/components/AboutUs.svelte';
  import { onMount } from 'svelte';

  let visible: boolean = false;

  onMount(() => {
    visible = true;
  });
</script>

<div class="page" class:visible>
  <Hero />
  <AboutUs />
</div>

<style>
  .page {
    opacity: 0;
    transition: opacity 0.6s ease-out;
    background:
      linear-gradient(135deg, rgba(250, 248, 246, 0.85) 0%, rgba(245, 230, 211, 0.75) 100%),
      url('/images/hero-bg.webp') center/cover fixed;
    min-height: 100vh;
  }

  .page.visible {
    opacity: 1;
  }
</style>
