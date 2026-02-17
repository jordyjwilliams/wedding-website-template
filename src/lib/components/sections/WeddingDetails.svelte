<script lang="ts">
  import { weddingCalendarLink } from '$lib/calendar';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import {
    SectionHeader,
    AnimatedSection,
    AnimatedGrid,
    IconCard,
    TimelineItem,
  } from '$lib/components';
  import { TIMELINE_EVENTS, CEREMONY_TIMELINE } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="wedding-section">
  <div class="container">
    <SectionHeader
      title={COPY.weddingDetails.title}
      emoji={COPY.weddingDetails.emoji}
      intro={COPY.weddingDetails.intro}
    />

    <div class="timeline">
      {#each TIMELINE_EVENTS as event, index}
        <TimelineItem
          dayNumber={event.dayNumber}
          title={event.title}
          date={event.date}
          dateHref={weddingCalendarLink}
          delay="{0.2 + index * 0.2}s"
          isHighlight={event.isHighlight}
          description={event.description}
        >
          {#if event.isHighlight}
            {#snippet _highlights()}
              {#each CEREMONY_TIMELINE as ceremony}
                <WeddingBadge icon={ceremony.icon} size="event">
                  {ceremony.time} — {ceremony.event}
                </WeddingBadge>
              {/each}
            {/snippet}
          {/if}
        </TimelineItem>
      {/each}
    </div>

    <AnimatedGrid class="mt-16" itemDelay={0.2}>
      <IconCard
        icon="ph:house-fill"
        title={COPY.weddingDetails.practical.accommodation.title}
        description={COPY.weddingDetails.practical.accommodation.description}
      />
      <IconCard
        icon="ph:backpack-fill"
        title={COPY.weddingDetails.practical.packing.title}
        description={COPY.weddingDetails.practical.packing.description}
      />
      <IconCard
        icon="ph:car-fill"
        title={COPY.weddingDetails.practical.transport.title}
        description={COPY.weddingDetails.practical.transport.description}
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
