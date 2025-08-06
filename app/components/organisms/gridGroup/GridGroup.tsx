import { columnStyles, gapStyles } from './GridGroup.styles';
import type { GridGroupProps } from '@/types/components';
import clsx from 'clsx';

export default function GridGroup({
  children,
  columns = 3,
  gap = 4,
  maxWidth = 'max-w-[1145px]',
  className = '',
}: GridGroupProps) {
  return (
    <div
      className={clsx(
        'mx-auto mt-12 grid w-full',
        maxWidth,
        columnStyles[columns],
        gapStyles[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}
