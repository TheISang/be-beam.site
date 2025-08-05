import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useEditMeetingScheduleMutation from '@/hooks/api/useEditMeetingScheduleMutation';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCreatedMeetingThirdSchema } from '@/schemas/meeting';
import { getMyCreatedMeetingSchedule } from '@/api/users';
import { format } from 'date-fns';

import type { MeetingSchedule } from '@/types/entities';
import { cn } from '@/lib/tailwind';
import Text from '../atoms/text/Text';
import { DateInput } from '../molecules/DateInput';
import { TimeInput } from '../molecules/TimeInput';
import { AddressInput } from '../molecules/AddressInput';
import { Button } from '../atoms/button/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion/Accrodion';
import { Checkbox } from '../atoms/checkbox/Checkbox';
import TrashIcon from '../atoms/icons/TrashIcon';

export default function CreatedMeetingScheduleContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<
    Set<number | null>
  >(new Set());

  const { data: schedule } = useQuery({
    queryKey: ['createdMeetingSchedule', meetingId],
    queryFn: () => getMyCreatedMeetingSchedule(meetingId),
  });

  const allSchedule = useMemo(() => {
    return schedule?.schedules.map((s: MeetingSchedule) => ({
      ...s,
      meetingDate: format(s.meetingStartTime, 'yyyy-MM-dd'),
      meetingStartTime: s.meetingStartTime.slice(11),
      meetingEndTime: s.meetingEndTime.slice(11),
    }));
  }, [schedule]);
  console.log(allSchedule);

  const { control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof editCreatedMeetingThirdSchema>
  >({
    resolver: zodResolver(editCreatedMeetingThirdSchema),
    defaultValues: {
      schedules: [
        {
          id: null,
          meetingDate: '',
          meetingStartTime: '',
          meetingEndTime: '',
          address: '',
          addressDetail: '',
        },
      ],
    },
  });

  // 'schedules' 배열 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  useEffect(() => {
    if (allSchedule) {
      reset({
        schedules: allSchedule || [
          {
            id: null,
            address: '',
            addressDetail: '',
            meetingDate: '',
            meetingStartTime: '',
            meetingEndTime: '',
          },
        ],
      });
    }
  }, [allSchedule, reset]);

  const handleSelectOne = useCallback((fieldId: number, isChecked: boolean) => {
    setSelectedScheduleIds((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(fieldId);
      } else {
        newSet.delete(fieldId);
      }
      return newSet;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedScheduleIds.size === 0) {
      alert('삭제할 일정을 선택해주세요.');
      return;
    }

    const indexesToDelete = fields
      .map((field, idx) => ({ originIdx: idx, id: field.id }))
      .filter((_, idx) => selectedScheduleIds.has(idx))
      .sort((a, b) => b.originIdx - a.originIdx);

    indexesToDelete.forEach((field) => {
      const idx = fields.findIndex((f) => f.id === field.id);
      console.log(idx);
      remove(idx);
    });

    setSelectedScheduleIds(new Set());
  }, [selectedScheduleIds, fields, remove]);

  const { mutate: editCreateMeeting, isPending } =
    useEditMeetingScheduleMutation(meetingId);

  return (
    <div className="w-full py-8">
      <div className="flex w-full items-center justify-between">
        <Text
          variant="B3_Regular"
          color="gray-600"
          className="inline-block rounded-lg bg-gray-200 p-2"
        >
          📢 ‘일정 등록하기’ 버튼을 눌러 추가 일정을 등록할 수 있어요.
        </Text>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleDeleteSelected}
            disabled={selectedScheduleIds.size === 0}
            className="flex h-12 items-center gap-1 border-1 border-[#FF4D4C] bg-[#ffeded] px-4 py-2 text-[#FF4D4C] hover:bg-[#ffeded]"
          >
            <TrashIcon />
            삭제
          </Button>
          <Button
            className="flex h-12 min-w-40 items-center gap-2"
            onClick={() => {
              const newSchedule = {
                id: null,
                meetingDate: '',
                meetingStartTime: '',
                meetingEndTime: '',
                address: '',
                addressDetail: '',
              };
              append(newSchedule);
            }}
          >
            <img src="/images/icons/w_plus.svg" alt="plus_icon" />
            일정 등록하기
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (isPending) return;
          editCreateMeeting(data);
        })}
      >
        {fields.map((_, idx) => (
          <Accordion
            key={idx}
            type="single"
            collapsible
            className={cn(
              selectedScheduleIds.has(idx)
                ? 'border-[#FF4D4C]'
                : 'border-gray-300',
              'mt-5 box-border w-full rounded-lg border-1 bg-gray-100 p-5',
            )}
          >
            <AccordionItem
              value="item-1"
              className="border-b-1 border-gray-400"
            >
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`select-schedule-${idx}`}
                    className="mr-2 size-5 cursor-pointer data-[state=checked]:border-[#FF4D4C] data-[state=checked]:bg-[#FF4D4C]"
                    checked={selectedScheduleIds.has(idx)}
                    onCheckedChange={(value: boolean) =>
                      handleSelectOne(idx, value)
                    }
                  />
                  <Text
                    variant="T2_Semibold"
                    color="gray-900"
                    className="text-left"
                  >
                    {idx + 1}일차 일정
                  </Text>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-5 w-full">
                  <label htmlFor="meetingDate">일정</label>
                  <Controller
                    name={`schedules.${idx}.meetingDate`}
                    control={control}
                    render={({ field }) => (
                      <DateInput
                        id="meetingDate"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="YYYY.MM.DD"
                        className="mt-2"
                      />
                    )}
                  />
                </div>

                <div className="mt-2 mb-5 w-full">
                  <label htmlFor="meetingTime">시간 선택</label>
                  <div className="mt-2 flex w-full items-center gap-2">
                    <Controller
                      name={`schedules.${idx}.meetingStartTime`}
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="00:00 AM/PM"
                          className="w-full"
                          format12Hour={true}
                        />
                      )}
                    />
                    -
                    <Controller
                      name={`schedules.${idx}.meetingEndTime`}
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="00:00 AM/PM"
                          className="w-full"
                          format12Hour={true}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mb-5 w-full">
                  <label htmlFor="address">모임 장소</label>
                  <Controller
                    name={`schedules.${idx}.address`}
                    control={control}
                    render={({ field: addressField }) => (
                      <Controller
                        name={`schedules.${idx}.addressDetail`}
                        control={control}
                        render={({ field: addressDetailField }) => (
                          <AddressInput
                            address={addressField.value}
                            addressDetail={addressDetailField.value || ''}
                            onChange={(address, addressDetail) => {
                              addressField.onChange(address);
                              addressDetailField.onChange(addressDetail);
                            }}
                            placeholder="모집 장소를 선택해주세요."
                            className="mt-2 w-full"
                          />
                        )}
                      />
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
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
    </div>
  );
}
