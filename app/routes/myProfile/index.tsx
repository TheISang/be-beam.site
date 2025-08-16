import useMyProfileQuery from '@/features/users/hooks/useMyProfileQuery';
import { z } from 'zod';
import type { profileFormSchema } from '@/features/users/hooks/useProfileForm';
import { metaTemplates } from '@/shared/config/meta-templates';
import ProfileForm from '@/routes/myProfile/_components/ProfileForm';
import useUpdateProfileMutation from '@/features/users/hooks/useUpdateProfileMutation';

export function meta() {
  return metaTemplates.myProfile();
}

export default function MyProfile() {
  const profileQuery = useMyProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="max-w-[800px] flex-1">
      {/* 헤더 */}
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">프로필 정보</h1>
        <div className="w-fit rounded-lg bg-gray-200 p-2">
          <p className="text-b3 text-gray-600">
            👋 나를 가장 잘 나타내는 키워드로 한 줄 소개를 완성해 보세요.
          </p>
        </div>
      </div>
      {/* 프로필 수정 폼 */}

      {profileQuery.data && (
        <ProfileForm onSubmit={onSubmit} profile={profileQuery.data} />
      )}
    </div>
  );
}
