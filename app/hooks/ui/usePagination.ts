import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

interface PaginationRange {
  start: number;
  end: number;
}

const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps) => {
  const paginationRange = useMemo<PaginationRange>(() => {
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { start: startPage, end: endPage };
  }, [currentPage, totalPages, maxVisiblePages]);

  const pages = useMemo(() => {
    return Array.from(
      { length: paginationRange.end - paginationRange.start + 1 },
      (_, i) => paginationRange.start + i,
    );
  }, [paginationRange]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    currentPage,
    totalPages,
    pages,
    isFirstPage,
    isLastPage,
    hasPreviousPage,
    hasNextPage,
  };
};

export default usePagination;
