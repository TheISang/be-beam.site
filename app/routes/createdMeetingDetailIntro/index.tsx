import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type DehydratedState,
} from '@tanstack/react-query';
import { getTopics } from '@/shared/api/endpoints/topics';

import { metaTemplates } from '@/shared/config/meta-templates';
import { getMyCreatedMeetingIntro } from '@/shared/api/endpoints/users';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import CreatedMeetingDetailIntroWrap from '@/routes/createdMeetingDetailIntro/_components/CreatedMeetingDetailIntroWrap';
import type { Route } from '.react-router/types/app/routes/createdMeetingDetailIntro/+types';
import { requireAuthMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.createdMeetingDetailIntro();
}

export const unstable_middleware = [requireAuthMiddleware('일반 참가자')];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const id = Number(params.meetingId);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['createdMeetingIntro', id],
      queryFn: () => getMyCreatedMeetingIntro(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['topics'],
      queryFn: () => getTopics(),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default function CreatedMeetingDetailIntro({
  loaderData,
}: Route.ComponentProps) {
  const { dehydratedState } = loaderData as {
    dehydratedState: DehydratedState;
  };

  const id = Number(useParams().meetingId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <CreatedMeetingDetailIntroWrap meetingId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
