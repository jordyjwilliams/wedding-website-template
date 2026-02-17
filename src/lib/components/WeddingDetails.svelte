<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { weddingCalendarLink } from '$lib/calendar';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';

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

    const section = document.querySelector('.wedding-section');
    if (section) observer.observe(section);
  });
</script>

<section class="wedding-section" class:visible>
  <div class="container">
    <h2 class="section-title">🌊 Wedding Weekend 🌊</h2>
    <p class="section-intro">
      Join us for a three-day celebration at the stunning Seacroft Estate on the Great Ocean Road
    </p>

    <div class="timeline">
      <div class="timeline-item" style="--delay: 0.2s">
        <div class="timeline-icon">
          <span>1</span>
        </div>
        <div class="timeline-content">
          <h3>Friday — Arrival & Welcome</h3>
          <a
            href={weddingCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
            class="timeline-date"
          >
            <Icon icon="ph:calendar-plus" width="18" inline /> 19th March 2027
          </a>
          <p>
            Arrive, settle into your room and breathe in that sea air. We'll have a casual welcome
            drink in the evening so everyone can mingle and relax after the drive.
          </p>
        </div>
      </div>

      <div class="timeline-item" style="--delay: 0.4s">
        <div class="timeline-icon highlight">
          <span>2</span>
        </div>
        <div class="timeline-content">
          <h3>Saturday — Ceremony & Celebration 💒</h3>
          <a
            href={weddingCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
            class="timeline-date"
          >
            <Icon icon="ph:calendar-plus" width="18" inline /> 20th March 2027
          </a>
          <p>
            The ceremony will be held on the grounds overlooking the ocean, followed by lawn games,
            canapés and a relaxed dinner and dancing under the stars. TODO: Define this all
            properly...
          </p>
          <div class="timeline-highlights">
            <Badge variant="secondary">
              <Icon icon="ph:sun-horizon-fill" width="16" class="mr-1 inline" />
              4:00 PM — Ceremony
            </Badge>
            <Badge variant="secondary">
              <Icon icon="ph:champagne" width="16" class="mr-1 inline" />
              5:30 PM — Cocktail Hour
            </Badge>
            <Badge variant="secondary">
              <Icon icon="ph:fork-knife-fill" width="16" class="mr-1 inline" />
              7:00 PM — Dinner
            </Badge>
            <Badge variant="secondary">
              <Icon icon="ph:music-notes-fill" width="16" class="mr-1 inline" />
              9:00 PM — Dancing
            </Badge>
          </div>
        </div>
      </div>

      <div class="timeline-item" style="--delay: 0.6s">
        <div class="timeline-icon">
          <span>3</span>
        </div>
        <div class="timeline-content">
          <h3>Sunday — Slow Goodbyes</h3>
          <a
            href={weddingCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
            class="timeline-date"
          >
            <Icon icon="ph:calendar-plus" width="18" inline /> 21st March 2027
          </a>
          <p>
            Sleep in, grab a coffee, wander the cliffs or dip your toes in the water. We'll share a
            simple brunch before saying our goodbyes. Travel plans... Next steps etc etc.
          </p>
        </div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="info-icon"><Icon icon="ph:house-fill" width="56" /></div>
            <Card.Title class="mb-2">Accommodation</Card.Title>
            <Card.Description>
              Seacroft offers a mix of rooms and cabins. We'll allocate rooms once we have
              everyone's RSVPs and will confirm details closer to the date.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="info-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="info-icon"><Icon icon="ph:backpack-fill" width="56" /></div>
            <Card.Title class="mb-2">What to Pack</Card.Title>
            <Card.Description>
              Think coastal comfort: layers for cool evenings, comfortable shoes, and anything you'd
              like for beach walks and outdoor time.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>

      <div class="info-card">
        <Card.Root>
          <Card.Content class="pt-6 text-center">
            <div class="info-icon"><Icon icon="ph:car-fill" width="56" /></div>
            <Card.Title class="mb-2">Getting There</Card.Title>
            <Card.Description>
              Seacroft is located along the Great Ocean Road. Car-pooling is encouraged; we'll share
              more detailed directions closer to the day.
            </Card.Description>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</section>

<style>
  .wedding-section {
    padding: 6rem 0;
    background: transparent;
    position: relative;
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
    background: linear-gradient(180deg, var(--primary), var(--accent));
  }

  .timeline-item {
    position: relative;
    padding-left: 90px;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateX(-20px);
    animation: fadeInSlide 0.8s ease-out var(--delay, 0s) forwards;
  }

  .wedding-section.visible .timeline-item {
    animation-play-state: running;
  }

  @keyframes fadeInSlide {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: var(--white);
    border: 3px solid var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    box-shadow: 0 5px 20px var(--shadow);
    z-index: 10;
  }

  .timeline-icon.highlight {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border-color: var(--primary-dark);
    color: var(--white);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 5px 20px var(--shadow);
    }
    50% {
      box-shadow: 0 5px 30px rgba(212, 165, 116, 0.6);
    }
  }

  .timeline-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  .timeline-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .timeline-content h3 {
    font-size: 1.8rem;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
  }

  .timeline-date {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    background: rgba(122, 184, 212, 0.1);
  }

  .timeline-date :global(svg) {
    color: var(--accent);
    filter: drop-shadow(0 2px 4px rgba(122, 184, 212, 0.3));
    transition: transform 0.3s ease;
  }

  .timeline-date:hover {
    background: rgba(122, 184, 212, 0.2);
    transform: translateY(-2px);
  }

  .timeline-date:hover :global(svg) {
    transform: scale(1.1);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .timeline-content p {
    color: var(--text-light);
    line-height: 1.7;
  }

  .timeline-highlights {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
  }

  .info-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .wedding-section.visible .info-card {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .info-card:nth-child(1) {
    animation-delay: 0.8s;
  }

  .info-card:nth-child(2) {
    animation-delay: 1s;
  }

  .info-card:nth-child(3) {
    animation-delay: 1.2s;
  }

  .info-card:hover {
    transform: translateY(-10px);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .info-icon {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    animation: bounce 2s infinite;
    color: hsl(var(--primary));
  }

  .info-icon :global(svg) {
    filter: drop-shadow(0 4px 8px hsl(var(--primary) / 0.3));
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    .wedding-section {
      padding: 4rem 0;
    }

    .timeline::before {
      left: 25px;
    }

    .timeline-item {
      padding-left: 70px;
    }

    .timeline-icon {
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
    }

    .timeline-content {
      padding: 1.5rem;
    }

    .timeline-highlights {
      flex-direction: column;
    }
  }
</style>
