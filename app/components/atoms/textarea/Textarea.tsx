import * as React from 'react';

import { cn } from '@/lib/tailwind';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <div>
      <textarea
        data-slot="textarea"
        ref={ref}
        className={cn(
          'flex field-sizing-content min-h-16 w-full resize-none rounded-lg border border-gray-400 bg-transparent px-3 py-2 text-t4 text-black shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-error/20 md:text-sm',
          className,
        )}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
