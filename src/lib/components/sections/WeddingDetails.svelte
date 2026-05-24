<script lang="ts">
  import { scrollToHash, useHashNavigation } from '$lib/utils';
  import { weddingCalendarLink } from '$lib/calendar';
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import Icon from '@iconify/svelte';
  import { SectionHeader, SectionCta, AnimatedSection, RichTextContent } from '$lib/components';
  import { TIMELINE_EVENTS, CEREMONY_TIMELINE } from '$lib/constants';
  import { COPY } from '$lib/content';

  useHashNavigation(scrollToHash);
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader
      title={COPY.weddingDetails.title}
      emoji={COPY.weddingDetails.emoji}
      intro={COPY.weddingDetails.intro}
    />

    <div class="mx-auto max-w-5xl">
      <div class="space-y-6 pb-12">
        {#each TIMELINE_EVENTS as event, index (event.title)}
          <div
            class="timeline-entry"
            id={event.dayLabel.toLowerCase().replace(/\s+/g, '-')}
            style="--delay: {0.2 + index * 0.18}s"
          >
            <Card.Root
              class="glass rounded-3xl {event.isHighlight
                ? 'highlight-card ring-primary/30 ring-2'
                : ''}"
            >
              <div class="p-6 sm:p-8">
                <p class="font-heading-1 text-primary mb-1 text-5xl">{event.dayLabel}</p>
                <h3 class="font-heading text-foreground mb-3 text-2xl leading-tight">
                  {event.title}
                </h3>
                <a
                  href={weddingCalendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:bg-primary/10 mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  <Icon icon="ph:calendar-plus" width="16" />
                  {event.date}
                </a>
                <RichTextContent
                  text={event.description}
                  bullets={'bullets' in event ? event.bullets : []}
                  paragraphClass="text-muted-foreground text-sm leading-relaxed"
                  bulletsClass="mt-4"
                />
                {#if event.isHighlight}
                  <div class="mt-5 flex flex-col items-start gap-2">
                    {#each CEREMONY_TIMELINE as ceremony (ceremony.time)}
                      <Badge
                        variant="glass"
                        class="text-muted-foreground inline-flex items-center gap-2 px-4 py-1 text-base"
                      >
                        <Icon icon={ceremony.icon} width={16} class="inline" />
                        {ceremony.time} — {ceremony.event}
                      </Badge>
                    {/each}
                  </div>
                {/if}
              </div>
            </Card.Root>
          </div>
        {/each}
      </div>

      <SectionCta
        text={COPY.weddingDetails.ctaText}
        buttonLabel={COPY.weddingDetails.ctaButton}
        href="/faqs"
        openInNewTab={false}
        class="animate-fade-in-up [animation-delay:1.2s]"
      />
    </div>
  </div>
</AnimatedSection>

<style>
  .timeline-entry {
    opacity: 0;
    transform: translateY(24px);
    animation: fadeInUp 0.8s ease-out var(--delay, 0s) forwards;
  }

  :global(.highlight-card) {
    animation: cardPulse 2.4s ease-in-out infinite;
  }

  @keyframes cardPulse {
    0%,
    100% {
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--color-primary) 30%, transparent),
        0 0 0 0px color-mix(in srgb, var(--color-primary) 0%, transparent);
    }
    50% {
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--color-primary) 50%, transparent),
        0 0 18px 4px color-mix(in srgb, var(--color-primary) 18%, transparent);
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
