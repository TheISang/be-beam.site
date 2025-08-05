import * as React from 'react';

import { cn } from '@/lib/tailwind';
import { Label } from '../label/Label';
import { FormMessage } from '../form/FormMessage';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  labelClassName?: string;
  maxLengthClassName?: string;
  endContent?: React.ReactNode;
  description?: string;
  error?: string;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      labelClassName,
      className,
      maxLengthClassName,
      label,
      description,
      error,
      maxLength,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
    const [internalValue, setInternalValue] = React.useState(
      value || defaultValue || '',
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const charCount = String(internalValue).length;

    return (
      <div className="relative flex flex-col gap-2">
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
        <div className="group relative" aria-invalid={!!error}>
          <textarea
            data-slot="textarea"
            ref={ref}
            id={id}
            aria-invalid={!!error}
            className={cn(
              'flex field-sizing-content min-h-16 w-full resize-none rounded-lg border border-gray-400 bg-transparent px-3 pt-2 pb-9 text-t4 text-black shadow-xs transition-[color,box-shadow] outline-none group-aria-invalid:border-error group-aria-invalid:ring-error/20 placeholder:text-gray-500 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className,
            )}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            {...props}
          />

          {maxLength !== undefined && (
            <div
              className={cn(
                'absolute right-4 bottom-3 text-b3',
                maxLengthClassName,
              )}
            >
              <span className="text-primary group-aria-invalid:text-error">
                {charCount}
              </span>
              <span className="text-gray-700">/{maxLength}</span>
            </div>
          )}
        </div>
        {error ? (
          <FormMessage variant="error">{error}</FormMessage>
        ) : description ? (
          <FormMessage>{description}</FormMessage>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
