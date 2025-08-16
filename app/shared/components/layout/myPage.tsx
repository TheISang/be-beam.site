import { Outlet } from 'react-router';
import useUserSession from '@/features/users/hooks/useUserSession';
import { requireAuthMiddleware } from '@/shared/server/auth';

import MyPageTemplate from '@/shared/components/layout/MyPageTemplate';
import SideBar from '@/shared/components/common/SideBar';

export const unstable_middleware = [requireAuthMiddleware];

export default function MyPage() {
  const { user } = useUserSession();

  return (
    <MyPageTemplate>
      {!user ? (
        <p>유저가 존재하지 않습니다.</p>
      ) : (
        <>
          <SideBar user={user} />
          <Outlet />
        </>
      )}
    </MyPageTemplate>
  );
}
