import { tv } from 'tailwind-variants';

export const glassCardVariants = tv({
  base: 'rounded-3xl border transition-all duration-300 hover:translate-y-[-5px]',
  variants: {
    glass: {
      light: 'bg-white/75 backdrop-blur-md border-white/30 shadow-md hover:shadow-lg',
      medium: 'bg-white/90 backdrop-blur-lg border-white/40 shadow-lg hover:shadow-xl',
      heavy: 'bg-white/95 backdrop-blur-xl border-white/40 shadow-xl hover:shadow-2xl',
    },
  },
  defaultVariants: {
    glass: 'medium',
  },
});
