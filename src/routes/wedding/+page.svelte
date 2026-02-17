<script lang="ts">
  import WeddingDetails from '$lib/components/WeddingDetails.svelte';
  import VenueInfo from '$lib/components/VenueInfo.svelte';
  import { onMount } from 'svelte';

  let visible: boolean = false;

  onMount(() => {
    visible = true;
  });
</script>

<div class="page" class:visible>
  <WeddingDetails />
  <VenueInfo />
</div>

<style>
  .page {
    opacity: 0;
    transition: opacity 0.6s ease-out;
    background:
      linear-gradient(135deg, rgba(248, 250, 251, 0.85) 0%, rgba(237, 242, 244, 0.75) 100%),
      url('/images/wedding-details-bg.webp') center/cover fixed;
    min-height: 100vh;
  }

  .page.visible {
    opacity: 1;
  }
</style>
