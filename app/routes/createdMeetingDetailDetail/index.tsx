import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import {
  MyCreatedMeetingDetailFilterSchema,
  type MyCreatedMeetingDetailFilters,
} from '@/features/mypage/schemas/userFilters';
import {
  getMyCreatedMeetingDetail,
  getMyCreatedMeetingSchedule,
} from '@/shared/api/endpoints/users';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import { metaTemplates } from '@/shared/config/meta-templates';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import CreatedMeetingDetailContent from '@/routes/createdMeetingDetailDetail/_components/CreatedMeetingDetailContent';
import CreatedMeetingScheduleContent from '@/routes/createdMeetingDetailDetail/_components/CreatedMeetingScheduleContent';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import type { Route } from '.react-router/types/app/routes/createdMeetingDetailDetail/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.createdMeetingDetailDetail();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  const queryClient = new QueryClient();
  const id = Number(params.meetingId);

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyCreatedMeetingDetailFilters =
    MyCreatedMeetingDetailFilterSchema.parse({
      ...rawFilters,
    });

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingDetail', id],
      queryFn: () => getMyCreatedMeetingDetail(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingSchedules', id],
      queryFn: () => getMyCreatedMeetingSchedule(id),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return { filters: parsedFilters, dehydratedState };
}

export default function CreatedMeetingDetailDetail({
  loaderData,
}: Route.ComponentProps) {
  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyCreatedMeetingDetailFilters;
    dehydratedState: DehydratedState;
  };

  const id = Number(useParams()?.meetingId);

  const { filters, setFilter } = useUrlFilters(
    MyCreatedMeetingDetailFilterSchema,
    initialFilters,
  );

  const typeList = [
    { text: '🥳모임 상세', value: 'meeting' },
    { text: '📆일정 상세', value: 'schedule' },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="w-full py-6">
          <Tabs
            defaultValue="meeting"
            className="text-b1"
            value={filters.type}
            onValueChange={(value) =>
              setFilter({ type: value as 'meeting' | 'schedule' })
            }
          >
            <TabsList className="h-auto gap-4 before:h-0">
              {typeList.map((type, idx) => (
                <TabsTrigger
                  key={idx}
                  className="h-auto cursor-pointer rounded-full bg-gray-200 px-4 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                  value={type.value}
                >
                  {type.text}
                </TabsTrigger>
              ))}
            </TabsList>

            {typeList.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="w-full">
                {tab.value === 'meeting' ? (
                  <CreatedMeetingDetailContent meetingId={id} />
                ) : (
                  <CreatedMeetingScheduleContent meetingId={id} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Suspense>
    </HydrationBoundary>
  );
}
