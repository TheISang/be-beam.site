// smart 패턴 컴포넌트. 기능 중심

import { useState } from 'react';
import useMeetingReviewsQuery from '@/features/reviews/hooks/useMeetingReviewsQuery';
import usePagination from '@/shared/hooks/usePagination';
import Text from '../../../shared/components/ui/Text';

import { ImageFilterChip } from '../../../features/reviews/components/ImageFilterChip';
import { RatingFilter } from '../../../shared/components/common/RatingFilter';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import WideReviewCard from '@/routes/reviews/_components/WideReviewCard';

export interface meetingReviewFilterType {
  type: 'text' | 'image';
  rating: 1 | 2 | 3 | 4 | 5 | 'all';
  sort: 'recent' | 'likes';
  page: number;
}

const MeetingDetailReviews = ({
  meetingId,
  ref,
}: {
  meetingId: number;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const [filter, setFilter] = useState<meetingReviewFilterType>({
    type: 'text',
    rating: 'all',
    sort: 'recent',
    page: 1,
  });

  const { data: meetingReview, isPending } = useMeetingReviewsQuery(
    meetingId,
    filter,
  );

  const changeFilter = (key: string, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const pagination = usePagination({
    currentPage: filter.page,
    totalPages: meetingReview?.pageInfo?.totalPages || 1,
  });

  console.log('filter', filter, 'meetingReviews', meetingReview);

  return (
    <div className="w-full py-10" ref={ref}>
      <Text variant="T3_Semibold" className="mb-6">
        모임 후기
        <span className="ml-1 text-gray-500">
          {meetingReview?.pageInfo.totalElements}
        </span>
      </Text>

      <div className="mb-4 flex w-full flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
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
              className="cursor-pointer rounded-md px-3 py-2 text-b1 whitespace-nowrap text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
            >
              최신순
            </RadioGroupItem>

            <RadioGroupItem
              value="likes"
              id="sort-like"
              className="cursor-pointer rounded-md px-3 py-2 text-b1 whitespace-nowrap text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
            >
              좋아요순
            </RadioGroupItem>
          </RadioGroup>
        </div>
      </div>

      <div className="box-border w-full">
        {meetingReview?.reviews.length === 0 ? (
          <div className="box-border flex h-[180px] w-full items-center justify-center rounded-lg bg-gray-200 p-3 text-b2">
            아직 등록된 후기가 없어요
          </div>
        ) : (
          <div className="mt-4.5 flex w-full flex-col gap-8">
            {isPending && (
              <LoadingSpinner loadingComment="더 많은 후기를 Loading..." />
            )}

            {meetingReview?.reviews.map((review) => (
              <WideReviewCard
                key={review.reviewId}
                review={review}
                isMeetingDetail={true}
              />
            ))}

            <Pagination className="mt-10 md:mt-20">
              <PaginationContent>
                {pagination.hasPreviousPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        changeFilter('page', String(filter.page - 1));
                      }}
                      to="#"
                    />
                  </PaginationItem>
                )}

                {pagination.pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === Number(pagination.currentPage)}
                      onClick={(e) => {
                        changeFilter('page', String(page));
                        e.preventDefault();
                      }}
                      to="#"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pagination.hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();
                        changeFilter('page', String(filter.page + 1));
                      }}
                      to="#"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetailReviews;
