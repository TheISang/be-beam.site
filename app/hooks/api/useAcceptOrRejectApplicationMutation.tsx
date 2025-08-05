import { acceptOrRejectApplication } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

export default function useAcceptOrRejectApplicationMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: number; type: string }) =>
      acceptOrRejectApplication(id, data),
    onSuccess: (_, data) => {
      toast.success(
        `${data.type === 'ACCEPTED' ? '모임 참여 신청을 수락하였습니다.' : '모임 참여 신청을 거절하였습니다.'}`,
      );
      queryClient.invalidateQueries({ queryKey: ['applicants'] });
      close();
    },
    onError: (err, data) => {
      toast.error(
        `${data.type === 'ACCEPTED' ? '모임 참여 신청을 수락하였습니다.' : '모임 참여 신청을 거절하였습니다.'} 다시 시도해주세요.`,
      );
      console.error('Failed to refuse to participate in the meeting:', err);
    },
  });
}
