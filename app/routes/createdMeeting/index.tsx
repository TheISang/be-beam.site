import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import {
  MyCreatedMeetingFilterSchema,
  type MyCreatedMeetingFilters,
} from '@/features/mypage/schemas/userFilters';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import { getOpeningMeetingList } from '@/shared/api/endpoints/mypage';

import type { FilterOption } from '@/shared/types/components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import CreatedMeetingWrap from '@/routes/createMeeting/_components/CreatedMeetingWrap';
import Text from '@/shared/components/ui/Text';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { Route } from '.react-router/types/app/routes/createdMeeting/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.createdMeeting();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

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
