<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { glassCardVariants } from './glass-variants';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    glass?: 'light' | 'medium' | 'heavy';
    class?: string;
    children?: Snippet;
  }

  let { glass = 'medium', class: className, children, ...restProps }: Props = $props();
</script>

<Card.Root class={glassCardVariants({ glass, className })} {...restProps}>
  {@render children?.()}
</Card.Root>
