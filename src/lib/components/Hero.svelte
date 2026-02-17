<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let visible: boolean = false;

  onMount(() => {
    setTimeout(() => (visible = true), 100);
  });

  function scrollToRSVP(): void {
    window.location.href = '/rsvp';
  }
</script>

<section class="hero" class:visible>
  <div class="hero-background">
    <div class="gradient-shape shape-1"></div>
    <div class="gradient-shape shape-2"></div>
    <div class="gradient-shape shape-3"></div>
    <div class="floating-hearts">
      {#each Array(6) as _unused, i}
        <span class="heart" style="--delay: {i * 1.5}s; --duration: {12 + i * 3}s">
          <Icon icon="ph:heart-fill" width="24" />
        </span>
      {/each}
    </div>
  </div>

  <div class="hero-content">
    <p class="eyebrow">✨ We're getting married ✨</p>
    <h1 class="hero-title">
      <span class="name">Jordy</span>
      <span class="ampersand">&</span>
      <span class="name">Nicole</span>
    </h1>
    <div class="hero-details">
      <p class="date">19th - 21st March 2027</p>
      <p class="location">
        <Icon icon="ph:map-pin-fill" width="20" class="icon" />
        Seacroft Estate · Great Ocean Road, VIC
      </p>
    </div>
    <button class="btn-hero" on:click={scrollToRSVP}>
      RSVP Now
      <span class="arrow">→</span>
    </button>
  </div>

  <div class="scroll-indicator">
    <span>Scroll to find out more...</span>
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #faf8f6 0%, #f5e6d3 100%);
    padding: 6rem 2rem 4rem;
    opacity: 0;
    transition: opacity 1s ease-out;
  }

  .hero.visible {
    opacity: 1;
  }

  .hero-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .gradient-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    animation: float 25s infinite ease-in-out;
  }

  .shape-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    top: -200px;
    right: -200px;
  }

  .shape-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    bottom: -150px;
    left: -150px;
    animation-delay: 5s;
  }

  .shape-3 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, var(--accent), var(--primary-dark));
    top: 50%;
    left: 30%;
    animation-delay: 10s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(50px, -50px) rotate(5deg) scale(1.1);
    }
    50% {
      transform: translate(-30px, 30px) rotate(-5deg) scale(0.9);
    }
    75% {
      transform: translate(60px, 20px) rotate(3deg) scale(1.05);
    }
  }

  .floating-hearts {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .heart {
    position: absolute;
    bottom: -50px;
    font-size: 1.2rem;
    opacity: 0;
    animation: floatUp var(--duration, 15s) infinite ease-in;
    animation-delay: var(--delay, 0s);
    color: var(--accent);
  }

  .heart :global(svg) {
    filter: drop-shadow(0 2px 4px rgba(122, 184, 212, 0.3));
  }

  .heart:nth-child(1) {
    left: 15%;
  }
  .heart:nth-child(2) {
    left: 35%;
  }
  .heart:nth-child(3) {
    left: 55%;
  }
  .heart:nth-child(4) {
    left: 75%;
  }
  .heart:nth-child(5) {
    left: 25%;
  }
  .heart:nth-child(6) {
    left: 85%;
  }

  @keyframes floatUp {
    0% {
      bottom: -50px;
      opacity: 0;
      transform: translateX(0) rotate(0deg);
    }
    15% {
      opacity: 0.3;
    }
    85% {
      opacity: 0.2;
    }
    100% {
      bottom: 110%;
      opacity: 0;
      transform: translateX(60px) rotate(180deg);
    }
  }

  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 900px;
  }

  .eyebrow {
    color: var(--primary);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
    animation: fadeInDown 0.8s ease-out 0.2s both;
  }

  .hero-title {
    font-size: clamp(3rem, 10vw, 6rem);
    margin-bottom: 2rem;
    line-height: 1.1;
    color: var(--text-dark);
  }

  .name {
    display: inline-block;
    animation: fadeInScale 0.8s ease-out 0.4s both;
  }

  .name:last-child {
    animation-delay: 0.8s;
  }

  .ampersand {
    display: inline-block;
    color: var(--primary);
    margin: 0 1rem;
    font-size: 0.8em;
    animation: rotate 0.8s ease-out 0.6s both;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes rotate {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }

  .hero-details {
    margin-bottom: 3rem;
    animation: fadeInUp 0.8s ease-out 1s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .date-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--secondary);
    margin-bottom: 0.8rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    transition: var(--transition);
  }

  .date-link:hover {
    background: rgba(212, 165, 116, 0.1);
    transform: translateY(-2px);
  }

  .date-link :global(svg) {
    color: var(--primary);
  }

  .location {
    font-size: 1.2rem;
    color: var(--text-light);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .location :global(svg) {
    color: var(--primary);
    filter: drop-shadow(0 2px 4px rgba(212, 165, 116, 0.2));
  }

  .btn-hero {
    padding: 1.2rem 3rem;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    animation: fadeInUp 0.8s ease-out 1.2s both;
    box-shadow: 0 10px 30px rgba(212, 165, 116, 0.3);
  }

  .btn-hero:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 165, 116, 0.4);
  }

  .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
  }

  .btn-hero:hover .arrow {
    transform: translateX(5px);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-light);
    font-size: 0.9rem;
    animation: fadeIn 0.8s ease-out 1.5s both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .mouse {
    width: 24px;
    height: 38px;
    border: 2px solid var(--text-light);
    border-radius: 12px;
    position: relative;
  }

  .wheel {
    width: 3px;
    height: 8px;
    background: var(--text-light);
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 1.5s infinite;
  }

  @keyframes scroll {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(12px);
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 5rem 1.5rem 3rem;
    }

    .eyebrow {
      font-size: 0.95rem;
    }

    .ampersand {
      margin: 0 0.5rem;
    }

    .date {
      font-size: 1.2rem;
    }

    .location {
      font-size: 1rem;
      flex-direction: column;
    }

    .gradient-shape {
      filter: blur(80px);
    }

    /* Hide extra hearts on mobile for cleaner experience */
    .heart:nth-child(n + 4) {
      display: none;
    }

    .heart {
      font-size: 1rem;
      opacity: 0;
    }
  }
</style>
