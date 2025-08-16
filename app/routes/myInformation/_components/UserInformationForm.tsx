import useMyInfoForm, {
  myInfoSchema,
} from '@/features/users/hooks/useMyInfoForm';
import { Label } from '../../../shared/components/ui/Label';
import { Input } from '../../../shared/components/ui/Input';
import { FormMessage } from '../../../shared/components/ui/FormMessage';
import CheckIcon from '../../../shared/components/icons/CheckIcon';
import { Controller } from 'react-hook-form';
import DatePicker from '../../../shared/components/common/DatePicker';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../shared/components/ui/RadioGroup';
import { Checkbox } from '../../../shared/components/ui/Checkbox';
import { Button } from '../../../shared/components/ui/Button';
import type { z } from 'zod';

interface UserInformationFormProps {
  information: {
    name: string | null;
    phoneNumber: string | null;
    email: string;
    birthday: string | null;
    gender: '남성' | '여성' | null;
    terms: boolean;
    userTerms: boolean;
    marketingTerms: boolean;
  };
  onSubmit: (data: z.infer<typeof myInfoSchema>) => void;
}

export default function UserInformationForm({
  information,
  onSubmit,
}: UserInformationFormProps) {
  const form = useMyInfoForm({
    defaultValues: information,
  });

  const isAgreementAll =
    form.watch('terms') &&
    form.watch('userTerms') &&
    form.watch('marketingTerms');

  const handleSubmit = (data: z.infer<typeof myInfoSchema>) => {
    const mutationData = {
      name: data.name,
      phoneNumber: data.phoneNumber
        ? data.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        : null,
      email: data.email,
      birthday: data.birthday ? data.birthday.replaceAll('.', '-') : null,
      gender: data.gender as '남성' | '여성' | null,
      terms: data.terms,
      userTerms: data.userTerms,
      marketingTerms: data.marketingTerms,
    };
    onSubmit(mutationData);
  };

  console.log(form.formState.errors);

  const errorMessages = Object.values(form.formState.errors).map(
    (error) => error.message,
  );

  return (
    <form
      className="flex max-w-[800px] flex-col gap-7"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="name">이름</Label>
        <Input {...form.register('name')} />
        {form.formState.errors.name && (
          <FormMessage variant="error">
            {form.formState.errors.name.message}
          </FormMessage>
        )}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="phoneNumber">휴대전화번호</Label>
          <div className="flex w-full items-center gap-5">
            <Input
              type="tel"
              {...form.register('phoneNumber')}
              placeholder="01012345678"
            />
            <div className="flex items-center justify-center gap-1">
              <CheckIcon className="size-4.5 text-primary" />
              <span className="text-b2 whitespace-nowrap text-primary">
                인증완료
              </span>
            </div>
          </div>
          {form.formState.errors.phoneNumber && (
            <FormMessage variant="error">
              {form.formState.errors.phoneNumber.message}
            </FormMessage>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input {...form.register('email')} />
        {form.formState.errors.email && (
          <FormMessage variant="error">
            {form.formState.errors.email.message}
          </FormMessage>
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="birthday">생년월일</Label>
        <Controller
          name="birthday"
          control={form.control}
          render={({ field }) => <DatePicker {...field} />}
        />
        {form.formState.errors.birthday && (
          <FormMessage variant="error">
            {form.formState.errors.birthday.message}
          </FormMessage>
        )}
      </div>

      <div>
        <Label htmlFor="gender">성별</Label>
        <Controller
          name="gender"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              className="mt-2 grid grid-cols-2"
              defaultValue={field.value || undefined}
              onValueChange={field.onChange}
            >
              <div className="flex h-11.5 items-center space-x-2">
                <RadioGroupItem value="여성" id="woman" />
                <Label htmlFor="woman">여성</Label>
              </div>
              <div className="flex h-11.5 items-center space-x-2">
                <RadioGroupItem value="남성" id="man" />
                <Label htmlFor="man">남성</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-b1">개인 정보 처리 및 마케팅 수신 동의</p>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-5">
          <div className="flex items-center gap-2 border-b border-gray-400 pb-4">
            <Checkbox
              id="form_agreement_all"
              checked={isAgreementAll}
              onCheckedChange={() => {
                if (isAgreementAll) {
                  form.setValue('terms', false);
                  form.setValue('userTerms', false);
                  form.setValue('marketingTerms', false);
                } else {
                  form.setValue('terms', true);
                  form.setValue('userTerms', true);
                  form.setValue('marketingTerms', true);
                }
              }}
            />
            <Label
              htmlFor="form_agreement_all"
              className="text-t3 text-gray-900"
            >
              전체동의
            </Label>
          </div>
          <div className="flex flex-col gap-3">
            <Controller
              name="terms"
              control={form.control}
              render={({ field: { onChange, value, ...rest } }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="form_agreement_terms"
                    checked={value}
                    onCheckedChange={onChange}
                    {...rest}
                  />
                  <Label
                    htmlFor="form_agreement_terms"
                    className="text-b3 text-gray-800"
                  >
                    이용 약관 동의(필수)
                  </Label>
                </div>
              )}
            />
            <Controller
              name="userTerms"
              control={form.control}
              render={({ field: { onChange, value, ...rest } }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="form_agreement_userTerms"
                    checked={value}
                    onCheckedChange={onChange}
                    {...rest}
                  />
                  <Label
                    htmlFor="form_agreement_userTerms"
                    className="text-b3 text-gray-800"
                  >
                    개인정보 수집 및 이용에 동의(필수)
                  </Label>
                </div>
              )}
            />
            <Controller
              name="marketingTerms"
              control={form.control}
              render={({ field: { onChange, value, ...rest } }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="form_agreement_marketing"
                    checked={value}
                    onCheckedChange={onChange}
                    {...rest}
                  />
                  <Label
                    htmlFor="form_agreement_marketing"
                    className="text-b3 text-gray-800"
                  >
                    마케팅 수신 동의(선택)
                  </Label>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <FormMessage variant="error">{errorMessages.join(', ')}</FormMessage>
      <Button size="lg">정보 수정</Button>
    </form>
  );
}
