import { useNavigate } from 'react-router';

import type { Meeting } from '@/shared/types/entities';
import MeetingDetailContentTop from './MeetingDetailContentTop';
import MeetingDetailContentMiddle from './MeetingDetailContentMiddle';
import MeetingDetailContentBottom from './MeetingDetailContentBottom';

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
