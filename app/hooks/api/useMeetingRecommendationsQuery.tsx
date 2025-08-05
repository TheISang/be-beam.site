import { getRecommendationMeeting } from '@/api/home';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingRecommendationQuery(
  type: 'likes' | 'random' | 'recent',
  tab: 'all' | 'regular' | 'small',
) {
  return useQuery({
    queryKey: ['recommendationMeetings', type, tab],
    queryFn: () => getRecommendationMeeting(type, tab),
  });
}
