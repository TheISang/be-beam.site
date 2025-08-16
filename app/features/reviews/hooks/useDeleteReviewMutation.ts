import { deleteReview } from '@/shared/api/endpoints/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success('후기를 삭제했어요');
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
      toast.error('후기 삭제에 실패했어요');
    },
  });
}
