<script lang="ts">
  import Icon from '@iconify/svelte';
  import { weddingCalendarLink } from '$lib/calendar';
  import * as Card from '$lib/components/ui/card';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import { SectionHeader, AnimatedSection, DetailCard } from '$lib/components';
  import { WEDDING, LOVE_FACTS } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="about-section" threshold={0.2}>
  <div class="container">
    <div class="about-grid">
      <div class="about-content">
        <SectionHeader title={COPY.about.title} emoji={COPY.about.emoji} />
        <p class="intro-text">{COPY.about.intro}</p>
        <p class="story-text">
          {COPY.about.story}
        </p>
        <p class="story-text">
          {COPY.about.storyExtended}
        </p>

        <div class="love-facts">
          {#each LOVE_FACTS as fact}
            <div class="fact-item">
              <Card.Root class="border-none">
                <Card.Content class="flex items-start gap-4 p-5">
                  <WeddingBadge size="icon-lg">{fact.icon}</WeddingBadge>
                  <p class="fact-text">
                    <strong>{fact.label}:</strong>
                    {fact.text}
                  </p>
                </Card.Content>
              </Card.Root>
            </div>
          {/each}
        </div>
      </div>

      <div class="about-visual">
        <div class="photo-card">
          <Card.Root>
            <img
              src="/images/proposal.webp"
              alt="Engagement at Larkya La Pass"
              class="main-photo"
            />
            <Card.Footer class="font-heading p-6 text-center text-2xl font-semibold text-gray-900"
              >She Said Yes...</Card.Footer
            >
          </Card.Root>
        </div>

        <div class="floating-details">
          <DetailCard
            label="Wedding Date"
            value={WEDDING.dates.displayFull}
            href={weddingCalendarLink}
          >
            {#snippet badge()}
              <WeddingBadge size="icon">
                <Icon icon="ph:calendar-plus" width="20" />
              </WeddingBadge>
            {/snippet}
          </DetailCard>

          <DetailCard label="Location" value={WEDDING.venue.displayShort}>
            {#snippet badge()}
              <WeddingBadge size="icon">📍</WeddingBadge>
            {/snippet}
          </DetailCard>
        </div>
      </div>
    </div>
  </div>
</AnimatedSection>

<style>
  :global(.about-section) {
    padding: 6rem 0;
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  :global(.about-section)::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .intro-text {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
    line-height: 1.4;
    font-style: italic;
  }

  .story-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-light);
    margin-bottom: 1.5rem;
  }

  .love-facts {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fact-item {
    transition: transform 0.3s ease;
  }

  .fact-item:hover {
    transform: translateX(10px);
  }

  .fact-text {
    margin: 0;
    color: var(--text-light);
    line-height: 1.6;
  }

  .fact-text strong {
    color: var(--text-dark);
  }

  .about-visual {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .photo-card {
    width: 100%;
    max-width: 400px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    animation: fadeInScale 0.8s ease-out 0.3s both;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .main-photo {
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
  }

  .floating-details {
    position: absolute;
    right: -50px;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: fadeInRight 0.8s ease-out 0.6s both;
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .about-visual {
      order: -1;
    }

    .floating-details {
      position: static;
      flex-direction: row;
      justify-content: center;
      margin-top: 2rem;
    }
  }

  @media (max-width: 640px) {
    :global(.about-section) {
      padding: 4rem 0;
    }

    .floating-details {
      flex-direction: column;
      align-items: stretch;
    }

    .fact-item {
      text-align: center;
    }
  }
</style>
