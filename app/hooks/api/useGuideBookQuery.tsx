import { useQuery } from '@tanstack/react-query';
import { getGuideBookDetail } from '@/api/guideBooks';

export default function useGuideBookQuery(id: number) {
  return useQuery({
    queryKey: ['guideBook', id],
    queryFn: () => getGuideBookDetail(id),
  });
}
