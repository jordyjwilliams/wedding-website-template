<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import type { WithElementRef } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, 'type'> &
      ({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
  >;

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    ...restProps
  }: Props = $props();
</script>

{#if type === 'file'}
  <input
    bind:this={ref}
    class={cn(
      'border-input ring-offset-background placeholder:text-muted-foreground hover:border-primary/50 focus-visible:ring-ring flex h-11 w-full rounded-xl border bg-white/70 px-4 py-2 text-base shadow-sm backdrop-blur-sm transition-all duration-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    class={cn(
      'border-input ring-offset-background placeholder:text-muted-foreground hover:border-primary/50 focus-visible:ring-ring flex h-11 w-full rounded-xl border bg-white/70 px-4 py-2 text-base shadow-sm backdrop-blur-sm transition-all duration-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
