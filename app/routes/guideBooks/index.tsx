import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  GuideBookListFilterSchema,
  type GuideBookListFilters,
} from '@/features/guidebooks/schemas/guideBooksFilters';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import { getGuideBookList } from '@/shared/api/endpoints/guideBooks';
import { metaTemplates } from '@/shared/config/meta-templates';

import type { FilterOption } from '@/shared/types/components';
import { Tabs } from '@/shared/components/ui/Tabs';
import GuideBooksFilterControls from '@/routes/guideBooks/_components/TargetTypeTab';
import GuideBooksContent from '@/routes/guideBooks/_components/GuideBooksContent';
import type { Route } from '.react-router/types/app/routes/guideBooks/+types';
// import SearchInput from '@/components/molecules/SearchInput';

export function meta() {
  return metaTemplates.guideBooks();
}

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: GuideBookListFilters = GuideBookListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['guideBooks', parsedFilters],
    queryFn: ({ pageParam }) => getGuideBookList(parsedFilters, pageParam),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
    filters: parsedFilters,
  };
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: GuideBookListFilters = GuideBookListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['guideBooks', parsedFilters],
    queryFn: ({ pageParam }) => getGuideBookList(parsedFilters, pageParam),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
    filters: parsedFilters,
  };
}

export default function GuideBooks({ loaderData }: Route.ComponentProps) {
  const { dehydratedState, filters: initialFilters } = loaderData;
  const { filters, setFilter } = useUrlFilters(
    GuideBookListFilterSchema,
    initialFilters,
  );

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

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <img
          src="/images/guideBook_banner.png"
          alt="가이드북 배너"
          className="mt-25 h-[490px] w-full object-cover"
        />

        <div className="mx-auto w-full max-w-[1480px] py-16">
          <Tabs
            defaultValue="all"
            className="text-b1"
            value={filters.type}
            onValueChange={(value) =>
              setFilter({
                type: value as
                  | 'all'
                  | 'communication'
                  | 'engagement'
                  | 'planning'
                  | 'operation'
                  | 'support',
              })
            }
          >
            <GuideBooksFilterControls
              list={typeList}
              initialFilters={initialFilters}
            />
            <GuideBooksContent list={typeList} filters={filters} />
          </Tabs>
        </div>

        {/* API 수정 완료시 활성화 */}
        {/* <SearchInput
              placeHolder="입력해주세요"
              inputStyle="w-full max-w-[400px] px-4 py-3 border-1 border-gray-300 rounded-full"
              onSearchChange={setFilter}
              search={filters.search}
        /> */}
      </div>
    </HydrationBoundary>
  );
}
