import { useInfiniteQuery } from '@tanstack/react-query';
import type { useGuideBooksParamsType } from '../business/useGuideBooksParams';
import { getGuideBookList } from '@/api/guideBooks';

export default function useGuideBooksQuery(
  params: useGuideBooksParamsType['params'],
) {
  return useInfiniteQuery({
    queryKey: ['guideBooks', params],
    queryFn: ({ pageParam }) => getGuideBookList(params, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNext
        ? lastPage.pageInfo.nextCursor
        : undefined;
    },
  });
}
