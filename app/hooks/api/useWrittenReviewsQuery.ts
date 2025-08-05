import { getWrittenReviews, type GetWrittenReviewsParams } from '@/api/users';
import { useSuspenseQuery } from '@tanstack/react-query';

export function writtenReviewsQueryOptions(params: GetWrittenReviewsParams) {
  return {
    queryKey: ['written-reviews', params],
    queryFn: () => getWrittenReviews(params),
  };
}

export default function useWrittenReviewsQuery(
  params: GetWrittenReviewsParams,
) {
  return useSuspenseQuery(writtenReviewsQueryOptions(params));
}
