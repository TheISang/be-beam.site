import { getBanner, getRecommendationMeeting } from '@/api/home';

import type { Route } from './+types/home';
import HomeTemplate from '@/components/templates/HomeTemplate';
import MainVisualSlider from '@/components/organisms/MainVisualSlider';
import AboutSection from '@/components/sections/AboutSection';
import MeetingRecommendationSection from '@/components/sections/MeetingRecommendationSection';
import ValueSection from '@/components/sections/ValueSection';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { withOptionalAuth } from '@/lib/auth.server';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.home();
}

export async function loader({ request }: Route.LoaderArgs) {
  const banner = await getBanner();

  const queryClient = new QueryClient();

  await withOptionalAuth(request, async () => {
    const cookiesHeaderFromBrowser = request.headers.get('Cookie');
    const axiosRequestConfigHeaders: { Cookie?: string } = {};
    if (cookiesHeaderFromBrowser) {
      axiosRequestConfigHeaders.Cookie = cookiesHeaderFromBrowser;
    }

    await Promise.all([
      // 좋아요 기반 추천 리스트
      queryClient.prefetchQuery({
        queryKey: ['recommendationMeetings', 'likes', 'all'],
        queryFn: () =>
          getRecommendationMeeting('likes', 'all', {
            headers: axiosRequestConfigHeaders,
          }),
      }),
      // 랜덤 추천 리스트
      queryClient.prefetchQuery({
        queryKey: ['recommendationMeetings', 'random', 'all'],
        queryFn: () =>
          getRecommendationMeeting('random', 'all', {
            headers: axiosRequestConfigHeaders,
          }),
      }),
      // 최신 등록 모임 리스트
      queryClient.prefetchQuery({
        queryKey: ['recommendationMeetings', 'recent', 'all'],
        queryFn: () =>
          getRecommendationMeeting('recent', 'all', {
            headers: axiosRequestConfigHeaders,
          }),
      }),
    ]);

    return;
  });

  const dehydratedState = dehydrate(queryClient);

  return { ...banner, dehydratedState };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { banners, dehydratedState } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeTemplate>
        <MainVisualSlider banners={banners} />
        <AboutSection />
        <MeetingRecommendationSection />
        <ValueSection />
      </HomeTemplate>
    </HydrationBoundary>
  );
}
