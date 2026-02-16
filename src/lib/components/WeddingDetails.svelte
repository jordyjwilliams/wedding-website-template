<script lang="ts">
  import { onMount } from 'svelte';

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

    return () => observer.disconnect();
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
          <p class="timeline-date">19th March 2027</p>
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
          <p class="timeline-date">20th March 2027</p>
          <p>
            The ceremony will be held on the grounds overlooking the ocean, followed by lawn games,
            canapés and a relaxed dinner and dancing under the stars.

            TODO: Define this all properly...
          </p>
          <div class="timeline-highlights">
            <span class="highlight-badge">🌅 4:00 PM — Ceremony</span>
            <span class="highlight-badge">🍾 5:30 PM — Cocktail Hour</span>
            <span class="highlight-badge">🍽️ 7:00 PM — Dinner</span>
            <span class="highlight-badge">💃 9:00 PM — Dancing</span>
          </div>
        </div>
      </div>

      <div class="timeline-item" style="--delay: 0.6s">
        <div class="timeline-icon">
          <span>3</span>
        </div>
        <div class="timeline-content">
          <h3>Sunday — Slow Goodbyes</h3>
          <p class="timeline-date">21st March 2027</p>
          <p>
            Sleep in, grab a coffee, wander the cliffs or dip your toes in the water. We'll share a
            simple brunch before saying our goodbyes.

            Travel plans... Next steps etc etc.
          </p>
        </div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-card" style="--delay: 0.8s">
        <div class="info-icon">🏡</div>
        <h3>Accommodation</h3>
        <p>
          Seacroft offers a mix of rooms and cabins. We'll allocate rooms once we have everyone's
          RSVPs and will confirm details closer to the date.
        </p>
      </div>

      <div class="info-card" style="--delay: 1s">
        <div class="info-icon">🎒</div>
        <h3>What to Pack</h3>
        <p>
          Think coastal comfort: layers for cool evenings, comfortable shoes, and anything you'd
          like for beach walks and outdoor time.
        </p>
      </div>

      <div class="info-card" style="--delay: 1.2s">
        <div class="info-icon">🚗</div>
        <h3>Getting There</h3>
        <p>
          Seacroft is located along the Great Ocean Road. Car-pooling is encouraged; we'll share
          more detailed directions closer to the day.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .wedding-section {
    padding: 6rem 0;
    background: var(--bg-light);
    position: relative;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 1rem;
    color: var(--primary);
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
    background: var(--white);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px var(--shadow);
    transition: var(--transition);
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

  .highlight-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--bg-light);
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-dark);
    border: 1px solid var(--accent);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
  }

  .info-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 10px 30px var(--shadow);
    transition: var(--transition);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out var(--delay, 0s) forwards;
  }

  .wedding-section.visible .info-card {
    animation-play-state: running;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .info-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }

  .info-icon {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    animation: bounce 2s infinite;
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

  .info-card h3 {
    font-size: 1.6rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .info-card p {
    color: var(--text-light);
    line-height: 1.7;
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

    .highlight-badge {
      width: 100%;
    }
  }
</style>
