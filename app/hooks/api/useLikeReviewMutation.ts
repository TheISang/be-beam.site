import { likeReview, type ReviewListResult } from '@/api/reviews';
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

interface LikeReviewParams {
  reviewId: number;
}

export default function useLikeReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: LikeReviewParams) => likeReview({ reviewId }),
    onMutate: async ({ reviewId }) => {
      await queryClient.cancelQueries({
        queryKey: ['reviews'],
      });
      const previousData = queryClient.getQueriesData<
        InfiniteData<ReviewListResult> | undefined
      >({
        queryKey: ['reviews'],
      });
      queryClient.setQueriesData<InfiniteData<ReviewListResult> | undefined>(
        {
          queryKey: ['reviews'],
        },
        (prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            pages: prevData.pages.map((page) => {
              return {
                ...page,
                reviews: page.reviews.map((review) => {
                  if (review.reviewId === reviewId) {
                    return {
                      ...review,
                      liked: true,
                      likesCount: review.likesCount + 1,
                    };
                  }
                  return review;
                }),
              };
            }),
          };
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueriesData(
          {
            queryKey: ['reviews'],
          },
          context.previousData,
        );
      }
    },
  });
}
