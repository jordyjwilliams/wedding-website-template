import { tv } from 'tailwind-variants';

export const animatedCardVariants = tv({
  base: 'transition-all duration-300',
  variants: {
    hover: {
      lift: 'hover:translate-y-[-10px] hover:shadow-xl',
      'lift-sm': 'hover:translate-y-[-5px] hover:shadow-lg',
      none: '',
    },
    animation: {
      'fade-in': 'opacity-0 animate-in fade-in duration-700',
      'slide-in-left': 'opacity-0 animate-in slide-in-from-left-8 duration-700',
      'slide-in-right': 'opacity-0 animate-in slide-in-from-right-8 duration-700',
      none: '',
    },
  },
  defaultVariants: {
    hover: 'lift-sm',
    animation: 'none',
  },
});
