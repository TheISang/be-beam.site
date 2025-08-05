import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { metaTemplates } from '@/config/meta-templates';

import type { FilterOption } from '@/types/components';
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs/Tabs';
import Text from '@/components/atoms/text/Text';
import { TabsContent } from '@radix-ui/react-tabs';

import type { Route } from './+types/requestedMeeting';
import { requireAuth } from '@/lib/auth.server';
import {
  MyApplicatedMeetingFilterSchema,
  type MyApplicatedMeetingFilters,
} from '@/schemas/userFilters';
import { getApplicationMeetingList } from '@/api/mypage';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import RequestedMeetingWrap from '@/components/organisms/RequestedMeetingWrap';

export function meta() {
  return metaTemplates.requestedMeeting();
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

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
