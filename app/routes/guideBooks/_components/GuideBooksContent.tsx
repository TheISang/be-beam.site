import { useMemo } from 'react';
import useGuideBooksQuery from '@/features/guidebooks/hooks/useGuideBooksQuery';
import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import type { FilterOption } from '@/shared/types/components';
import { TabsContent } from '../../../shared/components/ui/Tabs';
import GridGroup from '../../../shared/components/ui/GridGroup';
import GuideBookCard from '../../../features/guidebooks/components/GuideBookCard';
import LoadingSpinner from '../../../shared/components/ui/LoadingSpinner';

export default function GuideBooksContent({
  list,
  filters,
}: {
  list: FilterOption[];
  filters: GuideBookListFilters;
}) {
  const {
    isLoading,
    data: guideBooks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGuideBooksQuery(filters);

  const allGuideBooks = useMemo(() => {
    return guideBooks?.pages?.flatMap((page) => page.guidebooks) || [];
  }, [guideBooks]);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      {list.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-10 w-full">
          <GridGroup columns={3} gap={8}>
            {allGuideBooks?.map((data) => (
              <GuideBookCard key={data.id} data={data} />
            ))}
          </GridGroup>

          {(isLoading || isFetchingNextPage) && <LoadingSpinner />}
        </TabsContent>
      ))}
    </>
  );
}
