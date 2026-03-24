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
    'border-input/50 ring-offset-background placeholder:text-muted-foreground hover:border-primary/50 focus-visible:ring-ring bg-card/85 focus-visible:bg-card/95 flex min-h-[80px] w-full resize-y rounded-xl border px-4 py-3 text-base shadow-sm backdrop-blur-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  )}
  bind:value
  {...restProps}
></textarea>
