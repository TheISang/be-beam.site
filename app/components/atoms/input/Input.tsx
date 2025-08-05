import * as React from 'react';

import { cn } from '@/lib/tailwind';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full min-w-0 rounded-lg border border-gray-400 bg-white px-3 py-[13px] text-t4 shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-t3 placeholder:text-t4 placeholder:text-gray-500 focus:border-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
