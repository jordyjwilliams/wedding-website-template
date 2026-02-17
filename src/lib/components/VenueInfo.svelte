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
      <div class="feature-card" style="--delay: 0.2s">
        <div class="feature-icon"><Icon icon="ph:church" width="64" /></div>
        <h3>TODO: More details</h3>
        <p>
          Inside: A beautifully restored 1920's chapel with stunning stained glass windows, original wood
          panelling, and ocean views through unique rectangular windows.
        </p>
      </div>

      <div class="feature-card" style="--delay: 0.4s">
        <div class="feature-icon"><Icon icon="ph:waves" width="64" /></div>
        <h3>Ocean Views</h3>
        <p>
          Outside: Set on 25 acres with 180-degree ocean views overlooking the Great Ocean Road. Perfect for
          photos and unforgettable sunsets.
        </p>
      </div>

      <div class="feature-card" style="--delay: 0.6s">
        <div class="feature-icon"><Icon icon="ph:umbrella-simple-fill" width="64" /></div>
        <h3>(Private-ish) Beach</h3>
        <p>
          Beach: Access to a secluded beach across the road. Perfect for morning swims, sunset walks, or
          just relaxing by the water.
        </p>
      </div>

      <div class="feature-card" style="--delay: 0.8s">
        <div class="feature-icon"><Icon icon="mdi:barley" width="64" /></div>
        <h3>Beautiful Grounds</h3>
        <p>
          Stunning lawns and gardens, historic buildings, and even some friendly cows to keep you
          company during your stay.
        </p>
      </div>
    </div>

    <div class="venue-cta">
      <p class="cta-text">Want to learn more about this amazing venue?</p>
      <a
        href="https://www.seacroft.com/weddings/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-venue"
      >
        Explore Seacroft Estate
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
</section>

<style>
  .venue-section {
    padding: 6rem 0;
    background: var(--white);
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

  .venue-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .feature-card {
    background: var(--bg-light);
    padding: 2.5rem 2rem;
    border-radius: 25px;
    text-align: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease-out var(--delay, 0s) forwards;
  }

  .venue-section.visible .feature-card {
    animation-play-state: running;
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
    height: 5px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .feature-card:hover::before {
    transform: scaleX(1);
  }

  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    background: var(--white);
  }

  .feature-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    animation: float 3s infinite ease-in-out;
    color: var(--accent);
  }

  .feature-icon :global(svg) {
    filter: drop-shadow(0 4px 8px rgba(122, 184, 212, 0.3));
  }

  .feature-card:nth-child(2) .feature-icon {
    animation-delay: 0.5s;
  }

  .feature-card:nth-child(3) .feature-icon {
    animation-delay: 1s;
  }

  .feature-card:nth-child(4) .feature-icon {
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

  .feature-card h3 {
    font-size: 1.6rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .feature-card p {
    color: var(--text-light);
    line-height: 1.7;
    font-size: 1rem;
  }

  .venue-cta {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, var(--bg-light), var(--white));
    border-radius: 30px;
    margin-top: 3rem;
  }

  .cta-text {
    font-size: 1.3rem;
    color: var(--text-dark);
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .btn-venue {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 2.5rem;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 0.3px;
    transition: var(--transition);
    box-shadow: 0 10px 30px rgba(212, 165, 116, 0.3);
  }

  .btn-venue:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 165, 116, 0.4);
  }

  .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
    font-size: 1.3rem;
  }

  .btn-venue:hover .arrow {
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
