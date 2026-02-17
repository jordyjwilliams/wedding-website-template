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
      { threshold: 0.2 }
    );

    const section = document.querySelector('.about-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });

  const loveFacts = [
    { icon: '☕', label: 'First Date', text: 'Trains, then a trip in a murder van to Iceland 🇮🇸' },
    { icon: '✈️', label: 'Adventures', text: 'XX countries together. Current location: 🇦🇺' },
    { icon: '💍', label: 'The Proposal', text: 'Larkya La Pass, Nepal' },
  ];
</script>

<section class="about-section" class:visible>
  <div class="container">
    <div class="about-grid">
      <div class="about-content">
        <h2 class="section-title">💕 Our Story 💕</h2>
        <p class="intro-text">Every love story is beautiful, but we think our's is pretty cute.</p>
        <p class="story-text">
          Once upon a time, Jordy was sitting on a train from Prague to Kutna Hora when he met
          Nicole (and Megan!). From a chance conversation, the rest, as they say is history.
        </p>
        <p class="story-text">
          From a relationship that started with some difficult geographical challenges and a lot of
          video calls to a "yes" at 5,106m above sea-level at Larkya La Pass, Nepal. ... ... Fill
          this out properly...
        </p>

        <div class="love-facts">
          {#each loveFacts as fact}
            <div class="fact-item">
              <Card.Root class="border-none">
                <Card.Content class="flex items-start gap-4 p-5">
                  <Badge variant="secondary" class="flex-shrink-0 px-3 py-2 text-2xl"
                    >{fact.icon}</Badge
                  >
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
            <Card.Footer class="p-6 text-center font-heading text-2xl font-semibold text-gray-900"
              >She Said Yes...</Card.Footer
            >
          </Card.Root>
        </div>

        <div class="floating-details">
          <a href={weddingCalendarLink} target="_blank" rel="noopener noreferrer">
            <div class="detail-card detail-card-clickable">
              <Card.Root>
                <Card.Content class="flex items-center gap-4 p-5">
                  <Badge variant="secondary" class="px-3 py-2 text-xl">
                    <Icon icon="ph:calendar-plus" width="20" />
                  </Badge>
                  <div>
                    <p class="detail-label">Wedding Date</p>
                    <p class="detail-value">19th - 21st March 2027</p>
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </a>

          <div class="detail-card">
            <Card.Root>
              <Card.Content class="flex items-center gap-4 p-5">
                <Badge variant="secondary" class="px-3 py-2 text-xl">📍</Badge>
                <div>
                  <p class="detail-label">Location</p>
                  <p class="detail-value">Seacroft Estate · Great Ocean Road, VIC</p>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 6rem 0;
    background: transparent;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease-out,
      transform 0.8s ease-out;
  }

  .about-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-section::before {
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

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1.5rem;
    color: var(--primary);
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

  .floating-details a {
    text-decoration: none;
    color: inherit;
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

  .detail-card {
    min-width: 220px;
    transition: transform 0.3s ease;
  }

  .detail-card:hover {
    transform: translateY(-5px);
  }

  .detail-card-clickable:hover {
    background: linear-gradient(135deg, rgba(122, 184, 212, 0.05), rgba(212, 165, 116, 0.05));
  }

  .detail-label {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 0.2rem;
  }

  .detail-value {
    font-weight: 600;
    color: var(--text-dark);
    font-size: 1rem;
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
    .about-section {
      padding: 4rem 0;
    }

    .floating-details {
      flex-direction: column;
      align-items: stretch;
    }

    .detail-card {
      min-width: auto;
    }

    .fact-item {
      text-align: center;
    }
  }
</style>
