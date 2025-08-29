import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, focusVisibleRing } from '@/styles/tailwind';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-t3 transition-all disabled:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary/90 disabled:text-gray-600 disabled:opacity-50',
        outline:
          'bg-white text-primary border border-primary hover:bg-primary-light disabled:opacity-50',
        ghost: 'bg-white text-black hover:bg-gray-200 disabled:opacity-50',
      },
      size: {
        md: 'h-12 w-12',
        lg: 'h-14.5 w-14.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

function IconButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="icon-button"
      className={cn(
        focusVisibleRing(),
        iconButtonVariants({ variant, size, className }),
      )}
      {...props}
    />
  );
}

export { IconButton, iconButtonVariants };
