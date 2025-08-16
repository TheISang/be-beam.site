import { SquareChip } from '@/shared/components/ui/SquareChip';
import ImageIcon from '@/shared/components/icons/ImageIcon';

interface ImageFilterChipProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

export function ImageFilterChip({ isActive, onToggle }: ImageFilterChipProps) {
  return (
    <SquareChip variant={isActive ? 'primary' : 'secondary'} asChild>
      <button
        className="flex cursor-pointer items-center gap-1.5"
        onClick={() => onToggle(!isActive)}
        aria-selected={isActive}
      >
        <ImageIcon className="size-6" />
        사진 후기만 보기
      </button>
    </SquareChip>
  );
}
