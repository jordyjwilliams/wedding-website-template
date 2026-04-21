<script lang="ts">
  import { weddingCalendarLink } from '$lib/calendar';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
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
      {#each TIMELINE_EVENTS as event, index (event.title)}
        <TimelineItem
          dayLabel={(event as { dayLabel: string }).dayLabel}
          title={event.title}
          date={event.date}
          dateHref={weddingCalendarLink}
          delay="{0.2 + index * 0.2}s"
          isHighlight={event.isHighlight}
          description={event.description}
          bullets={'bullets' in event ? event.bullets : []}
        >
          {#snippet _highlights()}
            {#if event.isHighlight}
              {#each CEREMONY_TIMELINE as ceremony (ceremony.time)}
                <Badge
                  variant="glass"
                  class="text-muted-foreground inline-flex items-center gap-2 px-4 py-1 text-base"
                >
                  <Icon icon={ceremony.icon} width={16} class="inline" />
                  {ceremony.time} — {ceremony.event}
                </Badge>
              {/each}
            {/if}
          {/snippet}
        </TimelineItem>
      {/each}
    </div>
    <!-- CTA: FAQs -->
    <div class="mx-auto max-w-4xl">
      <SectionCta
        text={COPY.weddingDetails.ctaText}
        buttonLabel={COPY.weddingDetails.ctaButton}
        href="/faqs"
        openInNewTab={false}
        className="animate-fade-in-up [animation-delay:1.2s]"
      />
    </div>
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
