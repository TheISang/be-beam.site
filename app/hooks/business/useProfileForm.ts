import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const profileFormSchema = z.object({
  nickname: z.string().min(2, '2글자 이상 입력해주세요'),
  introduction: z.string().max(100, '100글자 이하로 입력해주세요'),
  profileImage: z.instanceof(File).optional(),
});

export default function useProfileForm(
  params: UseFormProps<z.infer<typeof profileFormSchema>>,
) {
  return useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    ...params,
  });
}
