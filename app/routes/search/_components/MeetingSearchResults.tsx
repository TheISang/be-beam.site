import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import useSearchMeetingsQuery from '@/features/search/hooks/useSearchMeetingsQuery';
import useUserSession from '@/features/users/hooks/useUserSession';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';

export default function MeetingSearchResults({ query }: { query: string }) {
  const navigate = useNavigate();
  const { user } = useUserSession();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMeetingsQuery({ search: query, size: 20 });
  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation();

  const allMeetings = data?.pages.flatMap((page) => page.meetings) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">모임</h2>
          <span className="text-b2">
            {data?.pages[0].pageInfo.totalElements}건
          </span>
        </div>
      </div>
      {allMeetings.length ? (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-5 lg:grid-cols-4">
          {allMeetings?.map((meeting) => (
            <MeetingCardWithAddress
              key={meeting.id}
              id={meeting.id}
              thumbnailImage={meeting.image}
              recruitmentType={meeting.recruitmentType}
              recruitmentStatus={meeting.recruitmentStatus}
              name={meeting.name}
              meetingStartTime={meeting.meetingStartTime}
              address={meeting.address}
              onClick={() => {
                navigate(`/meeting/${meeting.id}`);
              }}
              liked={meeting.liked}
              onLikeClick={() => {
                if (!user) return alert('로그인 후 이용해주세요.');
                if (isPending) return;
                if (meeting) {
                  likeMeeting({
                    id: meeting.id,
                    liked: meeting.liked,
                  });
                }
              }}
            />
          ))}
          {allMeetings?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 모임을 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">모임이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
