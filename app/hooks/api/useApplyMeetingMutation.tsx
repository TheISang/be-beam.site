import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyMeeting } from '@/api/meetings';

import toast from 'react-hot-toast';

export default function useApplyMeetingMutation(
  id: number,
  refetchKey: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { joinReason: string }) => applyMeeting(id, data),
    onSuccess: () => {
      toast.success('모임 참여 신청을 하였습니다.');
      queryClient.invalidateQueries({ queryKey: [refetchKey] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });
}
