<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import AnimatedIcon from './AnimatedIcon.svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    icon: string;
    title: string;
    description?: string;
    iconSize?: number;
    iconAnimation?: 'bounce' | 'float' | 'none';
    iconDelay?: string;
    hoverLift?: boolean;
    children?: Snippet;
  }

  let {
    icon,
    title,
    description,
    iconSize = 56,
    iconAnimation = 'bounce',
    iconDelay = '0s',
    hoverLift = true,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div class="icon-card {className || ''}" class:hover-lift={hoverLift} {...restProps}>
  <Card.Root>
    <Card.Content class="pt-6 text-center">
      <div class="mb-6">
        <AnimatedIcon {icon} size={iconSize} animation={iconAnimation} delay={iconDelay} />
      </div>
      <Card.Title class="mb-2">{title}</Card.Title>
      {#if description}
        <Card.Description>{description}</Card.Description>
      {/if}
    </Card.Content>
  </Card.Root>
</div>

<style>
  .icon-card {
    transition: transform 0.3s ease;
  }

  .icon-card.hover-lift:hover {
    transform: translateY(-10px);
  }
</style>
