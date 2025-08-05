import { deleteReview } from '@/api/reviews';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDeleteReviewMutation() {
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success('후기를 삭제했어요');
    },
  });
}
