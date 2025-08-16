import * as React from 'react';

import { cn, focusVisibleRing } from '@/styles/tailwind';
import SearchIcon from '../icons/SearchIcon';
import XIcon from '../icons/XIcon';

interface SearchProps extends React.ComponentProps<'input'> {
  onClear?: () => void;
}

export const Search = React.forwardRef<
  React.ComponentRef<'input'>,
  SearchProps
>(({ onClear, className, defaultValue, onChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
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
    onClear?.();
    innerRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={setRefs}
        className={cn(
          focusVisibleRing(),
          'flex h-12 w-full min-w-0 rounded-lg bg-gray-200 py-[13px] pr-20.5 pl-6 text-t4 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-t4 placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        value={displayValue}
        onChange={handleInputChange}
        {...props}
      />
      {displayValue && (
        <button
          onClick={handleClear}
          className={'absolute top-1/2 right-12.5 -translate-y-1/2'}
          type="button"
          aria-label="Clear"
        >
          <XIcon className="text-gray-500" />
        </button>
      )}
      <button
        onClick={handleClear}
        className={'absolute top-1/2 right-4.5 -translate-y-1/2'}
        type="button"
        aria-label="Search"
      >
        <SearchIcon className="text-gray-500" />
      </button>
    </div>
  );
});

Search.displayName = 'Search';
