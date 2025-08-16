import { formatToMonthAndDayDate } from '@/shared/utils/date';

import type { Meeting } from '@/shared/types/entities';
import InfoItem from '../../../shared/components/common/InfoItem';

export default function MeetingCardInfoItemWrap({
  meeting,
}: {
  meeting: Meeting;
}) {
  return (
    <div className="mt-4 box-border w-full rounded-xl bg-gray-100 px-6 py-5">
      <InfoItem
        icon="/images/icons/location.svg"
        iconAlt="location_icon"
        text={meeting?.address}
        wrapStyle="mb-3 gap-2"
      />

      <InfoItem
        icon="/images/icons/clock.svg"
        iconAlt="clock_icon"
        text={formatToMonthAndDayDate(meeting?.schedules[0]?.meetingStartTime)}
        wrapStyle="mb-3 gap-2"
      />

      <InfoItem
        icon="/images/icons/person.svg"
        iconAlt="person_icon"
        text={`${meeting?.minParticipants}명 ~ ${meeting?.maxParticipants}명`}
        wrapStyle="gap-2"
      />
    </div>
  );
}
