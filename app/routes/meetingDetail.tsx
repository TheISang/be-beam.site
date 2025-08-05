import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router';
import { withOptionalAuth } from '@/lib/auth.server';
import { getMeetingDetail } from '@/api/meetings';
import { getMeetingReviews } from '@/api/meetingReviews';
import { metaTemplates } from '@/config/meta-templates';
import type { Route } from './+types/meetingDetail';
import type { meetingReviewFilterType } from '@/components/sections/MeetingDetailMeetingReviewsContainer';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import MeetingDetailWrap from '@/components/organisms/MeetingDetailWrap';

export async function meta() {
  return metaTemplates.meetingDetail();
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  return await withOptionalAuth(request, async () => {
    const cookiesHeaderFromBrowser = request.headers.get('Cookie');

    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    const filter: meetingReviewFilterType = {
      type: 'text',
      rating: 'all',
      sort: 'recent',
    };

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['meeting', Number(params.meetingId)],
        queryFn: () =>
          getMeetingDetail(Number(params.meetingId), {
            headers: axiosRequestConfigHeaders,
          }),
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: ['meetingReviews', Number(params.meetingId), filter],
        queryFn: ({ pageParam }) =>
          getMeetingReviews(Number(params.meetingId), filter, pageParam, {
            headers: axiosRequestConfigHeaders,
          }),
        initialPageParam: 0,
      }),
    ]);

    const dehydratedState = dehydrate(queryClient);
    return { dehydratedState };
  });
}

export default function MeetingDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().meetingId);

  const { data } = loaderData;
  const dehydratedState = data?.dehydratedState;

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
