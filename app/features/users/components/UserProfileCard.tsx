import { Link } from 'react-router';
import Text from '../../../shared/components/ui/Text';
import type { UserType } from '@/shared/types/commons';

export default function UserProfileCard({ user }: { user: UserType }) {
  return (
    <div className="box-border flex w-full flex-col items-center rounded-2xl border-1 border-gray-300 p-5">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={user.profileImage}
        alt="profile_img"
      />
      <Text variant="T2_Semibold" className="mt-4">
        {user.nickname}
      </Text>

      <Link
        to={`/myPage/profile`}
        className="mt-6 cursor-pointer rounded-lg border-1 border-gray-300 px-5 py-3 text-b3"
      >
        프로필 보기
      </Link>
    </div>
  );
}
