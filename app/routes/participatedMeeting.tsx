import { metaTemplates } from '@/config/meta-templates';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import {
  MyParticipatedMeetingFilterSchema,
  type MyParticipatedMeetingFilters,
} from '@/schemas/userFilters';
import { requireAuth } from '@/lib/auth.server';
import { useUrlFilters } from '@/hooks/ui/userUrlFilters';
import { getParticipationMeetingList } from '@/api/mypage';
import ParticipatedMeetingWrap from '@/components/organisms/ParticipatedMeetingWrap';

import type { Route } from './+types/participatedMeeting';
import type { FilterOption } from '@/types/components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import Text from '@/components/atoms/text/Text';

export function meta() {
  return metaTemplates.participatedMeeting();
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyParticipatedMeetingFilters =
    MyParticipatedMeetingFilterSchema.parse({
      ...rawFilters,
    });

  await queryClient.prefetchQuery({
    queryKey: ['participatedMeetings', parsedFilters],
    queryFn: () => getParticipationMeetingList(parsedFilters),
  });

  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function ParticipatedMeeting({
  loaderData,
}: Route.ComponentProps) {
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyParticipatedMeetingFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyParticipatedMeetingFilterSchema,
    initialFilters,
  );

  const statusList: FilterOption[] = [
    {
      text: '참여중',
      value: 'participating',
    },
    {
      text: '참여 완료',
      value: 'completed',
    },
    {
      text: '취소',
      value: 'cancelled',
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex-1">
        <div className="w-full">
          <Text variant="H2_Semibold" className="mb-3">
            참여 모임
          </Text>
          <Text variant="B2_Medium" color="gray-600" className="mb-16">
            내가 참여 중인 모임을 한눈에 확인 할 수 있어요.
          </Text>
        </div>

        <Tabs
          defaultValue="participating"
          className="text-b1"
          value={filters.status}
          onValueChange={(value) =>
            setFilter({
              status: value as 'participating' | 'completed' | 'cancelled',
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
              <ParticipatedMeetingWrap filters={filters} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HydrationBoundary>
  );
}
