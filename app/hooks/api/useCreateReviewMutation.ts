import { createReview, type CreateReviewData } from '@/api/reviews';
import { useMutation } from '@tanstack/react-query';

interface CreateReviewParams {
  meetingId: number;
  data: CreateReviewData;
}

export default function useCreateReviewMutation() {
  return useMutation({
    mutationFn: ({ meetingId, data }: CreateReviewParams) =>
      createReview(meetingId, data),
  });
}
