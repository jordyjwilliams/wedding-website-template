<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    icon: string;
    size?: number;
    animation?:
      | 'none'
      | 'pulse'
      | 'bounce'
      | 'ping'
      | 'spin'
      | 'float'
      | 'fade-in'
      | 'fade-in-up'
      | 'fade-in-down'
      | 'fade-in-scale'
      | 'spin-in';
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

  const animationClassMap: Record<NonNullable<Props['animation']>, string> = {
    none: '',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    ping: 'animate-ping',
    spin: 'animate-spin',
    float: 'animate-float',
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'fade-in-scale': 'animate-fade-in-scale',
    'spin-in': 'animate-spin-in',
  };

  const getAnimationClass = (value: NonNullable<Props['animation']>) =>
    animationClassMap[value] || '';
</script>

<div
  class="animated-icon {className || ''} {getAnimationClass(animation)}"
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
