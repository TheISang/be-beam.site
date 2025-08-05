import { Outlet } from 'react-router';

import MyPageTemplate from '@/components/templates/MyPageTemplate';
import SideBar from '@/components/organisms/SideBar';
import type { Route } from './+types/myPage';

export function meta() {
  return [
    { title: '마이페이지' },
    {
      name: 'description',
      content: '마이페이지에서 내 개인정보를 확인하세요.',
    },
  ];
}

export async function clientLoader() {
  // 나중에는 유저 데이터 가져오는 로직
  const user = {
    nickName: '비빔 관리자',
    profileImg:
      'https://i.pinimg.com/736x/83/1a/0b/831a0b369f389fdd93d072203287043e.jpg',
  };

  return { user };
}

export default function MyPage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <MyPageTemplate>
      <SideBar user={user} />
      <Outlet />
    </MyPageTemplate>
  );
}
