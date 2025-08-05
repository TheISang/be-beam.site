import { getCreatedMeetingDetail } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export default function useCreatedMeetingDetailQuery(id: number) {
  return useQuery({
    queryKey: ['createdMeetingDetail', id],
    queryFn: async () => getCreatedMeetingDetail(id),
  });
}
