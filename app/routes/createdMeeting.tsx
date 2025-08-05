import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import {
  MyCreatedMeetingFilterSchema,
  type MyCreatedMeetingFilters,
} from '@/schemas/userFilters';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import { requireAuth } from '@/lib/auth.server';
import { getOpeningMeetingList } from '@/api/mypage';

import type { Route } from './+types/createdMeeting';
import type { FilterOption } from '@/types/components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import CreatedMeetingWrap from '@/components/organisms/CreatedMeetingWrap';
import Text from '@/components/atoms/text/Text';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.createdMeeting();
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyCreatedMeetingFilters =
    MyCreatedMeetingFilterSchema.parse({
      ...rawFilters,
    });

  await queryClient.prefetchQuery({
    queryKey: ['createdMeetings', parsedFilters],
    queryFn: () => getOpeningMeetingList(parsedFilters),
  });

  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function CreatedMeeting({ loaderData }: Route.ComponentProps) {
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyCreatedMeetingFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyCreatedMeetingFilterSchema,
    initialFilters,
  );

  const statusList: FilterOption[] = [
    {
      text: '정기모임',
      value: 'regular',
    },
    {
      text: '소모임',
      value: 'small',
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className="w-full">
          <Text variant="H2_Semibold" className="mb-3">
            내가 개설한 모임
          </Text>
          <Text variant="B2_Medium" color="gray-600" className="mb-16">
            내가 개설한 모임을 한눈에 확인 할 수 있어요.
          </Text>
        </div>

        <Tabs
          defaultValue="regular"
          className="text-b1"
          value={filters.type}
          onValueChange={(value) =>
            setFilter({
              type: value as 'regular' | 'small',
              page: 1,
            })
          }
        >
          <TabsList className="h-auto gap-4 before:h-0">
            {statusList.map((type, idx) => (
              <TabsTrigger
                key={idx}
                className="h-auto cursor-pointer rounded-full bg-gray-200 px-4 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value={type.value}
              >
                {type.text}
              </TabsTrigger>
            ))}
          </TabsList>

          {statusList.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-10 w-full"
            >
              <CreatedMeetingWrap filters={filters} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HydrationBoundary>
  );
}
