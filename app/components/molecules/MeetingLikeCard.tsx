import type { ImageType, Meeting, MeetingSchedule } from '@/types/entities';
import ClockIcon from '../atoms/icons/ClockIcon';
import HeartFillIcon from '../atoms/icons/HeartFillIcon';
import LocationIcon from '../atoms/icons/LocationIcon';
import ThreeDotHorizontalIcon from '../atoms/icons/ThreeDotHorizontalIcon';
import { Tag } from '../atoms/tag/Tag';

interface MeetingLikeCardProps {
  meeting: {
    name: Meeting['name'];
    thumbnailImage: ImageType;
    address: Meeting['address'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    status: Meeting['recruitmentStatus'];
    type: Meeting['recruitmentType'];
  };
}

/**
 * 모임 좋아요 카드 컴포넌트
 * @param meeting - 표시할 모임 정보
 */
export default function MeetingLikeCard({ meeting }: MeetingLikeCardProps) {
  const formatMeetingDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case '모집중':
        return 'blue';
      case '모집종료':
        return 'tertiary';
      default:
        return 'primary';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 카드 상단 이미지 영역 */}
      <div className="relative">
        <img
          src={meeting.thumbnailImage}
          alt={meeting.name}
          className="h-[226px] w-full rounded-3xl object-cover"
        />
        <Tag
          className="absolute top-5 left-4.5"
          variant={getStatusVariant(meeting.status)}
        >
          {meeting.status}
        </Tag>
        <button className="absolute top-5 right-5">
          <HeartFillIcon className="size-8 text-error" />
        </button>
      </div>

      {/* 카드 하단 정보 영역 */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-b2 text-primary">{meeting.type}</span>
            <p className="mt-1 text-t2">{meeting.name}</p>
          </div>
          <button>
            <ThreeDotHorizontalIcon className="size-6" />
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <LocationIcon className="size-6 text-gray-500" />
            <p className="text-b3 text-gray-600">{meeting.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-6 text-gray-500" />
            <p className="text-b3 text-gray-600">
              첫 모임&nbsp;{formatMeetingDate(meeting.meetingStartTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
