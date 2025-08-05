import { useParams } from 'react-router';
import useCreatedMeetingDetailDetailParams from '@/hooks/business/useCreatedMeetingDetailDetailParams';
import { metaTemplates } from '@/config/meta-templates';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs/Tabs';
import CreatedMeetingDetailContent from '@/components/organisms/CreatedMeetingDetailContent';
import CreatedMeetingScheduleContent from '@/components/organisms/CreatedMeetingScheduleContent';
import { requireAuth } from '@/lib/auth.server';
import type { Route } from './+types/createdMeetingDetailDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import {
  getMyCreatedMeetingDetail,
  getMyCreatedMeetingSchedule,
} from '@/api/users';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

export function meta() {
  return metaTemplates.createdMeetingDetailDetail();
}

export async function loader({ request }: Route.LoaderArgs) {
  return await requireAuth(request, '/login');
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

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

  return { dehydratedState };
}

export default function CreatedMeetingDetailDetail({
  loaderData,
}: Route.ComponentProps) {
  const { dehydratedState } = loaderData as {
    dehydratedState: DehydratedState;
  };

  const id = Number(useParams()?.meetingId);
  const { params, handleUpdateType } = useCreatedMeetingDetailDetailParams();

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
            value={params.type}
            onValueChange={handleUpdateType}
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
