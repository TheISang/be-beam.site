import { useSuspenseQuery } from '@tanstack/react-query';
import { getHostDetail } from '@/shared/api/endpoints/hosts';

export default function useHostQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['hostDetail', id],
    queryFn: () => getHostDetail(id),
  });
}
