import { useNavigate } from 'react-router';

import type { Meeting } from '@/types/entities';
import MeetingDetailContentTop from '../organisms/MeetingDetailContentTop';
import MeetingDetailContentMiddle from '../organisms/MeetingDetailContentMiddle';
import MeetingDetailContentBottom from '../organisms/MeetingDetailContentBottom';

export default function MeetingDetailContent({
  meeting,
}: {
  meeting: Meeting;
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full py-8">
      <MeetingDetailContentTop meeting={meeting} />
      <MeetingDetailContentMiddle meeting={meeting} />
      <MeetingDetailContentBottom
        hostImg={meeting?.hostImage}
        hostName={meeting?.hostName}
        hostDes={meeting?.hostDescription}
        onClick={() => navigate(`/host/${meeting?.hostId}`)}
      />
    </div>
  );
}
