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
{#if backgroundImage}
  <div
    class="page-wrapper page-wrapper--{pageEntranceAnimation} has-bg"
    class:visible
    class:has-gradient-overlay={showGradientOverlay}
    style:--overlay-opacity={overlayOpacity}
    style:--entrance-duration="{pageEntranceDuration}ms"
    style:--bg-image={`url('${backgroundImage}')`}
    style:--bg-position={backgroundPosition}
  >
    {#if showOrbs}
      <!-- Static orbs as background layer -->
      <div class="page-wrapper__orbs" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    {/if}

    <div class="page-wrapper__content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{:else}
  <div
    class="page-wrapper page-wrapper--{pageEntranceAnimation}"
    class:visible
    style:--entrance-duration="{pageEntranceDuration}ms"
    style:background={backgroundColor || 'transparent'}
  >
    {#if showOrbs}
      <!-- Static orbs as background layer -->
      <div class="page-wrapper__orbs" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    {/if}

    <div class="page-wrapper__content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{/if}

<style>
  .page-wrapper {
    opacity: 0;
    min-height: 100vh;
    position: relative;
  }

  .page-wrapper__orbs {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .page-wrapper__content {
    position: relative;
    z-index: 1;
  }

  /* All animations are opacity-only for pages with fixed backgrounds */
  /* (transforms break position:fixed on pseudo-elements) */
  .page-wrapper--fade {
    transition: opacity var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper--fade-down {
    transition: opacity var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper--fade-up {
    transition: opacity var(--entrance-duration, 0.6s) ease-out;
  }

  .page-wrapper.visible {
    opacity: 1;
  }

  /* Fixed background — truly locked to viewport, not affected by page scroll */
  .page-wrapper.has-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: var(--bg-image);
    background-position: var(--bg-position, center);
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    pointer-events: none;
  }

  /* Fixed frosted overlay — also locked to viewport */
  .page-wrapper.has-bg::after {
    content: '';
    position: fixed;
    inset: 0;
    background: color-mix(
      in srgb,
      var(--color-background) calc(var(--overlay-opacity, 0.62) * 100%),
      transparent
    );
    transition: background 0.6s ease-out;
    pointer-events: none;
    z-index: 0;
  }

  /* Gradient overlay for login page — applied on top of base overlay */
  .page-wrapper.has-bg.has-gradient-overlay::after {
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--color-background) 40%, transparent) 0%,
        color-mix(in srgb, var(--color-muted) 40%, transparent) 100%
      ),
      color-mix(
        in srgb,
        var(--color-background) calc(var(--overlay-opacity, 0.62) * 100%),
        transparent
      );
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
