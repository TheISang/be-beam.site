import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { metaTemplates } from '@/shared/config/meta-templates';

import type { FilterOption } from '@/shared/types/components';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import Text from '@/shared/components/ui/Text';
import { TabsContent } from '@radix-ui/react-tabs';
import {
  MyApplicatedMeetingFilterSchema,
  type MyApplicatedMeetingFilters,
} from '@/features/mypage/schemas/userFilters';
import { getApplicationMeetingList } from '@/shared/api/endpoints/mypage';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import RequestedMeetingWrap from '@/routes/requestedMeeting/_components/RequestedMeetingWrap';
import type { Route } from '.react-router/types/app/routes/requestedMeeting/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.requestedMeeting();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyApplicatedMeetingFilters =
    MyApplicatedMeetingFilterSchema.parse({
      ...rawFilters,
    });

  await queryClient.prefetchQuery({
    queryKey: ['applicatedMeetings', parsedFilters],
    queryFn: () => getApplicationMeetingList(parsedFilters),
  });

  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function RequestedMeeting({ loaderData }: Route.ComponentProps) {
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyApplicatedMeetingFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyApplicatedMeetingFilterSchema,
    initialFilters,
  );

  const statusList: FilterOption[] = [
    {
      text: '신청중',
      value: 'applied',
    },
    {
      text: '승인',
      value: 'confirmed',
    },
    {
      text: '거절',
      value: 'rejected',
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className="w-full">
          <Text variant="H2_Semibold" className="mb-3">
            신청 모임
          </Text>
          <Text variant="B2_Medium" color="gray-600" className="mb-16">
            내가 신청 중인 모임을 한눈에 확인 할 수 있어요.
          </Text>
        </div>

        <Tabs
          defaultValue="applied"
          className="text-b1"
          value={filters.status}
          onValueChange={(value) =>
            setFilter({
              status: value as 'applied' | 'confirmed' | 'rejected',
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
              <RequestedMeetingWrap filters={filters} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HydrationBoundary>
  );
}
