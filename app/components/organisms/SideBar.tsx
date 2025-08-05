import { useState } from 'react';

import SideBarNavItem from '../atoms/SideBarNavItem';
import UserProfileCard from '../molecules/UserProfileCard';
import SidebarSection from '../molecules/SidebarSection';

import type { UserType } from '@/types/commons';

export default function SideBar({ user }: { user: UserType }) {
  const [isMeetingPage, setIsMeetingPage] = useState(true);

  const navMeetingData = [
    {
      to: '/mypage/participated',
      title: '참여 모임',
      onClick: () => setIsMeetingPage(true),
    },
    {
      to: '/mypage/requested',
      title: '신청 모임',
      onClick: () => setIsMeetingPage(true),
    },
    {
      to: '/mypage/created',
      title: '내가 개설한 모임',
      onClick: () => setIsMeetingPage(true),
    },
  ];
  const navData = [
    {
      to: '/mypage/reviews',
      title: '✍️ 나의 후기',
      onClick: () => setIsMeetingPage(false),
    },
    {
      to: '/mypage/likes',
      title: '💖 좋아요 리스트',
      onClick: () => setIsMeetingPage(false),
    },
    {
      to: '/mypage/following',
      title: '⭐ 팔로잉 리스트',
      onClick: () => setIsMeetingPage(false),
    },
    {
      to: '/mypage/info',
      title: '🙆 개인정보 수정',
      onClick: () => setIsMeetingPage(false),
    },
    {
      to: '/mypage/notifications',
      title: '🔔 나의 알림',
      onClick: () => setIsMeetingPage(false),
    },
  ];

  return (
    <aside className="sticky top-[100px] w-[230px]">
      <UserProfileCard user={user} />

      <div className="mt-6">
        <SidebarSection
          title="🥳 나의 모임"
          isActive={isMeetingPage}
          items={navMeetingData}
        />

        <div className="mt-1 border-t-1 border-gray-300">
          {navData.map((item, idx) => (
            <SideBarNavItem
              key={idx}
              to={item.to}
              title={item.title}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
