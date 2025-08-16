import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeMeeting } from '@/shared/api/endpoints/meetings';

import toast from 'react-hot-toast';

export default function useLikeMeetingMutation(refetchKey: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meeting: { id: number; liked: boolean }) =>
      likeMeeting(meeting),
    onSuccess: (_, variables) => {
      toast.success(
        `해당 모임의 ${variables.liked ? '좋아요를 취소하였습니다.' : ' 좋아요를 눌렀습니다.'}`,
      );
      queryClient.refetchQueries({ queryKey: [refetchKey] });
    },
    onError: (err, variables) => {
      toast.error(
        `해당 모임의 ${variables.liked ? '좋아요 취소를' : '좋아요 누르는 것을'} 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
