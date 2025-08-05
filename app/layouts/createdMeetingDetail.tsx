import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import {
  getMyCreatedMeetingDetail,
  getMyCreatedMeetingIntro,
} from '@/api/users';

import type { Route } from './+types/createdMeetingDetail';
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs/Tabs';
import CommonTemplate from '@/components/templates/CommonTemplate';
import Text from '@/components/atoms/text/Text';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingIntro', id],
      queryFn: () => getMyCreatedMeetingIntro(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingIDetail', id],
      queryFn: () => getMyCreatedMeetingDetail(id),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default function CreatedMeetingDetail({
  loaderData,
}: Route.ComponentProps) {
  const { dehydratedState } = loaderData;

  const navigate = useNavigate();
  const location = useLocation();
  const id = Number(useParams().meetingId);
  const pathSegments = location.pathname.split('/')[4];

  const [tab, setTab] = useState('intro');

  useEffect(() => {
    if (pathSegments) {
      setTab(pathSegments);
    }
  }, [pathSegments]);

  const tabList = [
    { label: '모임 소개', value: 'intro' },
    { label: '모임 상세', value: 'detail' },
    { label: '모임 관리', value: 'manage' },
  ];

  const queryResult = useSuspenseQueries({
    queries: [
      {
        queryKey: ['createdMeetingIntro', id],
        queryFn: () => getMyCreatedMeetingIntro(id),
      },
      {
        queryKey: ['createdMeetingDetail', id],
        queryFn: () => getMyCreatedMeetingDetail(id),
      },
    ],
  });
  const [{ data: intro }, { data: detail }] = queryResult;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <CommonTemplate>
          <div className="w-full">
            <Text variant="B2_Medium" color="primary" className="mb-1">
              {detail?.recruitmentType}
            </Text>
            <Text variant="H1_Bold" className="mb-5">
              {intro?.name}
            </Text>

            <img
              className="h-[480px] w-full rounded-md object-cover"
              src={intro?.meetingThumbnail}
              alt="meeting_thumbnail"
            />
          </div>

          <div className="mt-7 w-full py-5">
            <Tabs
              value={tab}
              onValueChange={(value) => {
                navigate(`/myPage/created/${id}/${value}`);
                setTab(value);
              }}
            >
              <div className="relative w-full text-t2">
                <TabsList className="gap-8">
                  {tabList.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-primary after:transition-all after:duration-300 after:content-[''] data-[state=active]:text-primary data-[state=active]:after:scale-x-100 data-[state=active]:after:bg-primary"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gray-300" />
              </div>
            </Tabs>

            <Outlet />
          </div>
        </CommonTemplate>
      </Suspense>
    </HydrationBoundary>
  );
}
