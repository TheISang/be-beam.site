import {
  getSearchHostResult,
  type SearchHostParams,
} from '@/shared/api/endpoints/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

export const searchHostsQueryOptions = (
  params: Omit<SearchHostParams, 'page'>,
) =>
  infiniteQueryOptions({
    queryKey: ['search-hosts', params],
    queryFn: ({ pageParam }) =>
      getSearchHostResult({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchHostsQuery(
  params: Omit<SearchHostParams, 'page'>,
) {
  return useInfiniteQuery(searchHostsQueryOptions(params));
}
