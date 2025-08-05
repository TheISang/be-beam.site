import useMeetingsQuery from '@/hooks/api/useMeetingsQuery';
import MeetingCardGroup from '../sections/MeetingCardGroup';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';
import { useMemo } from 'react';
import LoadingSpinner from '../molecules/LoadingSpinner';
import type { UserProfile } from '@/types/entities';
import type { MeetingListFilters } from '@/schemas/meetingFilters';

interface MeetingWrapProps {
  meetingFilters: MeetingListFilters;
  user: UserProfile;
}

export default function MeetingWrap({
  meetingFilters,
  user,
}: MeetingWrapProps) {
  const {
    data: clientMeetings,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMeetingsQuery(meetingFilters);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const meetings = useMemo(() => {
    return clientMeetings?.pages?.flatMap((page) => page.meetings) || [];
  }, [clientMeetings]);

  return (
    <>
      <MeetingCardGroup meetings={meetings} isLikedBtn={user ? true : false} />
      {(isLoading || isFetching || isFetchingNextPage) && <LoadingSpinner />}
    </>
  );
}
