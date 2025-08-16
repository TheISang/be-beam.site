import {
  createReview,
  type CreateReviewData,
} from '@/shared/api/endpoints/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CreateReviewParams {
  meetingId: number;
  data: CreateReviewData;
}

export default function useCreateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ meetingId, data }: CreateReviewParams) =>
      createReview(meetingId, data),
    onSuccess: () => {
      toast.success('리뷰가 성공적으로 작성되었습니다.');
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
      toast.error('리뷰 작성에 실패했습니다.');
    },
  });
}
