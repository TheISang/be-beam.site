import { unlikeReview, type ReviewListResult } from '@/api/reviews';
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

interface UnlikeReviewParams {
  reviewId: number;
}

export default function useUnlikeReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: UnlikeReviewParams) =>
      unlikeReview({ reviewId }),
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
            pages: prevData.pages.map((page) => ({
              ...page,
              reviews: page.reviews.map((review) =>
                review.reviewId === reviewId
                  ? {
                      ...review,
                      liked: false,
                      likesCount: Math.max(0, review.likesCount - 1),
                    }
                  : review,
              ),
            })),
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
