<script lang="ts">
  import { weddingCalendarLink } from '$lib/calendar';
  import WeddingBadge from '$lib/components/ui/badge/WeddingBadge.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import AnimatedSection from '$lib/components/AnimatedSection.svelte';
  import AnimatedGrid from '$lib/components/AnimatedGrid.svelte';
  import IconCard from '$lib/components/IconCard.svelte';
  import TimelineItem from '$lib/components/TimelineItem.svelte';
</script>

<AnimatedSection class="wedding-section">
  <div class="container">
    <SectionHeader
      title="Wedding Weekend"
      emoji="🌊"
      intro="Join us for a three-day celebration at the stunning Seacroft Estate on the Great Ocean Road"
    />

    <div class="timeline">
      <TimelineItem
        dayNumber={1}
        title="Friday — Arrival & Welcome"
        date="19th March 2027"
        dateHref={weddingCalendarLink}
        delay="0.2s"
        description="Arrive, settle into your room and breathe in that sea air. We'll have a casual welcome drink in the evening so everyone can mingle and relax after the drive."
      />

      <TimelineItem
        dayNumber={2}
        title="Saturday — Ceremony & Celebration 💒"
        date="20th March 2027"
        dateHref={weddingCalendarLink}
        delay="0.4s"
        isHighlight={true}
        description="The ceremony will be held on the grounds overlooking the ocean, followed by lawn games, canapés and a relaxed dinner and dancing under the stars. TODO: Define this all properly..."
      >
        {#snippet highlights()}
          <WeddingBadge icon="ph:sun-horizon-fill" size="event">4:00 PM — Ceremony</WeddingBadge>
          <WeddingBadge icon="ph:champagne" size="event">5:30 PM — Cocktail Hour</WeddingBadge>
          <WeddingBadge icon="ph:fork-knife-fill" size="event">7:00 PM — Dinner</WeddingBadge>
          <WeddingBadge icon="ph:music-notes-fill" size="event">9:00 PM — Dancing</WeddingBadge>
        {/snippet}
      </TimelineItem>

      <TimelineItem
        dayNumber={3}
        title="Sunday — Slow Goodbyes"
        date="21st March 2027"
        dateHref={weddingCalendarLink}
        delay="0.6s"
        description="Sleep in, grab a coffee, wander the cliffs or dip your toes in the water. We'll share a simple brunch before saying our goodbyes. Travel plans... Next steps etc etc."
      />
    </div>

    <AnimatedGrid class="mt-16" itemDelay={0.2}>
      <IconCard
        icon="ph:house-fill"
        title="Accommodation"
        description="Seacroft offers a mix of rooms and cabins. We'll allocate rooms once we have everyone's RSVPs and will confirm details closer to the date."
      />
      <IconCard
        icon="ph:backpack-fill"
        title="What to Pack"
        description="Think coastal comfort: layers for cool evenings, comfortable shoes, and anything you'd like for beach walks and outdoor time."
      />
      <IconCard
        icon="ph:car-fill"
        title="Getting There"
        description="Seacroft is located along the Great Ocean Road. Car-pooling is encouraged; we'll share more detailed directions closer to the day."
      />
    </AnimatedGrid>
  </div>
</AnimatedSection>

<style>
  :global(.wedding-section) {
    padding: 6rem 0;
    background: transparent;
    position: relative;
  }

  .timeline {
    max-width: 900px;
    margin: 0 auto 5rem;
    position: relative;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--primary), var(--accent));
  }

  @media (max-width: 768px) {
    :global(.wedding-section) {
      padding: 4rem 0;
    }

    .timeline::before {
      left: 25px;
    }
  }
</style>
