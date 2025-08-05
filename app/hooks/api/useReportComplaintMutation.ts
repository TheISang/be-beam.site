import { reportComplaint } from '@/api/complaints';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useReportComplaintMutation() {
  return useMutation({
    mutationFn: reportComplaint,
    onSuccess: () => {
      toast.success('신고가 접수되었어요');
    },
  });
}
