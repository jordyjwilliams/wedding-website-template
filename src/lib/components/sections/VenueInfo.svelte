<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { SectionHeader, AnimatedSection, AnimatedGrid, IconCard } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.venue.title} emoji={COPY.venue.emoji} intro={COPY.venue.intro} />

    <AnimatedGrid columns="repeat(auto-fit, minmax(260px, 1fr))" itemDelay={0.2}>
      <IconCard
        icon="ph:church"
        iconSize={64}
        iconAnimation="float"
        title={COPY.venue.features.chapel.title}
        description={COPY.venue.features.chapel.description}
      />
      <IconCard
        icon="ph:waves"
        iconSize={64}
        iconAnimation="float"
        iconDelay="0.5s"
        title={COPY.venue.features.views.title}
        description={COPY.venue.features.views.description}
      />
      <IconCard
        icon="ph:umbrella-simple-fill"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1s"
        title={COPY.venue.features.beach.title}
        description={COPY.venue.features.beach.description}
      />
      <IconCard
        icon="mdi:barley"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1.5s"
        title={COPY.venue.features.grounds.title}
        description={COPY.venue.features.grounds.description}
      />
    </AnimatedGrid>

    <!-- CTA: Venue link -->
    <div
      class="glass mt-12 rounded-3xl px-8 py-12 text-center
             md:px-16"
    >
      <p class="text-foreground mb-8 text-xl font-medium">{COPY.venue.ctaText}</p>
      <Button
        href={WEDDING.venue.website}
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        class="group rounded-full px-10"
      >
        {COPY.venue.ctaButton}
        <span class="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Button>
    </div>
  </div>
</AnimatedSection>
