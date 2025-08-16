import * as React from 'react';
import { cn } from '@/styles/tailwind';
import InputDeleteIcon from '../icons/InputDeleteIcon';
import { Label } from '@/shared/components/ui/Label';
import { Input } from '@/shared/components/ui/Input';
import { FormMessage } from '@/shared/components/ui/FormMessage';

interface TextFieldProps extends React.ComponentProps<'input'> {
  isClearable?: boolean;
  label: string;
  description?: string;
  error?: string;
  rightSection?: React.ReactNode;
}

export const TextField = React.forwardRef<
  React.ComponentRef<'input'>,
  TextFieldProps
>(({ className, label, description, error, rightSection, ...props }, ref) => {
  const id = React.useId();

  return (
    <div className={cn('relative flex flex-col gap-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input ref={ref} aria-invalid={!!error} id={id} {...props} />
        {rightSection && (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            {rightSection}
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
});

export const ClearButton = (props: React.ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center p-1',
        props.className,
      )}
      type="button"
      aria-label="Clear"
      {...props}
    >
      <InputDeleteIcon className="size-6 text-gray-500" />
    </button>
  );
};

TextField.displayName = 'TextField';
