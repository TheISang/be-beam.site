import { updateReview, type UpdateReviewData } from '@/api/reviews';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface UpdateReviewParams {
  reviewId: number;
  data: UpdateReviewData;
}

export default function useUpdateReviewMutation() {
  return useMutation({
    mutationFn: ({ reviewId, data }: UpdateReviewParams) =>
      updateReview(reviewId, data),
    onSuccess: () => {
      toast.success('후기를 수정했어요');
    },
  });
}
