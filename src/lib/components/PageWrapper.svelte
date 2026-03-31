<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  interface Props {
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundPosition?: string;
    overlayOnScroll?: boolean;
    children?: Snippet;
    pageEntranceAnimation?: 'fade' | 'fade-down' | 'fade-up';
    pageEntranceDuration?: number;
  }

  let {
    backgroundImage,
    backgroundColor,
    backgroundPosition = 'center',
    overlayOnScroll = true,
    children,
    pageEntranceAnimation = 'fade',
    pageEntranceDuration = 600,
  }: Props = $props();

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

<!--
  background-attachment: fixed is set in CSS (not inline) so it's
  handled via media query on mobile — avoids SSR window.innerWidth access.
-->
<div
  class="page-wrapper page-wrapper--{pageEntranceAnimation}"
  class:visible
  class:has-bg={!!backgroundImage}
  style:--overlay-opacity={overlayOpacity}
  style:--bg-image={backgroundImage ? `url('${backgroundImage}')` : 'none'}
  style:--bg-position={backgroundPosition}
  style:--entrance-duration="{pageEntranceDuration}ms"
  style:background={!backgroundImage ? backgroundColor || 'transparent' : undefined}
>
  {#if children}
    {@render children()}
  {/if}
</div>

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
</style>
