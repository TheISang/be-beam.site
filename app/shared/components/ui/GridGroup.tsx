import type { GridGroupProps } from '@/shared/types/components';
import { cn } from '@/styles/tailwind';

export const columnStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export const gapStyles = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
};

export default function GridGroup({
  children,
  columns = 3,
  gap = 4,
  className = '',
}: GridGroupProps) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full',
        columnStyles[columns],
        gapStyles[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}
