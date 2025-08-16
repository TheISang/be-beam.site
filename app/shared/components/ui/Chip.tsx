import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, focusVisibleRing } from '@/styles/tailwind';

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-3xl border-none pl-4 pr-4 py-3 text-b1 w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] overflow-hidden h-6.5 h-9',
  {
    variants: {
      variant: {
        primary: 'bg-gray-900 text-white',
        secondary: 'bg-gray-200 text-black',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function Chip({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(focusVisibleRing(), chipVariants({ variant }), className)}
      {...props}
    ></Comp>
  );
}

export { Chip, chipVariants };
