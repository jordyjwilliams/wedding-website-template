<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    columns?: string;
    gap?: string;
    itemDelay?: number;
  }

  let {
    children,
    columns = 'repeat(auto-fit, minmax(280px, 1fr))',
    gap = '2rem',
    itemDelay = 0.2,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  class="animated-grid {className || ''}"
  style:--columns={columns}
  style:--gap={gap}
  style:--item-delay="{itemDelay}s"
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .animated-grid {
    display: grid;
    grid-template-columns: var(--columns);
    gap: var(--gap);
  }

  /* Staggered fade-in-up for direct children — uses global fadeInUp keyframe */
  .animated-grid :global(> *) {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out both;
  }

  .animated-grid :global(> *:nth-child(1)) {
    animation-delay: calc(var(--item-delay) * 1);
  }

  .animated-grid :global(> *:nth-child(2)) {
    animation-delay: calc(var(--item-delay) * 2);
  }

  .animated-grid :global(> *:nth-child(3)) {
    animation-delay: calc(var(--item-delay) * 3);
  }

  .animated-grid :global(> *:nth-child(4)) {
    animation-delay: calc(var(--item-delay) * 4);
  }

  .animated-grid :global(> *:nth-child(5)) {
    animation-delay: calc(var(--item-delay) * 5);
  }

  .animated-grid :global(> *:nth-child(6)) {
    animation-delay: calc(var(--item-delay) * 6);
  }
</style>
