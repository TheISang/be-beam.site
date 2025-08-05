import { logout } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.resetQueries();
      Cookies.remove('access');
      Cookies.remove('refresh');
    },
  });
}
