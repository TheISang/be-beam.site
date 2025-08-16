import {
  getReviewableReviews,
  type GetReviewableReviewsParams,
} from '@/shared/api/endpoints/users';
import { useSuspenseQuery } from '@tanstack/react-query';

export function reviewableReviewsQueryOptions(
  params: GetReviewableReviewsParams,
) {
  return {
    queryKey: ['reviewable-reviews', params],
    queryFn: () => getReviewableReviews(params),
  };
}

export default function useReviewableReviewsQuery(
  params: GetReviewableReviewsParams,
) {
  return useSuspenseQuery(reviewableReviewsQueryOptions(params));
}
