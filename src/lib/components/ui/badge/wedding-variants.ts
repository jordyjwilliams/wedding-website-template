import { tv } from 'tailwind-variants';

export const weddingBadgeVariants = tv({
  base: 'inline-flex items-center gap-2',
  variants: {
    size: {
      icon: 'px-3 py-2 text-xl',
      'icon-lg': 'px-3 py-2 text-2xl',
      event: 'px-4 py-1 text-base',
    },
  },
});
