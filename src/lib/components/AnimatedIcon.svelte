<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    icon: string;
    size?: number;
    animation?: string;
    color?: string;
    delay?: string;
  }

  let {
    icon,
    size = 56,
    animation = 'pulse',
    color,
    delay = '0s',
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  class="animated-icon {className || ''} {animation !== 'none' ? `animate-${animation}` : ''}"
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
