import { myProfileQueryOptions } from '@/features/users/hooks/useMyProfileQuery';
import { updateMyProfile } from '@/shared/api/endpoints/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
