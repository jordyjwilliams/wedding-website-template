<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

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
</script>

<section class="about-section" class:visible>
  <div class="container">
    <div class="about-grid">
      <div class="about-content">
        <h2 class="section-title">💕 Our Story 💕</h2>
        <p class="intro-text">Every love story is beautiful, but we think our's is pretty cute.</p>
        <p class="story-text">
          Once upon a time, Jordy was sitting on a train from Prague to Kutna Hora when he met Nicole (and Megan!).
          From a chance conversation, the rest, as they say is history.
        </p>
        <p class="story-text">
          From a relationship that started with some difficult geographical challenges and a lot of video calls
          to a "yes" at 5,106m above sea-level at Larkya La Pass, Nepal.
          ... ... Fill this out properly...
        </p>
        <div class="love-facts">
          <div class="fact">
            <span class="fact-icon"><Icon icon="ph:coffee-fill" width="32" /></span>
            <p><strong>First Date:</strong> Trains, then a trip in a murder van to Iceland</p>
          </div>
          <div class="fact">
            <span class="fact-icon"><Icon icon="ph:airplane-fill" width="32" /></span>
            <p><strong>Adventures:</strong> XX countries together. Current location: Australia</p>
          </div>
          <div class="fact">
            <span class="fact-icon"><Icon icon="ph:heart-fill" width="32" /></span>
            <p><strong>The Proposal:</strong> Larkya La Pass, Nepal</p>
          </div>
        </div>
      </div>

      <div class="about-visual">
        <div class="photo-card main-photo">
          <div class="photo-placeholder">
            <span class="placeholder-icon"><Icon icon="ph:camera-fill" width="64" /></span>
            <p>PHOTO TODO</p>
          </div>
          <div class="photo-label">She Said Yes...</div>
        </div>

        <div class="floating-details">
          <div class="detail-card">
            <span class="detail-icon"><Icon icon="ph:calendar-plus" width="24" /></span>
            <div>
              <p class="detail-label">Wedding Date</p>
              <p class="detail-value">19th - 21st March 2027</p>
            </div>
          </a>
          <div class="detail-card">
            <span class="detail-icon"><Icon icon="ph:map-pin-fill" width="24" /></span>
            <div>
              <p class="detail-label">Location</p>
              <p class="detail-value">Seacroft Estate · Great Ocean Road, VIC </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 6rem 0;
    background: var(--white);
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
    gap: 1.5rem;
  }

  .fact {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.2rem;
    background: var(--bg-light);
    border-radius: 15px;
    transition: var(--transition);
  }

  .fact:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 20px var(--shadow);
  }

  .fact-icon {
    font-size: 2rem;
    flex-shrink: 0;
    color: var(--primary);
  }

  .fact-icon :global(svg) {
    filter: drop-shadow(0 2px 4px rgba(212, 165, 116, 0.2));
  }

  .fact p {
    margin: 0;
    color: var(--text-light);
    line-height: 1.6;
  }

  .fact strong {
    color: var(--text-dark);
  }

  .about-visual {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .photo-card {
    position: relative;
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
    max-width: 400px;
    background: var(--white);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .photo-placeholder {
    aspect-ratio: 3/4;
    background: linear-gradient(135deg, var(--accent), var(--primary));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--white);
  }

  .placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .photo-placeholder p {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .photo-label {
    padding: 1.5rem;
    text-align: center;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--text-dark);
    font-weight: 600;
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

  .detail-card {
    background: var(--white);
    padding: 1.2rem 1.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 220px;
    transition: var(--transition);
  }

  .detail-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .detail-icon {
    font-size: 2rem;
    color: var(--accent);
  }

  .detail-icon :global(svg) {
    filter: drop-shadow(0 2px 4px rgba(122, 184, 212, 0.3));
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

    .love-facts .fact {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
