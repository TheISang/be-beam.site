import { useInfiniteQuery } from '@tanstack/react-query';
import { getMeetingList } from '@/api/meetings';
import type { MeetingListFilters } from '@/schemas/meetingFilters';

export default function useMeetingsQuery(meetingFilters: MeetingListFilters) {
  return useInfiniteQuery({
    queryKey: ['meetings', meetingFilters],
    queryFn: ({ pageParam }) => getMeetingList(meetingFilters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
    // staleTime: 0,
    // maxPages: 나중에 위의 페이지가 사라질 것을 고려하여 사용X
  });
}
