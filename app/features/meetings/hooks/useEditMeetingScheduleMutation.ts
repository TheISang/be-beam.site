import { EditMeetingSchedule } from '@/shared/api/endpoints/users';
import type { EditMeetingSchedule as EditMeetingScheduleType } from '@/shared/types/entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

export default function useEditMeetingScheduleMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: { schedules: EditMeetingScheduleType[] }) =>
      EditMeetingSchedule(id, form),
    onSuccess: () => {
      toast.success('모임 수정을 완료하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['createdMeetingSchedules'] });
      close();
    },
    onError: (err) => {
      toast.error('모임 수정을 실패하였습니다. 다시 시도해주세요.');
      console.error('Meeting Edit failed:', err);
    },
  });
}
