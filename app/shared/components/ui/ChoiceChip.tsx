'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn, focusVisibleRing } from '@/styles/tailwind';

type ChoiceChipSingleProps = ToggleGroupPrimitive.ToggleGroupSingleProps & {
  alwaysSelected?: boolean;
};

type ChoiceChipMultipleProps = ToggleGroupPrimitive.ToggleGroupMultipleProps & {
  alwaysSelected?: boolean;
};

type ChoiceChipProps = ChoiceChipSingleProps | ChoiceChipMultipleProps;

function ChoiceChipSingle({
  className,
  children,
  type,
  alwaysSelected = false,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: ChoiceChipSingleProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    controlledValue ?? defaultValue ?? '',
  );
  const handleChange = (newValue: string) => {
    if (alwaysSelected) {
      if (!newValue) return;
    }
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };
  return (
    <ToggleGroupPrimitive.Root
      className={cn('flex w-fit items-center gap-3', className)}
      type={type}
      value={internalValue}
      onValueChange={handleChange}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function ChoiceChipMultiple({
  className,
  children,
  type,
  alwaysSelected = false,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: ChoiceChipMultipleProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    controlledValue ?? defaultValue ?? [],
  );
  const handleChange = (newValue: string[]) => {
    if (alwaysSelected) {
      if (!newValue.length) return;
    }
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };
  return (
    <ToggleGroupPrimitive.Root
      className={cn('flex w-fit items-center gap-3', className)}
      type={type}
      value={internalValue}
      onValueChange={handleChange}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function ChoiceChip(props: ChoiceChipProps) {
  if (props.type === 'single') {
    return <ChoiceChipSingle {...props} />;
  }

  if (props.type === 'multiple') {
    return <ChoiceChipMultiple {...props} />;
  }

  throw new Error('Invalid ChoiceChip type');
}

function ChoiceChipItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        focusVisibleRing(),
        'inline-flex h-9 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl border-none py-3 pr-4 pl-4 text-b1 whitespace-nowrap duration-200 data-[state=off]:bg-gray-200 data-[state=off]:text-black data-[state=on]:bg-gray-900 data-[state=on]:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ChoiceChip, ChoiceChipItem };
