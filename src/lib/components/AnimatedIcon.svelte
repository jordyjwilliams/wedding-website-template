<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    icon: string;
    size?: number;
    animation?: 'bounce' | 'float' | 'none';
    color?: string;
    delay?: string;
  }

  let {
    icon,
    size = 56,
    animation = 'bounce',
    color,
    delay = '0s',
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  class="animated-icon {className || ''}"
  class:animate-bounce={animation === 'bounce'}
  class:animate-float={animation === 'float'}
  style:--icon-size="{size}px"
  style:--icon-color={color}
  style:animation-delay={delay}
  {...restProps}
>
  <Icon {icon} width={size} />
</div>

<style>
  .animated-icon {
    font-size: var(--icon-size, 3.5rem);
    display: inline-block;
    color: var(--icon-color, var(--color-primary));
  }

  .animated-icon :global(svg) {
    filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--color-primary) 30%, transparent));
  }
</style>
