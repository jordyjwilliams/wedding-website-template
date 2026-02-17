<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import AnimatedSection from '$lib/components/AnimatedSection.svelte';
  import AnimatedGrid from '$lib/components/AnimatedGrid.svelte';
  import IconCard from '$lib/components/IconCard.svelte';
</script>

<AnimatedSection class="venue-section">
  <div class="container">
    <SectionHeader
      title="Seacroft Estate"
      emoji="🐠🏖️🏛️"
      intro="A historic estate on 25 acres with breathtaking 180° views over the iconic Great Ocean Road."
    />

    <AnimatedGrid columns="repeat(auto-fit, minmax(260px, 1fr))" itemDelay={0.2}>
      <IconCard
        icon="ph:church"
        iconSize={64}
        iconAnimation="float"
        title="TODO: More details"
        description="Inside: A beautifully restored 1920's chapel with stunning stained glass windows, original wood panelling, and ocean views through unique rectangular windows."
      />
      <IconCard
        icon="ph:waves"
        iconSize={64}
        iconAnimation="float"
        iconDelay="0.5s"
        title="Ocean Views"
        description="Outside: Set on 25 acres with 180-degree ocean views overlooking the Great Ocean Road. Perfect for photos and unforgettable sunsets."
      />
      <IconCard
        icon="ph:umbrella-simple-fill"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1s"
        title="(Private-ish) Beach"
        description="Beach: Access to a secluded beach across the road. Perfect for morning swims, sunset walks, or just relaxing by the water."
      />
      <IconCard
        icon="mdi:barley"
        iconSize={64}
        iconAnimation="float"
        iconDelay="1.5s"
        title="Beautiful Grounds"
        description="Stunning lawns and gardens, historic buildings, and even some friendly cows to keep you company during your stay."
      />
    </AnimatedGrid>

    <div class="venue-cta">
      <p class="cta-text">Want to learn more about this amazing venue?</p>
      <div class="cta-button">
        <Button
          href="https://www.seacroft.com/weddings/"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="rounded-full"
        >
          Explore Seacroft Estate
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
    border-radius: 30px;
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
