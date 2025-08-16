import type { loader } from '@/root';

import { useRouteLoaderData } from 'react-router';

export default function useUserSession() {
  const user = useRouteLoaderData<typeof loader>('root');
  return {
    user: user?.user || null,
  };
}
