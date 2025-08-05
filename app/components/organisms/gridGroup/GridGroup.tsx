import { columnStyles, gapStyles } from './GridGroup.styles';
import type { GridGroupProps } from '@/types/components';
import { cn } from '@/lib/tailwind';

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
