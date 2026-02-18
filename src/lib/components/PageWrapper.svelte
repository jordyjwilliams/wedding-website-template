<script lang="ts">
  import { onMount, setContext, type Snippet } from 'svelte';

  interface Props {
    backgroundImage?: string;
    backgroundColor?: string;
    children?: Snippet;
  }

  let { backgroundImage, backgroundColor, children }: Props = $props();

  let visible = $state(false);
  let overlayOpacity = $state(0.85); // Default: 85%, reduces to 40% on scroll
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
      overlayOpacity = Math.max(0.4, 0.85 - scrollPercent * 0.45);

      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        overlayOpacity = 0.85;
      }, 800);
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
  {@render children()}
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
    transition: opacity 1.2s ease-out;
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
