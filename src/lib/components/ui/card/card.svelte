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
    'text-card-foreground border-border bg-card/85 hover:bg-card/90 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
