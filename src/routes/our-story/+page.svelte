<script lang="ts">
  import { AboutUs, PageWrapper, StorySections } from '$lib/components';
  import { COPY } from '$lib/content';
</script>

<PageWrapper backgroundImage="/images/story-bg.webp" backgroundPosition="center top">
  <AboutUs />
  <StorySections entries={COPY.about.storySections.entries} />
</PageWrapper>
