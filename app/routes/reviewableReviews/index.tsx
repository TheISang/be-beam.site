import type { GetReviewableReviewsResult } from '@/shared/api/endpoints/users';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ReviewableMeetingCard from '@/routes/reviewableReviews/_components/ReviewableMeetingCard';
import useReviewableReviewsQuery from '@/features/reviews/hooks/useReviewableReviewsQuery';
import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';

export function meta() {
  return metaTemplates.reviewableReviews();
}

export default function ReviewableReviews() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReviewableReviewsContent />
    </Suspense>
  );
}

function ReviewableReviewsContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useReviewableReviewPage();

  const { data: reviewableReviews } = useReviewableReviewsQuery({
    type: 'all',
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <ReviewableMeetingGrid reviews={reviewableReviews?.reviews || []} />
      <ReviewPagination
        currentPage={currentPage}
        totalPages={reviewableReviews?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function ReviewableMeetingGrid({
  reviews,
}: {
  reviews: GetReviewableReviewsResult['reviews'];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.meetingId}>
          <ReviewableMeetingCard
            meeting={{
              id: review.meetingId,
              title: review.meetingName,
              type: review.recruitmentType,
              image: review.thumbnailImage,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function useReviewableReviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', page.toString());
        return newParams;
      });
    },
    [setSearchParams],
  );

  return {
    currentPage,
    pageSize: 9,
    maxVisiblePages: 5,
    handlePageChange,
  };
}

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange?: (page: number) => void;
}

function ReviewPagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
}: ReviewPaginationProps) {
  const createPageSearch = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2),
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = generatePageNumbers();
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-20">
      <Pagination>
        <PaginationContent>
          {hasPreviousPage && (
            <PaginationPrevious
              to={{
                search: createPageSearch(currentPage - 1),
              }}
              onClick={() => onPageChange?.(currentPage - 1)}
            />
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                to={{
                  search: createPageSearch(page),
                }}
                onClick={() => onPageChange?.(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {hasNextPage && (
            <PaginationNext
              to={{
                search: createPageSearch(currentPage + 1),
              }}
              onClick={() => onPageChange?.(currentPage + 1)}
            />
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
