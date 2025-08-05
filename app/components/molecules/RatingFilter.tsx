import { SquareChip } from '../atoms/chip/SquareChip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../atoms/dropdown-menu/DropdownMenu';
import StarIcon from '../atoms/icons/StarIcon';

interface RatingFilterProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function RatingFilter({ rating, onRatingChange }: RatingFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SquareChip variant={rating > 0 ? 'primary' : 'secondary'} asChild>
          <button className="flex cursor-pointer items-center gap-1.5">
            <StarIcon className="size-6" />
            {rating > 0 ? `${rating}점` : '별점'}
          </button>
        </SquareChip>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="sr-only">별점 선택</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => onRatingChange(0)}>
          전체
        </DropdownMenuItem>
        {Array.from({ length: 5 }, (_, i) => 5 - i).map((i) => (
          <DropdownMenuItem key={i} onSelect={() => onRatingChange(i)}>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: i }, (_, j) => j + 1).map((j) => (
                <StarIcon key={j} className="size-6 text-gray-800" />
              ))}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
