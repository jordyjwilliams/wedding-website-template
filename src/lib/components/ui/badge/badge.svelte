<script lang="ts" module>
  import { type VariantProps, tv } from 'tailwind-variants';

  export const badgeVariants = tv({
    base: 'focus:ring-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:scale-105',
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
        secondary:
          'bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-secondary/30 backdrop-blur-[8px]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
        outline: 'text-foreground bg-card/80 backdrop-blur-[8px] hover:bg-card border-border/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = 'default',
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
  } = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
