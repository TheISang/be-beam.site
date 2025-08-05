import { getNotifications } from '@/api/notifications';
import { queryOptions, useQuery } from '@tanstack/react-query';

const myNotificationsQueryOptions = ({
  type,
  page,
  size,
}: {
  type: 'all' | 'meeting' | 'review' | 'host';
  page: number;
  size: number;
}) =>
  queryOptions({
    queryKey: ['my-notifications', type, page, size],
    queryFn: () => getNotifications({ type, page, size }),
  });

export default function useMyNotificationsQuery({
  type = 'all',
  page = 1,
  size = 10,
}: {
  type?: 'all' | 'meeting' | 'review' | 'host';
  page?: number;
  size?: number;
} = {}) {
  return useQuery(myNotificationsQueryOptions({ type, page, size }));
}
