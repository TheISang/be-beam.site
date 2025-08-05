import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const myInfoSchema = z.object({
  name: z.string(),
  phoneNumber: z
    .string()
    .min(11, '휴대전화번호는 11자리입니다.')
    .max(11, '휴대전화번호는 11자리입니다.')
    .regex(/^01[016789]\d{7,8}$/, '올바른 휴대전화번호를 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  birthday: z
    .string()
    .regex(
      /^[0-9]{4}.[0-9]{2}.[0-9]{2}$/,
      '올바른 생년월일을 입력해주세요.(YYYY.MM.DD)',
    ),
  gender: z.string().refine((value) => ['남성', '여성'].includes(value)),
  terms: z.boolean(),
  userTerms: z.boolean(),
  marketingTerms: z.boolean(),
});

export default function useMyInfoForm(
  props: UseFormProps<z.infer<typeof myInfoSchema>>,
) {
  return useForm<z.infer<typeof myInfoSchema>>({
    resolver: zodResolver(myInfoSchema),
    defaultValues: props.defaultValues,
    ...props,
  });
}
