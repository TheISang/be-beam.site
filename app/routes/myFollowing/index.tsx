import HeartFillIcon from '@/shared/components/icons/HeartFillIcon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import useMyHostLikesQuery from '@/features/users/hooks/useMyHostLikesQuery';
import type { Host } from '@/shared/types/entities';
import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';

export function meta() {
  return metaTemplates.myFollowing();
}

export default function MyFollowingPage() {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">팔로잉 리스트</h1>
        <p className="text-b2 text-gray-600">
          내가 팔로잉하는 호스트를 모아보세요.
        </p>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <MyFollowing />
      </Suspense>
    </div>
  );
}

function MyFollowing() {
  const { currentPage, pageSize, maxVisiblePages, handlePageChange } =
    useFollowingPage();
  const hostLikes = useMyHostLikesQuery({
    page: currentPage,
    size: pageSize,
  });

  return (
    <>
      <FollowingGrid hosts={hostLikes.data?.hosts || []} />
      <FollowingPagination
        currentPage={currentPage}
        totalPages={hostLikes.data?.pageInfo.totalPages || 1}
        maxVisiblePages={maxVisiblePages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function useFollowingPage() {
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

function FollowingGrid({
  hosts,
}: {
  hosts: {
    id: Host['id'];
    nickname: Host['hostName'];
    profileImage: Host['hostImage'];
    introduction: Host['hostInstruction'];
    liked: Host['followed'];
  }[];
}) {
  return (
    <div className="mt-8 grid flex-1 grid-cols-3 gap-x-5 gap-y-8">
      {hosts.map((host) => (
        <FollowingCard key={host.id} host={host} />
      ))}
    </div>
  );
}

function FollowingCard({
  host,
}: {
  host: {
    id: Host['id'];
    nickname: Host['hostName'];
    profileImage: Host['hostImage'];
    introduction: Host['hostInstruction'];
    liked: Host['followed'];
  };
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <img
          src={host.profileImage}
          alt={host.nickname}
          className="aspect-[17/10] w-full rounded-3xl object-cover"
        />
        <button className="absolute top-5 right-5">
          <HeartFillIcon className="size-8 text-error" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <p className="line-clamp-1 text-t2">{host.nickname}</p>
        <p className="line-clamp-1 text-b3 text-gray-600">
          {host.introduction}
        </p>
      </div>
    </div>
  );
}

interface FollowingPaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange?: (page: number) => void;
}

export function FollowingPagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
}: FollowingPaginationProps) {
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
