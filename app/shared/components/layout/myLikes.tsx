import { Chip } from '@/shared/components/ui/Chip';
import { Link, Outlet, useMatch } from 'react-router';

const myLikesData = [
  {
    to: '/myPage/likes/regular',
    value: 'regular',
    title: '정기모임',
  },
  {
    to: '/myPage/likes/small',
    value: 'small',
    title: '소모임',
  },
  {
    to: '/myPage/likes/review',
    value: 'review',
    title: '후기',
  },
];

export default function MyLikesLayout() {
  const matchPath = useMatch({
    path: '/myPage/likes/*',
  });
  const currentTab = matchPath?.params['*'];
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">좋아요 리스트</h1>
        <p className="text-b2 text-gray-600">
          내가 좋아하는 모임, 후기를 모아보세요.
        </p>
      </div>
      <div className="mt-12 flex items-center gap-3">
        {myLikesData.map((item) => (
          <Chip
            key={item.to}
            variant={currentTab === item.value ? 'primary' : 'secondary'}
            asChild
          >
            <Link key={item.to} to={item.to}>
              {item.title}
            </Link>
          </Chip>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
