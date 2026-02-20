<script lang="ts">
  import { onMount, setContext, type Snippet } from 'svelte';

  interface Props {
    backgroundImage?: string;
    backgroundColor?: string;
    children?: Snippet;
  }

  let { backgroundImage, backgroundColor, children }: Props = $props();
  // Scroll effect reduce glassy effect/opacity of background overlay
  // to a min value, restores after timeout
  const initialOverlayOpacity: number = 0.85;
  const minOverlayOpacity: number = 0.6;
  const restoreDelayMs: number = 60; // Delay before restoring opacity

  // How much the opacity reduces at max scroll
  const scrollIntensity: number = 0.45;
  let visible = $state(false);

  // Default: 85%, reduces to 40% on scroll
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

<div
  class="page-wrapper"
  class:visible
  class:has-bg={!!backgroundImage}
  style:--overlay-opacity={overlayOpacity}
  style:background={backgroundImage
    ? `url('${backgroundImage}') center/cover fixed`
    : backgroundColor || 'transparent'}
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

  .page-wrapper.has-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background: hsl(var(--background) / 0.7);
    opacity: var(--overlay-opacity);
    transition: opacity 0.6s ease-out;
    pointer-events: none;
    z-index: 0;
  }

  .page-wrapper > :global(*) {
    position: relative;
    z-index: 1;
  }

  .page-wrapper.visible {
    opacity: 1;
  }
</style>
