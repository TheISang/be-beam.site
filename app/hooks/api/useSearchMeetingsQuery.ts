import {
  getSearchMeetingResult,
  type SearchMeetingParams,
} from '@/api/searches';
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

export const searchMeetingsQueryOptions = (
  params: Omit<SearchMeetingParams, 'page'>,
) =>
  infiniteQueryOptions({
    queryKey: ['search-Meetings', params],
    queryFn: ({ pageParam }) =>
      getSearchMeetingResult({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext ? lastPage.pageInfo.page + 1 : undefined;
    },
  });

export default function useSearchMeetingsQuery(
  params: Omit<SearchMeetingParams, 'page'>,
) {
  return useInfiniteQuery(searchMeetingsQueryOptions(params));
}
