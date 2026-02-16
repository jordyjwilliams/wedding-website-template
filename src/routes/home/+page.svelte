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
  }

  .page.visible {
    opacity: 1;
  }
</style>
