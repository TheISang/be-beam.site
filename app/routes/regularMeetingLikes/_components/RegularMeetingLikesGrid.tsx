import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import type { MyMeetingLikesResult } from '@/shared/api/endpoints/users';
import { useNavigate } from 'react-router';

interface RegularMeetingLikesGridProps {
  meetings: MyMeetingLikesResult['meetings'];
}

export default function RegularMeetingLikesGrid({
  meetings,
}: RegularMeetingLikesGridProps) {
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
