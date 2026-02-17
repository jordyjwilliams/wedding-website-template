<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';

  let visible: boolean = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.venue-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section class="venue-section" class:visible>
  <div class="container">
    <h2 class="section-title">🐠🏖️🏛️ Seacroft Estate 🏛️🏖️🐠</h2>
    <p class="section-intro">
      A historic estate on 25 acres with breathtaking 180° views over the iconic Great Ocean Road.
    </p>

    <div class="venue-features">
      <div class="feature-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="feature-icon"><Icon icon="ph:church" width="64" /></div>
            <Card.Title class="mb-2">TODO: More details</Card.Title>
            <Card.Description>
              Inside: A beautifully restored 1920's chapel with stunning stained glass windows,
              original wood panelling, and ocean views through unique rectangular windows.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="feature-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="feature-icon feature-icon-2"><Icon icon="ph:waves" width="64" /></div>
            <Card.Title class="mb-2">Ocean Views</Card.Title>
            <Card.Description>
              Outside: Set on 25 acres with 180-degree ocean views overlooking the Great Ocean Road.
              Perfect for photos and unforgettable sunsets.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="feature-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="feature-icon feature-icon-3">
              <Icon icon="ph:umbrella-simple-fill" width="64" />
            </div>
            <Card.Title class="mb-2">(Private-ish) Beach</Card.Title>
            <Card.Description>
              Beach: Access to a secluded beach across the road. Perfect for morning swims, sunset
              walks, or just relaxing by the water.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="feature-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="feature-icon feature-icon-4"><Icon icon="mdi:barley" width="64" /></div>
            <Card.Title class="mb-2">Beautiful Grounds</Card.Title>
            <Card.Description>
              Stunning lawns and gardens, historic buildings, and even some friendly cows to keep
              you company during your stay.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

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
</section>

<style>
  .venue-section {
    padding: 6rem 0;
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  .venue-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg, var(--bg-light) 0%, transparent 100%);
    pointer-events: none;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 1rem;
    color: hsl(var(--primary));
    text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
  }

  .section-intro {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto 4rem;
    line-height: 1.6;
  }

  .venue-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .feature-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
  }

  .venue-section.visible .feature-card {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .feature-card:nth-child(1) {
    animation-delay: 0.2s;
  }

  .feature-card:nth-child(2) {
    animation-delay: 0.4s;
  }

  .feature-card:nth-child(3) {
    animation-delay: 0.6s;
  }

  .feature-card:nth-child(4) {
    animation-delay: 0.8s;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .feature-card:hover::before {
    transform: scaleX(1);
  }

  .feature-card:hover {
    transform: translateY(-10px);
  }

  .feature-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    animation: float 3s infinite ease-in-out;
    color: hsl(var(--accent));
  }

  .feature-icon :global(svg) {
    filter: drop-shadow(0 4px 8px hsl(var(--accent) / 0.3));
  }

  .feature-icon-2 {
    animation-delay: 0.5s;
  }

  .feature-icon-3 {
    animation-delay: 1s;
  }

  .feature-icon-4 {
    animation-delay: 1.5s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
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
    .venue-section {
      padding: 4rem 0;
    }

    .venue-features {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .venue-cta {
      padding: 2rem 1.5rem;
    }

    .cta-text {
      font-size: 1.1rem;
    }
  }
</style>
