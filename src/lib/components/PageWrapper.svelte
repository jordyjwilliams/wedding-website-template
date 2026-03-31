<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import Icon from '@iconify/svelte';

  interface Props {
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundPosition?: string;
    overlayOnScroll?: boolean;
    children?: Snippet;
    pageEntranceAnimation?: 'fade' | 'fade-down' | 'fade-up';
    pageEntranceDuration?: number;
    showOrbs?: boolean;
    showHearts?: boolean;
    showGradientOverlay?: boolean;
  }

  let {
    backgroundImage,
    backgroundColor,
    backgroundPosition = 'center',
    overlayOnScroll = true,
    children,
    pageEntranceAnimation = 'fade',
    pageEntranceDuration = 600,
    showOrbs = false,
    showHearts = false,
    showGradientOverlay = false,
  }: Props = $props();

  const heartPositions = ['15%', '35%', '55%', '75%', '25%', '85%'];

  const initialOverlayOpacity: number = 0.62;
  const minOverlayOpacity: number = 0.42;
  const restoreDelayMs: number = 60;
  const scrollIntensity: number = 0.45;

  let visible = $state(false);
  let overlayOpacity = $state(initialOverlayOpacity);
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    visible = true;

    if (!overlayOnScroll) {
      return () => {};
    }

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      overlayOpacity = Math.max(
        minOverlayOpacity,
        initialOverlayOpacity - scrollPercent * scrollIntensity
      );

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        overlayOpacity = initialOverlayOpacity;
      }, restoreDelayMs);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  });
</script>

{#if showHearts}
  <!-- Floating hearts from bottom — truly fixed to viewport -->
  <div class="pointer-events-none fixed bottom-0 left-0 z-10 w-full" aria-hidden="true">
    {#each heartPositions as left, i (i)}
      <span
        class="heart absolute opacity-0"
        style="left: {left}; animation: floatUp {12 + i * 3}s ease-in {i * 1.5}s infinite;"
      >
        <Icon icon="ph:heart-fill" width="22" />
      </span>
    {/each}
  </div>
{/if}
{#if showOrbs}
  <!-- Static orbs as background layer -->
  <div class="pointer-events-none absolute inset-0" aria-hidden="true">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
{/if}

<style>
  /* Default fade entrance animation */
  .page-wrapper {
    opacity: 0;
    min-height: 100vh;
    position: relative;
  }

  .page-wrapper--fade {
    transition: opacity var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper--fade-down {
    transform: translateY(-20px);
    transition:
      opacity var(--entrance-duration, 0.6s) ease-out,
      transform var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper--fade-up {
    transform: translateY(20px);
    transition:
      opacity var(--entrance-duration, 0.6s) ease-out,
      transform var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Background image applied via CSS so background-attachment
     can be toggled in media queries (avoids window.innerWidth in SSR) */
  .page-wrapper.has-bg {
    background-image: var(--bg-image);
    background-position: var(--bg-position, center);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  /* Frosted overlay */
  .page-wrapper.has-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background: color-mix(in srgb, var(--color-background) 70%, transparent);
    opacity: var(--overlay-opacity);
    transition: opacity 0.6s ease-out;
    pointer-events: none;
    z-index: 0;
  }

  /* Mobile: fixed bg causes rendering bugs on iOS */
  @media (max-width: 640px) {
    .page-wrapper.has-bg {
      background-attachment: scroll;
    }

    .page-wrapper.has-bg::before {
      position: absolute;
    }
  }

  /* Ultra-wide: contain rather than cover so image isn't over-stretched */
  @media (min-width: 1920px) {
    .page-wrapper.has-bg {
      background-size: cover;
    }
  }

  .page-wrapper > :global(*) {
    position: relative;
    z-index: 1;
  }

  /* Gradient ambient orbs — static background */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.28;
  }

  .orb-1 {
    width: clamp(400px, 50vw, 700px);
    height: clamp(400px, 50vw, 700px);
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    top: -30%;
    right: -15%;
  }

  .orb-2 {
    width: clamp(320px, 40vw, 560px);
    height: clamp(320px, 40vw, 560px);
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    bottom: -20%;
    left: -12%;
  }

  .orb-3 {
    width: clamp(260px, 30vw, 460px);
    height: clamp(260px, 30vw, 460px);
    background: linear-gradient(135deg, var(--color-accent), var(--color-primary-dark));
    top: 40%;
    left: 28%;
  }

  /* Floating heart animation — floatUp keyframe lives in app.css */
  .heart {
    color: var(--color-primary);
    will-change: transform, opacity;
    z-index: 2;
  }

  .heart :global(svg) {
    filter: drop-shadow(0 0 8px color-mix(in srgb, var(--color-primary) 45%, transparent))
      drop-shadow(0 0 18px color-mix(in srgb, var(--color-accent) 35%, transparent));
  }

  @media (max-width: 640px) {
    .orb {
      filter: blur(70px);
      opacity: 0.22;
    }
  }
</style>
