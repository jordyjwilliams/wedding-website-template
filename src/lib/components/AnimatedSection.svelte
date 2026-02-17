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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold }
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
      opacity 0.8s ease-out,
      transform 0.8s ease-out;
    transition-delay: var(--delay, 0s);
  }

  .animated-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
