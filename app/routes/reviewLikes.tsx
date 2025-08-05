import type { MyReviewLikesResult } from '@/api/users';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import ReviewLikeCard from '@/components/molecules/ReviewLikeCard';
import useMyReviewLikesQuery from '@/hooks/api/useMyReviewLikesQuery';
import { metaTemplates } from '@/config/meta-templates';
import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router';

export function meta() {
  return metaTemplates.reviewLikes();
}

export default function ReviewLikes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReviewLikesContent />
    </Suspense>
  );
}

function ReviewLikesContent() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useReviewLikesPage();

  const { data: reviewLikes } = useMyReviewLikesQuery({
    page: currentPage,
    size: pageSize,
  });

  const reviews = reviewLikes?.reviews || [];
  const hasReviews = reviews.length > 0;

  return (
    <div>
      <ReviewGrid reviews={reviews} />

      {hasReviews && reviewLikes?.pageInfo && (
        <ReviewPagination
          currentPage={reviewLikes.pageInfo.page}
          totalPages={reviewLikes.pageInfo.totalPages}
          maxVisiblePages={maxVisiblePages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

function useReviewLikesPage() {
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

function ReviewGrid({ reviews }: { reviews: MyReviewLikesResult['reviews'] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewLikeCard {...review} />
        </div>
      ))}
    </div>
  );
}

function ReviewPagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange?: (page: number) => void;
}) {
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
