import { logout } from '@/shared/api/endpoints/auth';
import { COOKIE_DOMAIN } from '@/shared/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      Cookies.remove('access', {
        path: '/',
        domain: COOKIE_DOMAIN,
      });
      Cookies.remove('refresh', {
        path: '/',
        domain: COOKIE_DOMAIN,
      });
      queryClient.clear();
      window.location.reload();
    },
  });
}
