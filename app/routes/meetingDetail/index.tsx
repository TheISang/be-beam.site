import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router';
import { getMeetingDetail } from '@/shared/api/endpoints/meetings';
import { getMeetingReviews } from '@/shared/api/endpoints/meetingReviews';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailMeetingReviewsContainer';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import MeetingDetailWrap from '@/routes/meetingDetail/_components/MeetingDetailWrap';
import type { Route } from '.react-router/types/app/routes/meetingDetail/+types';

export function meta() {
  return metaTemplates.meetingDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const filter: meetingReviewFilterType = {
    type: 'text',
    rating: 'all',
    sort: 'recent',
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['meeting', Number(params.meetingId)],
      queryFn: () => getMeetingDetail(Number(params.meetingId)),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['meetingReviews', Number(params.meetingId), filter],
      queryFn: ({ pageParam }) =>
        getMeetingReviews(Number(params.meetingId), filter, pageParam),
      initialPageParam: 0,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  const filter: meetingReviewFilterType = {
    type: 'text',
    rating: 'all',
    sort: 'recent',
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['meeting', Number(params.meetingId)],
      queryFn: () => getMeetingDetail(Number(params.meetingId)),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['meetingReviews', Number(params.meetingId), filter],
      queryFn: ({ pageParam }) =>
        getMeetingReviews(Number(params.meetingId), filter, pageParam),
      initialPageParam: 0,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
}

export default function MeetingDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().meetingId);
  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <MeetingDetailWrap id={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
