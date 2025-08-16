import { metaTemplates } from '@/shared/config/meta-templates';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { useMemo } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  MeetingListFilterSchema,
  type MeetingListFilters,
} from '@/features/meetings/schemas/meetingFilters';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import { getMeetingList } from '@/shared/api/endpoints/meetings';
import { getTopics } from '@/shared/api/endpoints/topics';

import type { Topic } from '@/shared/types/entities';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import Banner from '@/shared/components/common/Banner';
import MeetingFilterControls from '@/routes/meetings/_components/MeetingFilterControls';
import MeetingWrap from '@/routes/meetings/_components/MeetingWrap';
import { Button } from '@/shared/components/ui/Button';
import type { Route } from '.react-router/types/app/routes/meetings/+types';

export function meta() {
  return metaTemplates.meetings();
}

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MeetingListFilters = MeetingListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['meetings', parsedFilters],
    queryFn: ({ pageParam }) => getMeetingList(parsedFilters, pageParam),
    initialPageParam: 0,
  });

  const topics = await getTopics();
  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState, topics, filters: parsedFilters };
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.search);
  const rawFilters = Object.fromEntries(urlSearchParams.entries());
  const parsedFilters: MeetingListFilters = MeetingListFilterSchema.parse({
    ...rawFilters,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['meetings', parsedFilters],
    queryFn: ({ pageParam }) => getMeetingList(parsedFilters, pageParam),
    initialPageParam: 0,
  });

  const topics = await getTopics();
  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState, topics, filters: parsedFilters };
}

export default function Meetings({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;
  const { dehydratedState, topics, filters } = loaderData;
  const { filters: meetingFilters, setFilter } = useUrlFilters(
    MeetingListFilterSchema,
    filters,
  );

  const allTopics = useMemo(() => {
    const defaultAllOption = { label: '전체', value: 'all' };

    if (topics && topics.length > 0) {
      const apiTopics = topics.map((item: Topic) => ({
        label: item.topic,
        value: String(item.topic),
      }));
      return [defaultAllOption, ...apiTopics];
    }

    return [defaultAllOption];
  }, [topics]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Banner imageUrl="/images/meeting_banner.png" height="h-[260px]" />

        <MeetingFilterControls
          topics={allTopics}
          meetingFilters={meetingFilters}
          setFilter={setFilter}
        />

        <MeetingWrap meetingFilters={meetingFilters} user={user} />

        {user && (
          <Button
            className="fixed bottom-10 left-[50%] ml-[-75px] rounded-full text-t3"
            size="sm"
            onClick={() => navigate('/createMeeting')}
          >
            <img src="/images/icons/w_plus.svg" alt="plus_icon" />
            모임 만들기
          </Button>
        )}
      </CommonTemplate>
    </HydrationBoundary>
  );
}
