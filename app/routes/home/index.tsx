import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  getBanner,
  getRecommendationMeeting,
} from '@/shared/api/endpoints/home';
import { metaTemplates } from '@/shared/config/meta-templates';

import HomeTemplate from '@/routes/home/_components/HomeTemplate';
import MainVisualSlider from '@/routes/home/_components/MainVisualSlider';
import AboutSection from '@/routes/home/_components/AboutSection';
import MeetingRecommendationSection from '@/routes/home/_components/MeetingRecommendationSection';
import ValueSection from '@/routes/home/_components/ValueSection';
import type { Route } from '.react-router/types/app/routes/home/+types';

export function meta() {
  return metaTemplates.home();
}

export async function loader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'likes', 'all'],
      queryFn: () => getRecommendationMeeting('likes', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'random', 'all'],
      queryFn: () => getRecommendationMeeting('random', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'recent', 'all'],
      queryFn: () => getRecommendationMeeting('recent', 'all'),
    }),
  ]);

  const banner = await getBanner();
  const dehydratedState = dehydrate(queryClient);
  return { ...banner, dehydratedState };
}

export async function clientLoader() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'likes', 'all'],
      queryFn: () => getRecommendationMeeting('likes', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'random', 'all'],
      queryFn: () => getRecommendationMeeting('random', 'all'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['recommendationMeetings', 'recent', 'all'],
      queryFn: () => getRecommendationMeeting('recent', 'all'),
    }),
  ]);

  const banner = await getBanner();
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
