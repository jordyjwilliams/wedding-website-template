<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { SectionHeader, AnimatedSection, AnimatedGrid, IconCard } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="venue-section">
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

    <div class="venue-cta">
      <p class="cta-text">{COPY.venue.ctaText}</p>
      <div class="cta-button">
        <Button
          href={WEDDING.venue.website}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="rounded-full"
        >
          {COPY.venue.ctaButton}
          <span class="arrow">→</span>
        </Button>
      </div>
    </div>
  </div>
</AnimatedSection>

<style>
  :global(.venue-section) {
    padding: 6rem 0;
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  :global(.venue-section)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg, var(--bg-light) 0%, transparent 100%);
    pointer-events: none;
  }

  .venue-cta {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, hsl(var(--muted)), hsl(var(--background)));
    border-radius: calc(var(--radius) * 6);
    margin-top: 3rem;
  }

  .cta-text {
    font-size: 1.3rem;
    color: hsl(var(--foreground));
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }

  .cta-button:hover .arrow {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    :global(.venue-section) {
      padding: 4rem 0;
    }

    .venue-cta {
      padding: 2rem 1.5rem;
    }

    .cta-text {
      font-size: 1.1rem;
    }
  }
</style>
