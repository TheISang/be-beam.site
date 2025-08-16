import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import {
  MyCreatedMeetingManageFilterSchema,
  type MyCreatedMeetingManageFilters,
} from '@/features/mypage/schemas/userFilters';
import {
  getMyCreatedMeetingApplicants,
  getMyCreatedMeetingAttendance,
  getMyCreatedMeetingParticipants,
} from '@/shared/api/endpoints/users';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import CreatedMeetingApplicantsManageContent from '@/routes/createdMeetingDetailManage/_components/CreatedMeetingApplicantsManageContent';
import CreatedMeetingParticipantsManageContent from '@/routes/createdMeetingDetailManage/_components/CreatedMeetingParticipantsManageContent';
import CreatedMeetingAttendanceManageContent from '@/routes/createdMeetingDetailManage/_components/CreatedMeetingAttendanceManageContent';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { Route } from '.react-router/types/app/routes/createdMeetingDetailManage/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.createdMeetingDetailManage();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

export async function clientLoader({ request, params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  const id = Number(params.meetingId);

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MyCreatedMeetingManageFilters =
    MyCreatedMeetingManageFilterSchema.parse({
      ...rawFilters,
    });

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['applicants', id],
      queryFn: () => getMyCreatedMeetingApplicants(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['participants', id],
      queryFn: () => getMyCreatedMeetingParticipants(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['attendance', id],
      queryFn: () => getMyCreatedMeetingAttendance(id),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return { filters: parsedFilters, dehydratedState };
}

export default function CreatedMeetingDetailManage({
  loaderData,
}: Route.ComponentProps) {
  const id = Number(useParams()?.meetingId);

  const { filters: initialFilters, dehydratedState } = loaderData as {
    filters: MyCreatedMeetingManageFilters;
    dehydratedState: DehydratedState;
  };

  const { filters, setFilter } = useUrlFilters(
    MyCreatedMeetingManageFilterSchema,
    initialFilters,
  );

  const typeList = [
    { text: '🤗모임 신청자', value: 'applicants' },
    { text: '🥳모임 참가자', value: 'participants' },
    { text: '✅출석체크 관리', value: 'attendance' },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full py-6">
        <Tabs
          defaultValue="meeting"
          className="text-b1"
          value={filters.type}
          onValueChange={(value) =>
            setFilter({
              type: value as 'applicants' | 'participants' | 'attendance',
            })
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

          {typeList?.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="w-full">
              {tab.value === 'applicants' ? (
                <CreatedMeetingApplicantsManageContent meetingId={id} />
              ) : tab.value === 'participants' ? (
                <CreatedMeetingParticipantsManageContent meetingId={id} />
              ) : (
                <CreatedMeetingAttendanceManageContent meetingId={id} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HydrationBoundary>
  );
}
