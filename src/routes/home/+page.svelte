<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import AboutUs from '$lib/components/sections/AboutUs.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
</script>

<PageWrapper backgroundImage="/images/hero-bg.webp">
  <Hero />
  <AboutUs />
</PageWrapper>
