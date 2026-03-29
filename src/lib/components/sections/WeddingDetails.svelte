<script lang="ts">
  import { weddingCalendarLink } from '$lib/calendar';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import { SectionHeader, SectionCta, AnimatedSection, TimelineItem } from '$lib/components';
  import { TIMELINE_EVENTS, CEREMONY_TIMELINE } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader
      title={COPY.weddingDetails.title}
      emoji={COPY.weddingDetails.emoji}
      intro={COPY.weddingDetails.intro}
    />

    <!-- Wedding Timeline -->

    <div class="timeline">
      {#each TIMELINE_EVENTS as event, index (event.dayNumber)}
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
              {#each CEREMONY_TIMELINE as ceremony (ceremony.time)}
                <WeddingBadge icon={ceremony.icon} size="event">
                  {ceremony.time} — {ceremony.event}
                </WeddingBadge>
              {/each}
            {/snippet}
          {/if}
        </TimelineItem>
      {/each}
    </div>
    <!-- CTA: FAQs -->
    <SectionCta
      text={COPY.weddingDetails.ctaText}
      buttonLabel={COPY.weddingDetails.ctaButton}
      href="/faqs"
      openInNewTab={false}
      className="animate-fade-in-up [animation-delay:1.2s] mx-auto max-w-4xl"
    />
  </div>
</AnimatedSection>

<style>
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
    background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
  }

  @media (max-width: 768px) {
    .timeline::before {
      left: 25px;
    }
  }
</style>
