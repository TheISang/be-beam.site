import {
  getSearchGuidebookResult,
  type SearchGuidebookParams,
} from '@/api/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

export const searchGuidebooksQueryOptions = (
  params: Omit<SearchGuidebookParams, 'page'>,
) =>
  infiniteQueryOptions({
    queryKey: ['search-guidebooks', params],
    queryFn: ({ pageParam }) =>
      getSearchGuidebookResult({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchGuidebooksQuery(
  params: Omit<SearchGuidebookParams, 'page'>,
) {
  return useInfiniteQuery(searchGuidebooksQueryOptions(params));
}
