import type { SearchInputProps } from '@/types/components';
import clsx from 'clsx';

export default function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div
      className={clsx(
        'flex w-[400px] items-center justify-between rounded-lg bg-[var(--color-gray-200)] px-6 py-3',
      )}
    >
      <input
        type="text"
        className="border border-none text-[var(--text-t4)] placeholder-[var(--color-gray-500)] outline-none"
        {...props}
      />
      <img
        src="/images/icons/search.svg"
        alt="search_icon"
        className="cursor-pointer"
      />
    </div>
  );
}
