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

  const venueFeatureKeys = Object.keys(COPY.venue.features) as Array<
    keyof typeof COPY.venue.features
  >;
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.venue.title} emoji={COPY.venue.emoji} intro={COPY.venue.intro} />

    <AnimatedGrid columns="repeat(auto-fit, minmax(260px, 1fr))" itemDelay={0.2}>
      {#each venueFeatureKeys as key, index (key)}
        {@const feature = COPY.venue.features[key]}
        <IconCard
          icon={'icon' in feature ? feature.icon : 'ph:star'}
          iconSize={64}
          iconAnimation="float"
          iconDelay={`${index * 0.35}s`}
          title={feature.title}
          description={feature.description}
        />
      {/each}
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
