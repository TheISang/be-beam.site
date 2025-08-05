import { updateMyProfile } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myProfileQueryOptions } from './useMyProfileQuery';

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myProfileQueryOptions().queryKey,
      });
    },
  });
}
