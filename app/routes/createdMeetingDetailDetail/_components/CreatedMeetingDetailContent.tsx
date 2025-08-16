import { useSuspenseQuery } from '@tanstack/react-query';
import useEditMeetingDetailMutation from '@/features/meetings/hooks/useEditMeetingDetailMutation';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCreatedMeetingSecondSchema } from '@/features/meetings/schemas/meeting';
import { getMyCreatedMeetingDetail } from '@/shared/api/endpoints/users';
import { format } from 'date-fns';

import { cn } from '@/styles/tailwind';
import Text from '../../../shared/components/ui/Text';
import { Input } from '../../../shared/components/ui/Input';
import { DateInput } from '../../../shared/components/common/DateInput';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';

export default function CreatedMeetingDetailContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data: detail } = useSuspenseQuery({
    queryKey: ['createdMeetingDetail', meetingId],
    queryFn: () => getMyCreatedMeetingDetail(meetingId),
  });

  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof editCreatedMeetingSecondSchema>
  >({
    resolver: zodResolver(editCreatedMeetingSecondSchema),
    defaultValues: {
      selectionType: detail.selectionType || undefined,
      meetingMode: detail.meetingMode || undefined,
      minParticipants: detail.minParticipants || 0,
      maxParticipants: detail.maxParticipants || 0,
      recruitingEndTime:
        format(detail.recruitingEndTime, 'yyyy-MM-dd') || undefined,
      paymentAmount: detail.paymentAmount || 0,
      info: detail.info || '',
    },
  });

  const { mutate: editMeetingDetail, isPending } =
    useEditMeetingDetailMutation(meetingId);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (isPending) return;
        editMeetingDetail(data);
      })}
      className="w-full py-6"
    >
      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="selectionType"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 방법
        </label>
        <div className="mt-3 w-full">
          {['선착순', '선발형'].map((selectionType, idx) => (
            <Controller
              key={idx}
              name="selectionType"
              control={control}
              render={({ field }) => (
                <Button
                  key={idx}
                  type="button"
                  variant="tertiary"
                  className={cn(
                    'mr-2 h-9 min-w-auto rounded-lg border-1 transition-all duration-700 hover:border-primary hover:bg-primary-light hover:text-primary',
                    field.value === selectionType
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-gray-300',
                  )}
                  onClick={() => {
                    field.onChange(
                      field.value === selectionType ? undefined : selectionType,
                    );
                  }}
                >
                  {selectionType}
                </Button>
              )}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="selectionType"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 방식
        </label>
        <div className="mt-3 w-full">
          {['오프라인', '온라인', '혼합'].map((mode, idx) => (
            <Controller
              key={idx}
              name="meetingMode"
              control={control}
              render={({ field }) => (
                <Button
                  key={idx}
                  type="button"
                  variant="tertiary"
                  className={cn(
                    'mr-2 h-9 min-w-auto rounded-lg border-1 transition-all duration-700 hover:border-primary hover:bg-primary-light hover:text-primary',
                    field.value === mode
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-gray-300',
                  )}
                  onClick={() => {
                    field.onChange(field.value === mode ? undefined : mode);
                  }}
                >
                  {mode}
                </Button>
              )}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 grid w-full grid-cols-2 items-center gap-4">
        <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
          <label
            htmlFor="minParticipants"
            className="mb-3 block text-t2 text-gray-900"
          >
            최소 인원
          </label>
          <div className="flex items-center gap-2">
            <Controller
              name="minParticipants"
              control={control}
              render={({ field }) => (
                <Input
                  id="maxParticipants"
                  type="number"
                  className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Text variant="T2_Semibold">명</Text>
          </div>
        </div>
        <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
          <label
            htmlFor="maxParticipants"
            className="mb-3 block text-t2 text-gray-900"
          >
            최대 인원
          </label>
          <div className="flex items-center gap-2">
            <Controller
              name="maxParticipants"
              control={control}
              render={({ field }) => (
                <Input
                  id="maxParticipants"
                  type="number"
                  className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Text variant="T2_Semibold">명</Text>
          </div>
        </div>
      </div>

      <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="recruitingEndTime"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 기간
        </label>
        <Controller
          name="recruitingEndTime"
          control={control}
          render={({ field }) => (
            <DateInput
              id="recruitingEndTime"
              className="mt-1"
              placeholder="YYYY.MM.DD"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="mt-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="paymentAmount"
          className="mb-3 block text-t2 text-gray-900"
        >
          참가비
        </label>
        <div className="flex w-full items-center gap-2">
          <Controller
            name="paymentAmount"
            control={control}
            render={({ field }) => (
              <Input
                id="paymentAmount"
                type="number"
                className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Text variant="T2_Semibold">원</Text>
        </div>

        <Text
          variant="B3_Regular"
          color="gray-600"
          className="mt-3 box-border w-full rounded-lg bg-white p-2"
        >
          📢 무료 모임의 경우 0원으로 입력해주세요.
        </Text>
      </div>

      <div className="mt-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <Controller
          name="info"
          control={control}
          render={({ field }) => (
            <Textarea
              label="공지사항"
              labelClassName="block text-t2 text-gray-900"
              maxLength={2000}
              placeholder="공지사항을 입력해주세요."
              className="mt-1 box-border h-[154px] flex-1 border-gray-300 bg-white p-4 shadow-none"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </div>

      <div className="flex w-full justify-center">
        <Button
          className="mt-5 min-w-100"
          type="submit"
          disabled={!formState.isValid}
        >
          수정 완료
        </Button>
      </div>
    </form>
  );
}
