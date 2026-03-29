<script lang="ts">
  import { SectionHeader, SectionCta, AnimatedSection, AnimatedGrid, IconCard } from '$lib/components';
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
    <SectionCta
      text={COPY.venue.ctaText}
      buttonLabel={COPY.venue.ctaButton}
      href={WEDDING.venue.website}
      className="animate-fade-in-up [animation-delay:1.2s]"
    />
  </div>
</AnimatedSection>
