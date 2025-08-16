import {
  updateReview,
  type UpdateReviewData,
} from '@/shared/api/endpoints/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface UpdateReviewParams {
  reviewId: number;
  data: UpdateReviewData;
}

export default function useUpdateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, data }: UpdateReviewParams) =>
      updateReview(reviewId, data),
    onSuccess: () => {
      toast.success('후기를 수정했어요');
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['reviewable-reviews'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['written-reviews'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['reviews'],
        }),
      ]);
    },
    onError: () => {
      toast.error('후기 수정에 실패했어요');
    },
  });
}
