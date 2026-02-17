<script lang="ts">
  import WeddingDetails from '$lib/components/sections/WeddingDetails.svelte';
  import VenueInfo from '$lib/components/sections/VenueInfo.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
</script>

<PageWrapper backgroundImage="/images/wedding-details-bg.webp">
  <WeddingDetails />
  <VenueInfo />
</PageWrapper>
