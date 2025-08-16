import type { profileFormSchema } from '@/features/users/hooks/useProfileForm';
import useProfileForm from '@/features/users/hooks/useProfileForm';
import { Controller } from 'react-hook-form';
import type { z } from 'zod';
import ProfileImageInput from '../../../features/users/components/ProfileImageInput';
import { TextField } from '../../../shared/components/ui/TextField';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';

export default function ProfileForm({
  onSubmit,
  profile,
}: {
  onSubmit: (data: z.infer<typeof profileFormSchema>) => void;
  profile: {
    nickname: string;
    introduction: string;
    profileImage: string;
  };
}) {
  const { formState, handleSubmit, control } = useProfileForm({
    defaultValues: {
      nickname: profile?.nickname,
      introduction: profile?.introduction,
    },
  });

  return (
    <form
      className="mt-8 flex flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-fit">
        <Controller
          name="profileImage"
          control={control}
          render={({ field }) => (
            <ProfileImageInput
              image={field.value}
              onImageChange={field.onChange}
              defaultImage={profile?.profileImage}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <TextField
              label="닉네임"
              placeholder="닉네임"
              error={formState.errors.nickname?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="introduction"
          control={control}
          render={({ field }) => (
            <Textarea
              label="한 줄 소개"
              placeholder="한 줄 소개"
              maxLength={100}
              error={formState.errors.introduction?.message}
              {...field}
            />
          )}
        />
      </div>
      <Button size="lg" type="submit">
        정보 수정
      </Button>
    </form>
  );
}
