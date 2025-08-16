import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, focusVisibleRing } from '@/styles/tailwind';

const squareChipVariants = cva(
  'inline-flex items-center justify-center rounded-md border pl-4 pr-4 py-3 text-b1 w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] overflow-hidden h-6.5 h-9',
  {
    variants: {
      variant: {
        primary: 'bg-[#FFFAF0] text-primary border-primary',
        secondary: 'border-gray-300 bg-white text-black border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function SquareChip({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof squareChipVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(
        focusVisibleRing(),
        squareChipVariants({ variant }),
        className,
      )}
      {...props}
    ></Comp>
  );
}

export { SquareChip, squareChipVariants };
