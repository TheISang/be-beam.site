import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, focusVisibleRing } from '@/styles/tailwind';
import CloseIcon from '../icons/CloseIcon';

const tagVariants = cva(
  'inline-flex items-center justify-center rounded-md pl-2 py-1 text-c1 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] h-6.5',
  {
    variants: {
      variant: {
        primary: 'bg-primary-light text-primary',
        tertiary: 'bg-gray-200 text-black',
        blue: 'bg-info-light text-info',
        brown: 'bg-[#f7dbb4] text-[#9f620a]',
        pink: 'bg-[#ffd1e3] text-[#ff4891]',
        red: 'bg-error/10 text-error',
        green: 'bg-success/10 text-success',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function Tag({
  className,
  variant,
  children,
  onClear,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof tagVariants> & {
    onClear?: () => void;
  }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        tagVariants({ variant }),
        onClear ? 'pr-1' : 'pr-2',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={cn(focusVisibleRing(), 'cursor-pointer')}
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </span>
  );
}

export { Tag, tagVariants };
