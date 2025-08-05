import { Button } from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/checkbox/Checkbox';
import CheckIcon from '@/components/atoms/icons/CheckIcon';
import { Input } from '@/components/atoms/input/Input';
import { Label } from '@/components/atoms/label/Label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/atoms/radio-group/RadioGroup';
import DatePicker from '@/components/molecules/DatePicker';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import useMyInfoQuery from '@/hooks/api/useMyInfoQuery';
import useUpdateMyInfoMutation from '@/hooks/api/useUpdateMyInfoMutation';
import { FormMessage } from '@/components/atoms/form/FormMessage';
import useMyInfoForm, { myInfoSchema } from '@/hooks/business/useMyInfoForm';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.myInformation();
}

export default function MyInformation() {
  const myinfoQuery = useMyInfoQuery();
  const updateMyInfoMutation = useUpdateMyInfoMutation();

  const onSubmit = (data: z.infer<typeof myInfoSchema>) => {
    const mutationData = {
      name: data.name,
      phoneNumber: data.phoneNumber.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1-$2-$3',
      ),
      email: data.email,
      birthday: data.birthday.replaceAll('.', '-'),
      gender: data.gender === '남성' ? '남성' : ('여성' as '남성' | '여성'),
      terms: data.terms,
      userTerms: data.userTerms,
      marketingTerms: data.marketingTerms,
    };
    console.log('updateMyInfoMutation', mutationData);
    updateMyInfoMutation.mutate(mutationData);
  };

  return (
    <div className="flex-1">
      {/* 헤더 */}
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">개인정보 수정</h1>
        <div className="flex w-fit items-center rounded-lg bg-gray-200 p-2">
          <p className="text-b3 text-gray-600">
            📢 하단 정보는 본인 확인 및 마케팅 수신 서비스에 사용되며, 절대로
            프로필에 공개되지 않습니다.
          </p>
        </div>
      </div>
      {/* 개인정보 수정 폼 */}
      <div className="mt-8">
        {myinfoQuery.data && (
          <UserInformationForm
            information={{
              ...myinfoQuery.data,
              gender: myinfoQuery.data.gender || null,
            }}
            onSubmit={onSubmit}
          />
        )}
      </div>
      {/* 회원 탈퇴 */}
      <div className="mt-8">
        <button className="text-b3 text-gray-700 underline">회원 탈퇴</button>
      </div>
    </div>
  );
}

interface UserInformationFormProps {
  information: {
    name: string;
    phoneNumber: string;
    email: string;
    birthday: string;
    gender: '남성' | '여성' | null;
    terms: boolean;
    userTerms: boolean;
    marketingTerms: boolean;
  };
  onSubmit: (data: z.infer<typeof myInfoSchema>) => void;
}

function UserInformationForm({
  information,
  onSubmit,
}: UserInformationFormProps) {
  const form = useMyInfoForm({
    defaultValues: {
      ...information,
      gender: information.gender || '',
      birthday: information.birthday,
      terms: information.terms,
      userTerms: information.userTerms,
      marketingTerms: information.marketingTerms,
    },
  });

  const isAgreementAll =
    form.watch('terms') &&
    form.watch('userTerms') &&
    form.watch('marketingTerms');

  const handleSubmit = (data: z.infer<typeof myInfoSchema>) => {
    const mutationData = {
      name: data.name,
      phoneNumber: data.phoneNumber.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1-$2-$3',
      ),
      email: data.email,
      birthday: data.birthday.replaceAll('.', '-'),
      gender: data.gender as '남성' | '여성',
      terms: data.terms,
      userTerms: data.userTerms,
      marketingTerms: data.marketingTerms,
    };
    onSubmit(mutationData);
  };

  console.log(form.formState.errors);

  return (
    <form
      className="flex max-w-[800px] flex-col gap-7"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="name">닉네임</Label>
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
            <Input type="tel" {...form.register('phoneNumber')} />
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
              defaultValue={field.value}
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
      <Button size="lg">정보 수정</Button>
    </form>
  );
}
