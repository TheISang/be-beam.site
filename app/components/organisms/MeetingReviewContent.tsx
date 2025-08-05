import type { Review } from '@/types/entities';
import { cn } from '@/lib/tailwind';
import Text from '../atoms/text/Text';

export default function MeetingReviewContent({ review }: { review: Review }) {
  return (
    <div>
      <div className="flex w-full items-center">
        {Array.from({ length: review.rating }, (_, i) => (
          <img key={i} src="/images/icons/star.svg" alt="star_icons" />
        ))}
      </div>

      <div
        className={cn(
          review.images.length < 4 && review.images.length > 0 && 'flex gap-5',
          'mt-5 w-full',
        )}
      >
        <div
          className={
            review.images.length < 4 ? 'flex gap-3' : 'grid grid-cols-6 gap-3'
          }
        >
          {review.images.map((image: string, idx: number) => (
            <img
              key={idx}
              className="h-37 w-37 rounded-lg object-cover"
              src={image}
              alt="review_img"
            />
          ))}
        </div>

        <Text
          variant="B3_Regular"
          color="gray-600"
          className={cn(review.images.length > 3 && 'mt-3', 'flex-1')}
        >
          {review.text}
        </Text>
      </div>
    </div>
  );
}
