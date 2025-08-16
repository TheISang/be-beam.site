import { Chip } from '@/shared/components/ui/Chip';
import { Link, Outlet, useMatch } from 'react-router';

export default function MyReviewLayout() {
  const matchWritten = useMatch({
    path: '/mypage/reviews/written',
    end: true,
  });
  const matchReviewable = useMatch({
    path: '/mypage/reviews/reviewable',
    end: true,
  });
  return (
    <div className="flex-1">
      <div>
        <h1 className="text-h2">나의 후기</h1>
        <p className="mt-2.5 text-b2 text-gray-600">
          참여 완료한 모임의 후기를 작성할 수 있어요.
        </p>
      </div>
      <div className="mt-12 flex items-center justify-between">
        <div className="flex gap-2.5">
          <Chip variant={matchWritten ? 'primary' : 'secondary'} asChild>
            <Link
              to={{
                pathname: '/mypage/reviews/written',
              }}
            >
              내가 쓴 후기
            </Link>
          </Chip>
          <Chip variant={matchReviewable ? 'primary' : 'secondary'} asChild>
            <Link
              to={{
                pathname: '/mypage/reviews/reviewable',
              }}
            >
              작성 가능한 후기
            </Link>
          </Chip>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
