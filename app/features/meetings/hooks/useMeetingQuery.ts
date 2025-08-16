import { getMeetingDetail } from '@/shared/api/endpoints/meetings';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useMeetingQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['meeting', id],
    queryFn: () => getMeetingDetail(id),
  });
}
