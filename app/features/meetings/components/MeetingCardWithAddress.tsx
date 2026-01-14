import { formatToMonthAndDayDate } from '@/shared/utils/date';

import { cn } from '@/styles/tailwind';
import type {
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/shared/types/entities';
import Text from '../../../shared/components/ui/Text';
import { Tag } from '../../../shared/components/ui/Tag';
import HeartFillIcon from '@/shared/components/icons/HeartFillIcon';
import HeartIcon from '@/shared/components/icons/HeartIcon';

export interface MeetingCardWithAddressProp {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  meetingStartTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  address: Meeting['address'];
  liked?: Meeting['liked'];
  onClick: () => void;
  classNames?: string;
  onLikeClick?: () => void;
  children?: React.ReactNode;
  userStatus?: string;
}

export default function MeetingCardWithAddress({
  address,
  thumbnailImage,
  recruitmentType,
  recruitmentStatus,
  userStatus,
  name,
  meetingStartTime,
  onClick,
  classNames,
  onLikeClick,
  liked,
  children,
}: MeetingCardWithAddressProp) {
  return (
    <div className={cn('relative w-full cursor-pointer', classNames)}>
      <img
        className="aspect-[358/226] w-full rounded-2xl object-cover"
        src={thumbnailImage}
        alt="meeting_thumbnail"
      />

      <Tag
        variant={
          recruitmentStatus === '모집예정' ||
          userStatus === '참여중' ||
          userStatus === '신청중'
            ? 'primary'
            : recruitmentStatus === '모집중' ||
                userStatus === '참여완료' ||
                userStatus === '확정'
              ? 'blue'
              : recruitmentStatus === '모집마감' ||
                  userStatus === '중도이탈신청중' ||
                  userStatus === '신청취소중'
                ? 'tertiary'
                : recruitmentStatus === '모임중' ||
                    userStatus === '거절' ||
                    userStatus === '중도이탈완료' ||
                    userStatus === '신청취소완료'
                  ? 'pink'
                  : 'brown'
        }
        className="absolute top-5 left-5"
      >
        {recruitmentStatus ?? userStatus}
      </Tag>

      <div
        className={cn(
          liked === undefined ? 'hidden' : 'flex',
          'absolute top-5 right-5 h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)]',
        )}
      >
        <div onClick={onLikeClick}>
          {liked ? (
            <HeartFillIcon className="text-primary" />
          ) : (
            <HeartIcon className="text-white" />
          )}
        </div>
      </div>

      <div className="relative w-full py-3">
        <Text variant="B2_Medium" color="primary" className="mb-1">
          {recruitmentType}
        </Text>
        <Text variant="T2_Semibold" onClick={onClick} className="line-clamp-1">
          {name}
        </Text>

        <div className="mt-3 flex items-center gap-2">
          <img src="/images/icons/location.svg" alt="location_icon" />
          <Text variant="B3_Regular" color="gray-600" className="line-clamp-1">
            {address}
          </Text>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <img src="/images/icons/clock.svg" alt="clock_icon" />
          <Text variant="B3_Regular" color="gray-600">
            {`모임 시작일 ${formatToMonthAndDayDate(meetingStartTime)}`}
          </Text>
        </div>

        {children}
      </div>
    </div>
  );
}
