import type { GetWrittenReviewsResult } from '@/shared/api/endpoints/users';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import WrittenReviewCard from '@/routes/writtenReviews/_components/WrittenReviewCard';
import useWrittenReviewsQuery from '@/features/reviews/hooks/useWrittenReviewsQuery';
import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';

export function meta() {
  return metaTemplates.writtenReviews();
}

export default function WrittenReviews() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WrittenReviewContent />
    </Suspense>
  );
}

function WrittenReviewContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useWrittenReviewPage();

  const { data: writtenReviews } = useWrittenReviewsQuery({
    type: 'all',
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="mt-8 flex flex-col gap-20">
      <WrittenReviewGrid reviews={writtenReviews?.reviews || []} />
      <ReviewPagination
        currentPage={currentPage}
        totalPages={writtenReviews?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function WrittenReviewGrid({
  reviews,
}: {
  reviews: GetWrittenReviewsResult['reviews'];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <WrittenReviewCard
            review={{
              id: review.reviewId,
              content: review.content,
              rating: review.rating,
              images: review.images,
              meeting: {
                name: review.meetingName,
                id: review.meetingId,
                recruitmentType: review.recruitmentType,
                image: review.thumbnailImage,
              },
              createdAt: review.createdAt,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function useWrittenReviewPage() {
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
