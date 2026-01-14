import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import useUserSession from '@/features/users/hooks/useUserSession';
import type { MyMeetingLikesResult } from '@/shared/api/endpoints/users';
import { useNavigate } from 'react-router';

export default function SmallMeetingLikesGrid({
  meetings,
}: {
  meetings: MyMeetingLikesResult['meetings'];
}) {
  const { user } = useUserSession();
  const navigate = useNavigate();
  const { isPending, mutate: likeMeeting } = useLikeMeetingMutation();

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
      {meetings.map((meeting) => (
        <MeetingCardWithAddress
          key={meeting.id}
          id={meeting.id}
          thumbnailImage={meeting.thumbnailImage}
          name={meeting.name}
          meetingStartTime={meeting.meetingStartTime}
          recruitmentType={meeting.recruitmentType}
          recruitmentStatus={meeting.recruitmentStatus}
          address={meeting.address}
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
          onClick={() => {
            navigate(`/meeting/${meeting.id}`);
          }}
        />
      ))}
    </div>
  );
}
