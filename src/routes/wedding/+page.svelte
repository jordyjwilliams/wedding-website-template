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
  }

  .page.visible {
    opacity: 1;
  }
</style>
