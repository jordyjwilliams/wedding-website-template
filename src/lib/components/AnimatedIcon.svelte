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
  class:bounce={animation === 'bounce'}
  class:float={animation === 'float'}
  style:--icon-size="{size}px"
  style:--icon-color={color}
  style:--animation-delay={delay}
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

  .animated-icon.bounce {
    animation: bounce 2s infinite;
    animation-delay: var(--animation-delay, 0s);
  }

  .animated-icon.float {
    animation: float 3s infinite ease-in-out;
    animation-delay: var(--animation-delay, 0s);
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
</style>
