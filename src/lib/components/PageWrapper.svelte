<script lang="ts">
  import { onMount, setContext, type Snippet } from 'svelte';

  interface Props {
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundPosition?: string;
    children?: Snippet;
  }

  let {
    backgroundImage,
    backgroundColor,
    backgroundPosition = 'center',
    children,
  }: Props = $props();

  const initialOverlayOpacity: number = 0.85;
  const minOverlayOpacity: number = 0.6;
  const restoreDelayMs: number = 60;
  const scrollIntensity: number = 0.45;

  let visible = $state(false);
  let overlayOpacity = $state(initialOverlayOpacity);
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  setContext('scrollOpacity', {
    get value() {
      return overlayOpacity * 100;
    },
  });

  onMount(() => {
    visible = true;

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
  class="page-wrapper"
  class:visible
  class:has-bg={!!backgroundImage}
  style:--overlay-opacity={overlayOpacity}
  style:--bg-image={backgroundImage ? `url('${backgroundImage}')` : 'none'}
  style:--bg-position={backgroundPosition}
  style:background={!backgroundImage ? backgroundColor || 'transparent' : undefined}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .page-wrapper {
    opacity: 0;
    transition: opacity 0.6s ease-out;
    min-height: 100vh;
    position: relative;
  }

  .page-wrapper.visible {
    opacity: 1;
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
