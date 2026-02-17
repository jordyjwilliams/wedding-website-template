<script lang="ts">
  import type { WithElementRef, WithoutChildren } from 'bits-ui';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
  bind:this={ref}
  class={cn(
    'flex min-h-[80px] w-full resize-y rounded-xl border border-input bg-white/70 px-4 py-3 text-base shadow-sm ring-offset-background backdrop-blur-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  )}
  bind:value
  {...restProps}
></textarea>
