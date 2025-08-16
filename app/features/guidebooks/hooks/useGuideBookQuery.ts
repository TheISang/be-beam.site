import { useSuspenseQuery } from '@tanstack/react-query';
import { getGuideBookDetail } from '@/shared/api/endpoints/guideBooks';

export default function useGuideBookQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['guideBook', id],
    queryFn: () => getGuideBookDetail(id),
  });
}
