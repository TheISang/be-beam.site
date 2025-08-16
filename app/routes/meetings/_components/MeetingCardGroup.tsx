import { useNavigate } from 'react-router';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';

import type { MeetingSummary } from '@/shared/types/entities';
import MeetingCard from '../../../features/meetings/components/MeetingCard';
import GridGroup from '../../../shared/components/ui/GridGroup';

export interface MeetingListSectionProps {
  meetings: MeetingSummary[];
  isLikedBtn: boolean;
}

export default function MeetingCardGroup({
  meetings,
  isLikedBtn,
}: MeetingListSectionProps) {
  const navigate = useNavigate();

  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation('meetings');

  return (
    <GridGroup columns={4} gap={5} className="mt-8">
      {meetings?.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          recruitmentType={meeting.recruitmentType}
          recruitmentStatus={meeting.recruitmentStatus}
          name={meeting.name}
          image={meeting.image}
          address={meeting.address}
          meetingStartTime={meeting.meetingStartTime}
          liked={meeting.liked}
          isLikeBtn={isLikedBtn}
          onClick={() => navigate(`/meeting/${meeting.id}`)}
          onLikeClick={() => {
            if (isPending) return;
            if (meeting) {
              likeMeeting(meeting as { id: number; liked: boolean });
            }
          }}
          classNames="mb-12"
        />
      ))}
    </GridGroup>
  );
}
