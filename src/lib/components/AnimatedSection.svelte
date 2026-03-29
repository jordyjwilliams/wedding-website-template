<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    threshold?: number;
    delay?: string;
  }

  let { children, threshold = 0.1, delay = '0s', class: className, ...restProps }: Props = $props();

  let visible = $state(false);
  let sectionEl: HTMLElement;

  onMount(() => {
    // If element is already in view on initial load, defer visibility by one frame
    // so the browser paints the initial state before transitioning to visible.
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        requestAnimationFrame(() => {
          visible = true;
        });
        return () => {};
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section
  bind:this={sectionEl}
  class="animated-section {className || ''}"
  class:visible
  style:--delay={delay}
  {...restProps}
>
  {@render children?.()}
</section>

<style>
  .animated-section {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity var(--duration-section-entrance, 0.8s) var(--easing-entrance, ease-out),
      transform var(--duration-section-entrance, 0.8s) var(--easing-entrance, ease-out);
    transition-delay: var(--delay, 0s);
  }

  .animated-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
