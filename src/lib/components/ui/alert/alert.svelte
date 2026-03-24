<script lang="ts" module>
  import { type VariantProps, tv } from 'tailwind-variants';

  export const alertVariants = tv({
    base: '[&>svg]:text-foreground relative w-full rounded-xl border p-4 backdrop-blur-md shadow-md transition-all duration-200 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
    variants: {
      variant: {
        default: 'border-border/30 bg-card/85 text-foreground',
        destructive:
          'border-destructive/50 bg-destructive/10 text-destructive backdrop-blur-md dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { WithElementRef } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'default',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant;
  } = $props();
</script>

<div bind:this={ref} class={cn(alertVariants({ variant }), className)} {...restProps} role="alert">
  {@render children?.()}
</div>
