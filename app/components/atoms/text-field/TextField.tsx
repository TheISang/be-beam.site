import * as React from 'react';
import XIcon from '../icons/XIcon';
import { Label } from '../label/Label';
import { FormMessage } from '../form/FormMessage';
import { Input } from '../input/Input';
import { cn } from '@/lib/tailwind';

interface TextFieldProps extends React.ComponentProps<'input'> {
  isClearable?: boolean;
  label: string;
  description?: string;
  error?: string;
}

export const TextField = React.forwardRef<
  React.ComponentRef<'input'>,
  TextFieldProps
>(
  (
    {
      isClearable = false,
      className,
      defaultValue,
      onChange,
      label,
      description,
      error,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || '',
    );
    const isControlled = props.value !== undefined;

    const displayValue = isControlled ? props.value : internalValue;
    const innerRef = React.useRef<HTMLInputElement>(null);

    const setRefs = (node: HTMLInputElement) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled) {
        onChange?.(e);
      } else {
        setInternalValue(e.target.value);
      }
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { ...innerRef.current, value: '' } as HTMLInputElement,
        currentTarget: { ...innerRef.current, value: '' } as HTMLInputElement,
        // 필요에 따라 다른 이벤트 속성을 추가할 수 있습니다.
      } as React.ChangeEvent<HTMLInputElement>;
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.(syntheticEvent);
      innerRef.current?.focus();
    };

    return (
      <div className={cn('relative flex flex-col gap-2', className)}>
        <Label>{label}</Label>
        <div className="relative">
          <Input
            ref={setRefs}
            value={displayValue}
            onChange={handleInputChange}
            aria-invalid={!!error}
            {...props}
          />
          {isClearable && displayValue && (
            <button
              onClick={handleClear}
              className={'absolute top-1/2 right-3 -translate-y-1/2'}
              type="button"
              aria-label="Clear"
            >
              <XIcon className="text-gray-500" />
            </button>
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

TextField.displayName = 'TextField';
