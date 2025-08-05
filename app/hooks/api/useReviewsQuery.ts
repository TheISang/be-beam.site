import type { getReviewListParams } from '@/api/reviews';
import { getReviewList } from '@/api/reviews';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useReviewsQuery(
  params: Omit<getReviewListParams, 'cursor'>,
) {
  return useInfiniteQuery({
    queryKey: ['reviews', params],
    queryFn: ({ pageParam }) => getReviewList({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
