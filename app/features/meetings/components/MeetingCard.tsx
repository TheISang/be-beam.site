import { formatToMonthAndDayDate } from '@/shared/utils/date';
import { formatNumberWithComma } from '@/shared/utils/cash';

import { cn } from '@/styles/tailwind';
import type { MeetingSummary } from '@/shared/types/entities';
import Text from '../../../shared/components/ui/Text';
import { Tag } from '../../../shared/components/ui/Tag';
import HeartFillIcon from '@/shared/components/icons/HeartFillIcon';
import HeartIcon from '@/shared/components/icons/HeartIcon';

export interface MeetingCardProp extends MeetingSummary {
  onClick: () => void;
  classNames?: string;
  isLikeBtn?: boolean;
  onLikeClick?: () => void;
  children?: React.ReactNode;
  userStatus?: string;
}

export default function MeetingCard({
  image,
  recruitmentType,
  recruitmentStatus,
  userStatus,
  name,
  meetingStartTime,
  meetingEndTime,
  paymentAmount,
  onClick,
  classNames,
  isLikeBtn = false,
  onLikeClick,
  liked,
  children,
}: MeetingCardProp) {
  return (
    <div className={cn('relative w-full cursor-pointer', classNames)}>
      <img
        className="aspect-[358/226] w-full rounded-2xl object-cover shadow-[0_6px_8px_1px_rgba(0,0,0,0.1)]"
        src={image}
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
              : recruitmentStatus === '모집종료' ||
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
          isLikeBtn ? 'flex' : 'hidden',
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
        <Text
          variant="B3_Regular"
          color="gray-600"
          className="mt-1 line-clamp-1"
        >
          {`${formatToMonthAndDayDate(meetingStartTime)} ~ ${formatToMonthAndDayDate(meetingEndTime)}`}
        </Text>

        {(paymentAmount || paymentAmount === 0) && (
          <Text
            variant="T2_Semibold"
            color="dark-primary"
            className="mt-3 line-clamp-1"
          >
            {paymentAmount === 0
              ? '무료'
              : `${formatNumberWithComma(paymentAmount)}원`}
          </Text>
        )}

        {children}
      </div>
    </div>
  );
}
