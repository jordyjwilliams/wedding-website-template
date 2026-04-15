import { tv } from 'tailwind-variants';

export const glassCardVariants = tv({
  base: 'rounded-3xl border border-border transition-all duration-300 hover:translate-y-[-5px]',
  variants: {
    glass: {
      light: 'bg-card/80 backdrop-blur-md shadow-md hover:shadow-lg',
      medium: 'bg-card/90 backdrop-blur-lg shadow-lg hover:shadow-xl',
      heavy: 'bg-card/95 backdrop-blur-xl shadow-xl hover:shadow-2xl',
    },
  },
  defaultVariants: {
    glass: 'medium',
  },
});
