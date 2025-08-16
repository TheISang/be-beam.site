import { useParams } from 'react-router';
import { Suspense } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getGuideBookDetail } from '@/shared/api/endpoints/guideBooks';
import { metaTemplates } from '@/shared/config/meta-templates';

import CommonTemplate from '@/shared/components/layout/CommonTemplate';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import GuideBookDetailWrap from '@/routes/guideBookDetail/_components/GuideBookDetailWrap';
import type { Route } from '.react-router/types/app/routes/guideBookDetail/+types';

export function meta() {
  return metaTemplates.guideBookDetail();
}

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['guideBook', Number(params.guideBookId)],
    queryFn: () => getGuideBookDetail(Number(params.guideBookId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['guideBook', Number(params.guideBookId)],
    queryFn: () => getGuideBookDetail(Number(params.guideBookId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return {
    dehydratedState,
  };
}

export default function GuideBookDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams().guideBookId);
  const { dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommonTemplate>
        <Suspense fallback={<LoadingSpinner />}>
          <GuideBookDetailWrap guideBookId={id} />
        </Suspense>
      </CommonTemplate>
    </HydrationBoundary>
  );
}
