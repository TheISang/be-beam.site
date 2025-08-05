import { useNavigate } from 'react-router';
import { extractTime, formatToMonthAndDayDate } from '@/utils/date';

import { cn } from '@/lib/tailwind';
import type { Meeting } from '@/types/entities';
import Text from '../atoms/text/Text';
import TitleAndDes from '../molecules/TitleAndDes';
import InfoItem from '../molecules/InfoItem';
import MeetingDetailContentSmallTitleAndDes from '../molecules/MeetingDetailContentSmallTitleAndDes';
import GuideBookRecommendationCard from '../molecules/GuideBookRecommendationCard';

export default function MeetingDetailContentMiddle({
  meeting,
}: {
  meeting: Meeting;
}) {
  const navigate = useNavigate();

  const isSeveralEpi = meeting?.schedules?.length > 1;

  return (
    <div className="w-full pt-12">
      <TitleAndDes title="모임 소개" wrapStyle="mb-14">
        <Text variant="B2_Medium" className="mt-3">
          {meeting?.introduction}
        </Text>
      </TitleAndDes>

      <TitleAndDes title="모임 일정" wrapStyle="mb-14">
        {meeting?.schedules?.map((schedule, idx) => (
          <div
            key={idx}
            className={cn(
              isSeveralEpi && idx !== meeting?.schedules?.length - 1 && 'mb-6',
            )}
          >
            <Text
              variant="B2_Medium"
              color="gray-600"
              className={cn(!isSeveralEpi ? 'hidden' : 'block', 'mt-4')}
            >
              {idx + 1}회차 모임
            </Text>

            <InfoItem
              icon="/images/icons/b_location.svg"
              iconAlt="location_icon"
              text={`${schedule?.address} ${schedule?.addressDetail}`}
              textStyle="text-b2 text-black"
              wrapStyle="gap-2 mt-3"
            />

            <InfoItem
              icon="/images/icons/b_clock.svg"
              iconAlt="clock_icon"
              text={`${formatToMonthAndDayDate(schedule?.meetingStartTime)} ${extractTime(schedule?.meetingStartTime)} ~ ${extractTime(schedule?.meetingEndTime)}`}
              textStyle="text-b2 text-black"
              wrapStyle="gap-2 mt-2"
            />
          </div>
        ))}
      </TitleAndDes>

      <TitleAndDes title="모임 상세" wrapStyle="mb-14">
        <div className="mb-6">
          <Text variant="B2_Medium" color="gray-600" className="mb-2">
            모집 방식
          </Text>

          <Text variant="B2_Medium">{meeting?.meetingMode}</Text>
        </div>

        <MeetingDetailContentSmallTitleAndDes
          title="모집 인원"
          text={`${meeting?.minParticipants}명 ~ ${meeting?.maxParticipants}명`}
        />
        <MeetingDetailContentSmallTitleAndDes
          title="모집 기간"
          text={`${meeting?.recruitingStartTime?.slice(0, 10)} ~ ${meeting?.recruitingEndTime?.slice(0, 10)}`}
        />
        <MeetingDetailContentSmallTitleAndDes
          title="공지 사항"
          text={meeting?.info}
        />
      </TitleAndDes>

      {meeting?.guidebook && (
        <TitleAndDes title="참고한 가이드북" wrapStyle="mb-14">
          <GuideBookRecommendationCard
            data={meeting?.guidebook}
            onClick={() => navigate(`/guideBook/${meeting?.guidebook.id}`)}
          />
        </TitleAndDes>
      )}
    </div>
  );
}
