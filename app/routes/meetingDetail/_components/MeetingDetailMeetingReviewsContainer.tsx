// smart 패턴 컴포넌트. 기능 중심

import { useEffect, useMemo, useState } from 'react';
import useMeetingReviewsQuery from '@/features/reviews/hooks/useMeetingReviewsQuery';

import Text from '../../../shared/components/ui/Text';
import MeetingReviewCard from '../../../features/reviews/components/MeetingReviewCard';
import { Button } from '../../../shared/components/ui/Button';
import { ImageFilterChip } from '../../../features/reviews/components/ImageFilterChip';
import { RatingFilter } from '../../../shared/components/common/RatingFilter';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';

export interface meetingReviewFilterType {
  type: 'text' | 'image';
  rating: 1 | 2 | 3 | 4 | 5 | 'all';
  sort: 'recent' | 'likes';
}

const MeetingDetailMeetingReviewsContainer = ({
  meetingId,
}: {
  meetingId: number;
}) => {
  const [filter, setFilter] = useState<meetingReviewFilterType>({
    type: 'text',
    rating: 'all',
    sort: 'recent',
  });

  const {
    data: meetingReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingReviewsQuery(meetingId, filter);

  const meetingReviewList = useMemo(() => {
    return meetingReviews?.pages?.flatMap((page) => page.reviews) || [];
  }, [meetingReviews]);

  const [btnIsVisible, setBtnIsVisible] = useState(false);

  const changeFilter = (key: string, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isScrolledBeyond1200 = currentScrollY > 1200;
      const isNearBottom500 =
        currentScrollY + viewportHeight >= documentHeight - 200;

      if (isScrolledBeyond1200 && !isNearBottom500) {
        setBtnIsVisible(true);
      } else {
        setBtnIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full pt-12">
      <Text variant="T3_Semibold" className="mb-6">
        모임 후기
        <span className="ml-1 text-gray-500">{meetingReviewList.length}</span>
      </Text>

      <div className="mb-4 flex w-full items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <ImageFilterChip
            isActive={filter.type === 'image'}
            onToggle={() =>
              changeFilter('type', filter.type === 'image' ? 'text' : 'image')
            }
          />
          <RatingFilter
            rating={filter.rating === 'all' ? 0 : Number(filter.rating)}
            onRatingChange={(rating) =>
              changeFilter('rating', rating === 0 ? 'all' : String(rating))
            }
          />
        </div>
        <div>
          <RadioGroup
            defaultValue="recent"
            className="flex rounded-lg bg-gray-200 p-2"
            value={filter.sort}
            onValueChange={(value) => changeFilter('sort', value)}
          >
            <RadioGroupItem
              value="recent"
              id="sort-recent"
              className="cursor-pointer rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
            >
              최신순
            </RadioGroupItem>
            <RadioGroupItem
              value="likes"
              id="sort-like"
              className="cursor-pointer rounded-md px-3 py-2 text-b1 text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
            >
              좋아요순
            </RadioGroupItem>
          </RadioGroup>
        </div>
      </div>

      <div className="box-border w-full">
        {meetingReviewList?.map((review) => (
          <MeetingReviewCard
            key={review.reviewId}
            review={review}
            meetingReviewList={meetingReviewList}
          />
        ))}
        <Button
          variant="tertiary"
          size="sm"
          className={`${btnIsVisible && hasNextPage ? 'block' : 'hidden'} fixed bottom-5 left-[25%] z-50 w-75 border-gray-500 text-gray-600`}
          onClick={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          후기 더 보기
        </Button>
      </div>
    </div>
  );
};

export default MeetingDetailMeetingReviewsContainer;
