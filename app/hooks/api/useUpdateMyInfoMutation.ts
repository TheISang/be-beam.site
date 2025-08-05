import { updateMyInfo } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myInfoQueryOptions } from './useMyInfoQuery';

export default function useUpdateMyInfoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myInfoQueryOptions().queryKey,
      });
    },
  });
}
