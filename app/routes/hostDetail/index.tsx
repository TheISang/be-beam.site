import { Suspense } from 'react';
import { useParams } from 'react-router';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getHostDetail } from '@/shared/api/endpoints/hosts';
import { metaTemplates } from '@/shared/config/meta-templates';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import HostDetailWrap from '@/routes/hostDetail/_components/HostDetailWrap';
import type { Route } from '.react-router/types/app/routes/hostDetail/+types';

export function meta() {
  return metaTemplates.hostDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hostDetail', Number(params.hostId)],
    queryFn: () => getHostDetail(Number(params.hostId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hostDetail', Number(params.hostId)],
    queryFn: () => getHostDetail(Number(params.hostId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export default function HostDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams()?.hostId);

  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <HostDetailWrap id={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
