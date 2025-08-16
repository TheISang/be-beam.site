import { useQuery } from '@tanstack/react-query';
import { getTopics } from '@/shared/api/endpoints/topics';

export default function useTopicsQuery() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(),
  });
}
