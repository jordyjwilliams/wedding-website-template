<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import type { WithElementRef } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import Icon from '@iconify/svelte';

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

  let showPassword = $state(false);

  const baseClass =
    'border-input/50 ring-offset-background placeholder:text-muted-foreground hover:border-primary/50 focus-visible:ring-ring bg-card/85 focus-visible:bg-card/95 flex h-11 w-full rounded-xl border px-4 py-2 text-base shadow-sm backdrop-blur-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
</script>

{#if type === 'file'}
  <input
    bind:this={ref}
    class={cn(baseClass, className)}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else if type === 'password'}
  <div class="relative">
    <input
      bind:this={ref}
      class={cn(baseClass, 'pr-11', className)}
      type={showPassword ? 'text' : 'password'}
      bind:value
      {...restProps}
    />
    <button
      type="button"
      class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
      onclick={() => (showPassword = !showPassword)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      tabindex="-1"
    >
      <Icon icon={showPassword ? 'ph:eye-slash' : 'ph:eye'} width="20" />
    </button>
  </div>
{:else}
  <input bind:this={ref} class={cn(baseClass, className)} {type} bind:value {...restProps} />
{/if}
