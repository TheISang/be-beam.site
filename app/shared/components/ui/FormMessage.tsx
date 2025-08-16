'use client';

import * as React from 'react';

import { cn } from '@/styles/tailwind';

interface FormMessageProps extends React.ComponentProps<'p'> {
  variant?: 'default' | 'error';
}

function FormMessage({
  className,
  variant = 'default',
  ...props
}: FormMessageProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-c3',
        variant === 'error' ? 'text-error' : 'text-primary',
        className,
      )}
      {...props}
    />
  );
}

export { FormMessage };
