<script lang="ts">
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn(
    'text-card-foreground border-border/20 bg-card/85 hover:bg-card/90 rounded-xl border shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04),0_0_0_1px_color-mix(in_srgb,var(--color-border)_30%,transparent)] backdrop-blur-md transition-all duration-300 hover:shadow-2xl',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
