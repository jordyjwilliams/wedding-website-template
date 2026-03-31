<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    threshold?: number;
    delay?: string;
    animation?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: string;
    animateEntrance?: boolean;
  }

  let {
    children,
    threshold = 0.1,
    delay = '0s',
    animation = 'up',
    distance = '30px',
    animateEntrance = true,
    class: className,
    ...restProps
  }: Props = $props();

  let visible = $state(false);
  let sectionEl: HTMLElement;

  onMount(() => {
    const shouldAnimate = animateEntrance && animation !== 'none';
    if (!shouldAnimate) {
      visible = true;
      return () => {};
    }

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
  class:from-up={animation === 'up'}
  class:from-down={animation === 'down'}
  class:from-left={animation === 'left'}
  class:from-right={animation === 'right'}
  class:no-entrance={!animateEntrance || animation === 'none'}
  style:--delay={delay}
  style:--distance={distance}
  {...restProps}
>
  {@render children?.()}
</section>

<style>
  .animated-section {
    --x-offset: 0px;
    --y-offset: var(--distance, 30px);
    transform: translate3d(var(--x-offset), var(--y-offset), 0);
    transition: transform var(--duration-section-entrance, 0.8s) var(--easing-entrance, ease-out);
    transition-delay: var(--delay, 0s);
  }

  .animated-section.from-up {
    --x-offset: 0px;
    --y-offset: var(--distance, 30px);
  }

  .animated-section.from-down {
    --x-offset: 0px;
    --y-offset: calc(var(--distance, 30px) * -1);
  }

  .animated-section.from-left {
    --x-offset: calc(var(--distance, 30px) * -1);
    --y-offset: 0px;
  }

  .animated-section.from-right {
    --x-offset: var(--distance, 30px);
    --y-offset: 0px;
  }

  .animated-section.visible {
    transform: translate3d(0, 0, 0);
  }

  .animated-section.no-entrance {
    transform: none;
    transition: none;
  }
</style>
