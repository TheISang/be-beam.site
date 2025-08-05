import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { cancelMeeting } from '@/api/meetings';

export default function useCancelMeetingMutation(
  id: number,
  refetchKey: string,
  statusType: 'participating' | 'applied',
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      cancellationReasonType: '개인일정' | '단순변심' | '위치' | '기타';
      cancelReason: string;
    }) => cancelMeeting(data, id, statusType),
    onSuccess: () => {
      toast.success(
        `${statusType === 'participating' ? '모임 중도 이탈을' : '모임 취소를'} 신청하였습니다.`,
      );
      queryClient.invalidateQueries({ queryKey: [refetchKey] });
      close();
    },
    onError: (err) => {
      toast.error(
        `${statusType === 'participating' ? '모임 중도 이탈 신청' : '모임 취소 신청'}을 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
