<script lang="ts">
  import { AboutUs, OurStoryScrollable, PageWrapper } from '$lib/components';
  import { COPY } from '$lib/content';
  import type { StoryEntry } from '$lib/components/sections/OurStoryScrollable.svelte';

  const ourStoryEntries: Record<string, StoryEntry> = Object.fromEntries(
    Object.entries(COPY.about.ourStorySections.entries).map(([key, entry]) => [
      key,
      {
        ...entry,
        bullets: entry.bullets ? [...entry.bullets] : undefined,
      },
    ])
  );
</script>

<PageWrapper backgroundImage="/images/story-bg.webp" backgroundPosition="center top">
  <AboutUs />
  <OurStoryScrollable entries={ourStoryEntries} />
</PageWrapper>
