import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMeetingSecondSchema } from '@/schemas/meeting';
import type { z } from 'zod';
import type { CreateMeetingType } from '@/types/components';

import clsx from 'clsx';
import Text from '../atoms/text/Text';
import { Button } from '../atoms/button/Button';
import { Input } from '../atoms/input/Input';
import { Textarea } from '../atoms/textarea/Textarea';
import { DateRangePicker } from '../molecules/DateRangePicker';

interface CreateMeetingThirdContentProps {
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeetingType;
  setForm: (form: CreateMeetingType) => void;
}

export default function CreateMeetingThirdContent({
  tab,
  setTab,
  form,
  setForm,
}: CreateMeetingThirdContentProps) {
  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof createMeetingSecondSchema>
  >({
    resolver: zodResolver(createMeetingSecondSchema),
    defaultValues: {
      selectionType: form.selectionType ?? undefined,
      meetingMode: form.meetingMode ?? undefined,
      minParticipants: form.minParticipants ?? 0,
      maxParticipants: form.maxParticipants ?? 0,
      recruitingStartTime: form.recruitingStartTime ?? undefined,
      recruitingEndTime: form.recruitingEndTime ?? undefined,
      paymentAmount: form.paymentAmount ?? 0,
      info: form.info ?? '',
    },
  });

  const onSubmit = () => {
    setTab(tab + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="h-[300px] w-full overflow-y-scroll">
        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">모집 방법</Text>
          <Controller
            name="selectionType"
            control={control}
            render={({ field }) => (
              <>
                {['선착순', '선발형'].map((selectionType, idx) => (
                  <Button
                    type="button"
                    key={idx}
                    variant="tertiary"
                    className={clsx(
                      'mt-3 mr-2 h-9 rounded-md border-gray-300 px-4 text-b1',
                      field.value === selectionType
                        ? 'border-primary bg-primary-light text-primary'
                        : 'bg-white text-black',
                    )}
                    onClick={() => {
                      field.onChange(
                        field.value === selectionType
                          ? undefined
                          : selectionType,
                      );
                      setForm({
                        ...form,
                        selectionType:
                          field.value === selectionType
                            ? null
                            : (selectionType as '선발형' | '선착순'),
                      });
                    }}
                  >
                    {selectionType}
                  </Button>
                ))}
              </>
            )}
          />
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">모집 방식</Text>
          <Controller
            name="meetingMode"
            control={control}
            render={({ field }) => (
              <>
                {['온라인', '오프라인', '혼합'].map((meetingMode, idx) => (
                  <Button
                    type="button"
                    key={idx}
                    variant="tertiary"
                    className={clsx(
                      'mt-3 mr-2 h-9 rounded-md border-gray-300 px-4 text-b1',
                      field.value === meetingMode
                        ? 'border-primary bg-primary-light text-primary'
                        : 'bg-white text-black',
                    )}
                    onClick={() => {
                      field.onChange(
                        field.value === meetingMode ? undefined : meetingMode,
                      );
                      setForm({
                        ...form,
                        meetingMode:
                          field.value === meetingMode
                            ? null
                            : (meetingMode as '온라인' | '오프라인' | '혼합'),
                      });
                    }}
                  >
                    {meetingMode}
                  </Button>
                ))}
              </>
            )}
          />
        </div>

        <div className="mb-7 grid w-full grid-cols-2 items-center gap-3">
          <div>
            <Text variant="T2_Semibold">최소 인원</Text>
            <div className="mt-3 flex items-center gap-2">
              <Controller
                name="minParticipants"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="최소 인원을 입력해주세요."
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm({
                        ...form,
                        minParticipants: Number(e.target.value),
                      });
                    }}
                  />
                )}
              />
              명
            </div>
          </div>

          <div>
            <Text variant="T2_Semibold">최대 인원</Text>
            <div className="mt-3 flex items-center gap-2">
              <Controller
                name="maxParticipants"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="최대 인원을 입력해주세요."
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm({
                        ...form,
                        maxParticipants: Number(e.target.value),
                      });
                    }}
                  />
                )}
              />
              명
            </div>
          </div>
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">모집 기간</Text>
          <Controller
            name="recruitingStartTime"
            control={control}
            render={({ field: startField }) => (
              <Controller
                name="recruitingEndTime"
                control={control}
                render={({ field: endField }) => (
                  <DateRangePicker
                    className="mt-3"
                    value={{ from: startField.value, to: endField.value }}
                    onValueChange={(range) => {
                      startField.onChange(range?.from);
                      endField.onChange(range?.to);
                      setForm({
                        ...form,
                        recruitingStartTime: range?.from ?? null,
                        recruitingEndTime: range?.to ?? null,
                      });
                    }}
                    placeholder="YYYY.MM.DD"
                  />
                )}
              />
            )}
          />
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">참가비</Text>
          <div className="mt-3 flex w-full items-center gap-2">
            <Controller
              name="paymentAmount"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="참가비를 입력해주세요."
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setForm({ ...form, paymentAmount: Number(e.target.value) });
                  }}
                />
              )}
            />
            원
          </div>

          <div className="mt-3 w-full rounded-lg bg-gray-200 p-2">
            <Text variant="B3_Regular" color="gray-600">
              📢 무료 모임의 경우 0원으로 입력해주세요.
            </Text>
          </div>
        </div>

        <div className="mb-7 w-full">
          <Controller
            name="info"
            control={control}
            render={({ field }) => (
              <Textarea
                label="공지사항"
                labelClassName="text-t2"
                maxLength={1000}
                placeholder="공지사항을 입력해주세요."
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setForm({ ...form, info: e.target.value });
                }}
                className="mt-1 h-[144px]"
              />
            )}
          />
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full items-center gap-3">
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setTab(tab - 1)}
          className="w-[50%]"
        >
          이전
        </Button>
        <Button disabled={!formState.isValid} className="w-[50%]">
          다음
        </Button>
      </div>
    </form>
  );
}
