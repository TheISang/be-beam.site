import { useMemo } from 'react';
import useGuideBooksQuery from '@/hooks/api/useGuideBooksQuery';
import useInfiniteScroll from '@/hooks/ui/useInfiniteScroll';
import useGuideBooksParams from '@/hooks/business/useGuideBooksParams';

import type { FilterOption } from '@/types/components';
import { Tabs } from '@/components/atoms/tabs/Tabs';
import GuideBooksFilterDialog from '@/components/organisms/GuideBooksFilterDialog';
import GuideBooksFilterControls from '@/components/organisms/TargetTypeTab';
import GuideBooksContent from '@/components/sections/GuideBooksContent';
import useGuidBookFilterDialog, {
  type FilterState,
} from '@/hooks/ui/useGuideBookFilterDialog';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import { metaTemplates } from '@/config/meta-templates';

// interface GuideBookFilters {
//   type: string;
//   targetType: string;
//   level: string;
//   time: string;
// }

// function getFiltersFromUrl(request: Request): GuideBookFilters {
//   const url = new URL(request.url);
//   const searchParams = url.searchParams;

//   return {
//     type: searchParams.get('type') || 'all',
//     targetType: searchParams.get('target-type') || 'all',
//     level: searchParams.get('level') || 'all',
//     time: searchParams.get('time') || 'all',
//   };
// }

// export async function loader({ request }: Route.LoaderArgs) {
//   const filters = getFiltersFromUrl(request);
//   console.log(filters);

//   await queryClient.prefetchQuery({
//     queryKey: ['guideBooks', filters],
//     queryFn: async () => {
//       const res = await axiosInstanceV1({
//         method: 'GET',
//         url: `guidebooks?type=${filters.type}&target-type=${filters.targetType}&level=${filters.level}&time=${filters.time}&cursor=0&size=9`,
//       });
//       const data = res.data;
//       return data;
//     },
//   });

//   return {
//     dehydratedState: dehydrate(queryClient),
//   };
// }

export function meta() {
  return metaTemplates.guideBooks();
}

export default function GuideBooks() {
  const typeList: FilterOption[] = [
    {
      text: '전체',
      value: 'all',
    },
    {
      text: '소통',
      value: 'communication',
    },
    {
      text: '참여 유도',
      value: 'engagement',
    },
    {
      text: '프로그램 기획',
      value: 'planning',
    },
    {
      text: '운영',
      value: 'support',
    },
    {
      text: '운영 지원',
      value: 'operation',
    },
  ];

  const {
    params,
    handleUpdateType,
    handleUpdateTargetType,
    handleUpdateLevel,
    handleUpdateTime,
  } = useGuideBooksParams();

  const {
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    openDialog,
    closeDialog,
    updateFilter,
    resetFilter,
  } = useGuidBookFilterDialog(params);

  const handleApplyFilter = (filterState: FilterState) => {
    closeDialog();
    handleUpdateTargetType(filterState.targetType);
    handleUpdateLevel(filterState.level);
    handleUpdateTime(filterState.time);
    resetFilter();
  };

  const {
    isLoading,
    data: guideBooks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGuideBooksQuery(params);

  const allGuideBooks = useMemo(() => {
    return guideBooks?.pages?.flatMap((page) => page.guidebooks) || [];
  }, [guideBooks]);

  useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  console.log(guideBooks, allGuideBooks);

  return (
    <div>
      {/* { <HydrationBoundary state={dehydratedState}></HydrationBoundary>} */}
      <img
        src="https://placehold.co/1920x490"
        alt="가이드북 배너"
        className="mt-25 h-[490px] w-full object-cover"
      />

      <div className="mx-auto w-full max-w-[1480px] py-16">
        <Tabs
          defaultValue="all"
          className="text-b1"
          value={params.type}
          onValueChange={handleUpdateType}
        >
          <GuideBooksFilterControls openDialog={openDialog} list={typeList} />
          <GuideBooksContent list={typeList} datas={allGuideBooks} />

          {isLoading && <LoadingSpinner />}

          {isFetchingNextPage && (
            <LoadingSpinner loadingComment="더 많은 가이드북을 Loading..." />
          )}
        </Tabs>
      </div>

      <GuideBooksFilterDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        params={params}
        filter={filter}
        setFilter={setFilter}
        updateFilter={updateFilter}
        resetFilter={resetFilter}
        handleApplyFilter={handleApplyFilter}
      />
    </div>
  );
}
