import { Suspense } from 'react';
import { useParams } from 'react-router';
import { getHostDetail } from '@/api/hosts';
import { withOptionalAuth } from '@/lib/auth.server';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import { metaTemplates } from '@/config/meta-templates';

import type { Route } from './+types/hostDetail';
import CommonTemplate from '@/components/templates/CommonTemplate';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import HostDetailWrap from '@/components/organisms/HostDetailWrap';

export function meta() {
  return metaTemplates.hostDetail();
}

export async function loader({ request, params }: Route.LoaderArgs) {
  return withOptionalAuth(request, async () => {
    const queryClient = new QueryClient();
    const cookiesHeaderFromBrowser = request.headers.get('Cookie');

    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    await queryClient.prefetchQuery({
      queryKey: ['hostDetail', params.hostId],
      queryFn: () =>
        getHostDetail(Number(params.hostId), {
          headers: axiosRequestConfigHeaders,
        }),
    });

    const dehydratedState = dehydrate(queryClient);

    return {
      dehydratedState,
    };
  });
}

export default function HostDetail({ loaderData }: Route.ComponentProps) {
  const id = Number(useParams()?.hostId);

  const { data } = loaderData;
  const dehydratedState = data?.dehydratedState;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<LoadingSpinner />}>
        <CommonTemplate>
          <HostDetailWrap id={id} />
        </CommonTemplate>
      </Suspense>
    </HydrationBoundary>
  );
}
