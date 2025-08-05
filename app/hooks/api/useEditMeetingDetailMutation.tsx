import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditMeetingDetail } from '@/api/users';

import type { EditMeetingDetailType } from '@/types/components';
import toast from 'react-hot-toast';

export default function useEditMeetingDetailMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditMeetingDetailType) => EditMeetingDetail(id, data),
    onSuccess: () => {
      toast.success('모임을 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['createdMeetingDetail'] });
      close();
    },
    onError: (err) => {
      toast.error('모임 수정을 실패하였습니다. 다시 시도해주세요.');
      console.error('Meeting modification failed:', err);
    },
  });
}
