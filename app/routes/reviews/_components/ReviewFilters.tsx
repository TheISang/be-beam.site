import { ImageFilterChip } from '@/features/reviews/components/ImageFilterChip';
import ReviewSort from '@/features/reviews/components/ReviewSort';
import { RatingFilter } from '@/shared/components/common/RatingFilter';

interface ReviewFiltersProps {
  type: string;
  rating: string;
  sort: string;
  onTypeChange: (type: string) => void;
  onRatingChange: (rating: string) => void;
  onSortChange: (sort: string) => void;
}

export default function ReviewFilters({
  type,
  rating,
  sort,
  onTypeChange,
  onRatingChange,
  onSortChange,
}: ReviewFiltersProps) {
  return (
    <div className="mt-4.5 flex w-full flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-5">
        <ImageFilterChip
          isActive={type === 'image'}
          onToggle={() => onTypeChange(type === 'image' ? 'text' : 'image')}
        />
        <RatingFilter
          rating={rating === 'all' ? 0 : Number(rating)}
          onRatingChange={(rating) =>
            onRatingChange(rating === 0 ? 'all' : rating.toString())
          }
        />
      </div>
      <div>
        <ReviewSort sort={sort} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
