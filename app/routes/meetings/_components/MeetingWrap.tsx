import useMeetingsQuery from '@/features/meetings/hooks/useMeetingsQuery';
import MeetingCardGroup from './MeetingCardGroup';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { useMemo } from 'react';
import LoadingSpinner from '../../../shared/components/ui/LoadingSpinner';
import type { UserProfile } from '@/shared/types/entities';
import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';

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
