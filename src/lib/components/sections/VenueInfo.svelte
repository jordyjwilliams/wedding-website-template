<script lang="ts">
  import {
    SectionHeader,
    SectionCta,
    AnimatedSection,
    AnimatedGrid,
    IconCard,
  } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.venue.title} emoji={COPY.venue.emoji} intro={COPY.venue.intro} />

    <AnimatedGrid columns="repeat(auto-fit, minmax(260px, 1fr))" itemDelay={0.2}>
      <!-- TODO: put these all in loop defined from copy directly -->
      <!-- TODO: icons -> copy -->

      <IconCard
        icon="ph:waves"
        iconSize={64}
        iconAnimation="float"
        iconDelay="0.0s"
        title={COPY.venue.features.views.title}
        description={COPY.venue.features.views.description}
      />
      <IconCard
        icon="ph:tree-palm"
        iconSize={64}
        iconAnimation="float"
        iconDelay="0.5s"
        title={COPY.venue.features.beach.title}
        description={COPY.venue.features.beach.description}
      />
      <IconCard
        icon="ph:house"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1s"
        title={COPY.venue.features.accommodation.title}
        description={COPY.venue.features.accommodation.description}
      />
      <IconCard
        icon="ph:cow"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1.5s"
        title={COPY.venue.features.grounds.title}
        description={COPY.venue.features.grounds.description}
      />
    </AnimatedGrid>
    <AnimatedGrid columns="repeat(auto-fit, minmax(260px, 1fr))" itemDelay={0.2}>
      <!-- CTA: Venue link -->
      <SectionCta
        text={COPY.venue.ctaText}
        buttonLabel={COPY.venue.ctaButton}
        href={WEDDING.venue.website}
        className="animate-fade-in-up [animation-delay:1.2s]"
      />
      <SectionCta
        text={COPY.venue.faqText}
        buttonLabel={COPY.venue.faqButton}
        href="/faqs"
        openInNewTab={false}
        className="animate-fade-in-up [animation-delay:1.2s]"
      />
    </AnimatedGrid>
  </div>
</AnimatedSection>
