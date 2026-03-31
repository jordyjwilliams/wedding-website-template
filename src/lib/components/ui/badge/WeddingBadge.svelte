<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { weddingBadgeVariants } from '$lib/components/ui/badge/wedding-variants';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    icon?: string;
    iconWidth?: number;
    size?: 'icon' | 'icon-lg' | 'event';
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'glass';
    class?: string;
    children?: Snippet;
  }

  let {
    icon,
    iconWidth = 16,
    size = 'icon',
    variant = 'glass',
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<Badge {variant} class={weddingBadgeVariants({ size, className })} {...restProps}>
  {#if icon}
    <Icon {icon} width={iconWidth} class="inline" />
  {/if}
  {@render children?.()}
</Badge>
