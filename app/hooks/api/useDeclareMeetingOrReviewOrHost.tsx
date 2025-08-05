import { useMutation, useQueryClient } from '@tanstack/react-query';
import { declareMeetingOrReviewOrHost } from '@/api/complaints';
import toast from 'react-hot-toast';

export interface DeclareModalPropsType {
  id: number;
  type: 'meeting' | 'review' | 'host';
  refetchKey: string;
}

export interface DeclareDataType {
  reasonType: string;
  description: string;
}

export default function useDeclareMeetingOrReviewOrHost(
  modalProps: DeclareModalPropsType,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeclareDataType) =>
      declareMeetingOrReviewOrHost(data, modalProps),
    onSuccess: () => {
      toast.success(
        `${modalProps.type === 'meeting' ? '해당 모임을' : modalProps.type === 'review' ? '해당 모임 후기를' : '해당 호스트를'} 신고하였습니다.`,
      );
      queryClient.refetchQueries({ queryKey: [modalProps.refetchKey] });
      close();
    },
    onError: (err) => {
      toast.error(
        `${modalProps.type === 'meeting' ? '해당 모임을' : modalProps.type === 'review' ? '해당 모임 후기를' : '해당 호스트를'} 신고를 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Meeting cancellation failed:', err);
    },
  });
}
