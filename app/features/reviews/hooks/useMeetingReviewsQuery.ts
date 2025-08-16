import { getMeetingReviews } from '@/shared/api/endpoints/meetingReviews';
import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailMeetingReviewsContainer';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useMeetingReviewsQuery(
  meetingId: number,
  meetingReviewFilters: meetingReviewFilterType,
) {
  return useInfiniteQuery({
    queryKey: ['meetingReviews', meetingId, meetingReviewFilters],
    queryFn: ({ pageParam }) =>
      getMeetingReviews(meetingId, meetingReviewFilters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
