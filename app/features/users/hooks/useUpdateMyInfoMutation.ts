import { myInfoQueryOptions } from '@/features/users/hooks/useMyInfoQuery';
import { updateMyInfo } from '@/shared/api/endpoints/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
