<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { AnimatedIcon } from '$lib/components';
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

<div
  class="transition-transform duration-300
         {hoverLift ? 'hover:-translate-y-2.5' : ''}
         {className || ''}"
  {...restProps}
>
  <Card.Root class="glass h-full">
    <Card.Content class="flex flex-col items-center pt-6 text-center">
      <div class="mb-6">
        <AnimatedIcon {icon} size={iconSize} animation={iconAnimation} delay={iconDelay} />
      </div>
      <Card.Title class="mb-2">{title}</Card.Title>
      {#if description}
        <Card.Description class="leading-relaxed">{description}</Card.Description>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
