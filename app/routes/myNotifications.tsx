import { Chip } from '@/components/atoms/chip/Chip';
import CloseIcon from '@/components/atoms/icons/CloseIcon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/atoms/pagination/Pagination';
import { Tag } from '@/components/atoms/tag/Tag';
import useMyNotificationsQuery from '@/hooks/api/useMyNotificationsQuery';
import useMyNotificationsFilter from '@/hooks/business/useMyNotificationsFilter';
import usePagination from '@/hooks/ui/usePagination';
import { useSearchParams } from 'react-router';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.myNotifications();
}

const myNotificationsData: {
  value: 'all' | 'meeting' | 'review' | 'host';
  label: string;
}[] = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'meeting',
    label: '모임',
  },
  {
    value: 'review',
    label: '후기',
  },
  {
    value: 'host',
    label: '호스트',
  },
];

function formatNotificationDate(date: Date) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = days[date.getDay()];

  return `${year}.${month}.${day} (${weekday})`;
}

export default function MyNotifications() {
  const [searchParams] = useSearchParams();
  const { params, setType } = useMyNotificationsFilter();
  const myNotifications = useMyNotificationsQuery({
    type: params.type,
    page: params.page,
    size: params.size,
  });
  const pagination = usePagination({
    currentPage: params.page,
    totalPages: myNotifications.data?.pageInfo.page || 1,
  });

  const createPageSearch = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">나의 알림</h1>
        <p className="text-b2 text-gray-600">
          좋아요한 모임의 새소식을 이곳에서 확인할 수 있어요.
        </p>
      </div>
      {/* 알림 필터 */}
      <div className="mt-12 flex items-center gap-3">
        {myNotificationsData.map((data) => (
          <Chip
            key={data.value}
            onClick={() => setType(data.value)}
            variant={params.type === data.value ? 'primary' : 'secondary'}
          >
            {data.label}
          </Chip>
        ))}
      </div>
      {/* 알림 리스트 */}
      <div className="mt-8 flex flex-col gap-3">
        {myNotifications.data?.alarms.map((alarm) => (
          <div
            key={alarm.id}
            className="relative rounded-lg border border-gray-300 px-5 py-4"
          >
            <NotificationTypeTag type={alarm.type} />
            <p className="mt-2.5 text-b2 text-gray-800">{alarm.message}</p>
            <time className="mt-[9px] text-c3 text-gray-500">
              {formatNotificationDate(new Date(alarm.timestamp))}
            </time>
            <button className="absolute top-4 right-5 rounded-full bg-gray-300">
              <CloseIcon className="size-4 text-gray-800" />
            </button>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="mt-20">
        <Pagination>
          <PaginationContent>
            {pagination.hasPreviousPage && (
              <PaginationPrevious
                to={{
                  search: createPageSearch(pagination.currentPage - 1),
                }}
              />
            )}
            {pagination.pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === pagination.currentPage}
                  to={{
                    search: createPageSearch(page),
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pagination.hasNextPage && (
              <PaginationNext
                to={{
                  search: createPageSearch(pagination.currentPage + 1),
                }}
              />
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

const notificationMap = {
  MEETING: {
    text: '모임',
    variant: 'primary',
  },
  REVIEW: {
    text: '후기',
    variant: 'blue',
  },
  HOST: {
    text: '호스트',
    variant: 'green',
  },
} as const;

function NotificationTypeTag({
  type,
}: {
  type: 'MEETING' | 'REVIEW' | 'HOST';
}) {
  const text = notificationMap[type].text;
  const variant = notificationMap[type].variant;
  return <Tag variant={variant}>{text}</Tag>;
}
