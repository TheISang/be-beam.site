import { useQuery } from '@tanstack/react-query';
import { getTopics } from '@/api/topics';

export default function useTopicsQuery() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(),
  });
}
