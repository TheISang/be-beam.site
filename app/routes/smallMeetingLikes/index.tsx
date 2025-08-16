import useMyMeetingLikesQuery from '@/features/meetings/hooks/useMyMeetingLikesQuery';
import { metaTemplates } from '@/shared/config/meta-templates';
import MeetingCard from '@/features/meetings/components/MeetingCard';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import { useNavigate } from 'react-router';

export function meta() {
  return metaTemplates.smallMeetingLikes();
}

export default function SmallMeetingLikes() {
  const navigate = useNavigate();
  const meetingLikes = useMyMeetingLikesQuery({
    page: 1,
    size: 10,
    type: 'small',
  });
  const { mutate: likeMeeting, isPending } =
    useLikeMeetingMutation('my-meeting-likes');
  return (
    <div className="mt-8 grid grid-cols-3 gap-x-5 gap-y-8">
      {meetingLikes.data?.meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          image={meeting.thumbnailImage}
          name={meeting.name}
          meetingStartTime={meeting.meetingStartTime}
          recruitmentType={meeting.recruitmentType}
          recruitmentStatus={meeting.recruitmentStatus}
          address={meeting.address}
          isLikeBtn={true}
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
