import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { createMeetingFourthSchema } from '@/schemas/meeting';
import type { CreateMeetingType } from '@/types/components';
import { format } from 'date-fns';

import Text from '../atoms/text/Text';
import { Button } from '../atoms/button/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion/Accrodion';
import { DateInput } from '../molecules/DateInput';
import { TimeInput } from '../molecules/TimeInput';
import { AddressInput } from '../molecules/AddressInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';
import { useModalStore } from '@/stores/useModalStore';

interface CreateMeetingFourthContentProps {
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeetingType;
  setForm: (form: CreateMeetingType) => void;
}

export default function CreateMeetingFourthContent({
  tab,
  setTab,
  form,
  setForm,
}: CreateMeetingFourthContentProps) {
  const queryClient = useQueryClient();
  const { close } = useModalStore();
  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof createMeetingFourthSchema>
  >({
    resolver: zodResolver(createMeetingFourthSchema),
    defaultValues: {
      schedules: form.schedules ?? [
        {
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

  const { mutate: createMeeting, isPending } = useMutation({
    mutationFn: (form: CreateMeetingType) => {
      const formData = new FormData();

      if (form.thumbnailImage) {
        formData.append('thumbnailImage', form.thumbnailImage);
      }

      form.images.forEach((file) => {
        formData.append('files', file);
      });

      formData.append(
        'data',
        new Blob(
          [
            JSON.stringify({
              name: form.name,
              recruitmentType: form.recruitmentType,
              selectionType: form.selectionType,
              meetingMode: form.meetingMode,
              topicId: form.topicId,
              hashtags: form.hashtags,
              guidbookReferenceId: form.guidbookReferenceId,
              introduction: form.introduction,
              minParticipants: form.minParticipants,
              maxParticipants: form.maxParticipants,
              hostDescription: form.hostDescription,
              recruitingStartTime: format(
                form.recruitingStartTime as Date,
                "yyyy-MM-dd'T'HH:mm:ss",
              ),
              recruitingEndTime: format(
                form.recruitingEndTime as Date,
                "yyyy-MM-dd'T'HH:mm:ss",
              ),
              paymentAmount: form.paymentAmount,
              info: form.info,
              schedules: form.schedules,
            }),
          ],
          { type: 'application/json' },
        ),
      );

      return axiosInstance({
        baseURL: API_V1_BASE_URL,
        method: 'POST',
        url: '/meetings',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    },
    onSuccess: () => {
      toast.success('모임 개설을 완료하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });

  const onSubmit = () => {
    if (isPending) return;
    createMeeting(form);

    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="h-[300px] w-full overflow-y-scroll">
        <div className="flex w-full items-center justify-between">
          <div className="rounded-lg bg-gray-200 p-2 text-b3 text-gray-600">
            📢 ‘일정 등록하기’ 버튼을 눌러 추가 일정을 등록할 수 있어요.
          </div>

          <Button
            type="button"
            size="sm"
            className="px-5"
            onClick={() => {
              const newSchedule = {
                meetingDate: '',
                meetingStartTime: '',
                meetingEndTime: '',
                address: '',
                addressDetail: '',
              };

              append(newSchedule);
              setForm({ ...form, schedules: [...form.schedules, newSchedule] });
            }}
          >
            <img src="/images/icons/w_plus.svg" alt="plus_icon" />
            일정 등록하기
          </Button>
        </div>

        <div className="w-full">
          {fields.map((field, idx) => (
            <Accordion
              key={field.id}
              type="single"
              collapsible
              className="mt-5 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5"
            >
              <AccordionItem
                value="item-1"
                className="border-b-1 border-gray-400"
              >
                <AccordionTrigger className="pt-0">
                  <Text
                    variant="T2_Semibold"
                    color="gray-900"
                    className="text-left"
                  >
                    {idx + 1}일차 일정
                  </Text>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mb-5 w-full">
                    <label htmlFor="meetingDate" className="text-b1">
                      일정
                    </label>
                    <Controller
                      name={`schedules.${idx}.meetingDate`}
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            setForm({
                              ...form,
                              schedules: form.schedules.map(
                                (schedule, index) =>
                                  index === idx
                                    ? {
                                        ...schedule,
                                        meetingDate: e,
                                      }
                                    : schedule,
                              ),
                            });
                          }}
                          placeholder="YYYY.MM.DD"
                          className="mt-2 w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-2 mb-5 w-full">
                    <label htmlFor="meetingTime" className="text-b1">
                      시간 선택
                    </label>
                    <div className="mt-2 flex w-full items-center gap-2">
                      <Controller
                        name={`schedules.${idx}.meetingStartTime`}
                        control={control}
                        render={({ field }) => (
                          <TimeInput
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setForm({
                                ...form,
                                schedules: form.schedules.map(
                                  (schedule, index) =>
                                    index === idx
                                      ? {
                                          ...schedule,
                                          meetingStartTime: e,
                                        }
                                      : schedule,
                                ),
                              });
                            }}
                            placeholder="00:00"
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
                            onChange={(e) => {
                              field.onChange(e);
                              setForm({
                                ...form,
                                schedules: form.schedules.map(
                                  (schedule, index) =>
                                    index === idx
                                      ? {
                                          ...schedule,
                                          meetingEndTime: e,
                                        }
                                      : schedule,
                                ),
                              });
                            }}
                            placeholder="00:00"
                            className="w-full"
                            format12Hour={true}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-5 w-full">
                    <label htmlFor="address" className="text-b1">
                      모임 장소
                    </label>
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
                                setForm({
                                  ...form,
                                  schedules: form.schedules.map(
                                    (schedule, index) =>
                                      index === idx
                                        ? {
                                            ...schedule,
                                            address: address,
                                            addressDetail: addressDetail,
                                          }
                                        : schedule,
                                  ),
                                });
                              }}
                              placeholder="장소를 선택해주세요."
                              className="mt-2 w-full"
                            />
                          )}
                        />
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      remove(idx);
                      setForm({
                        ...form,
                        schedules: form.schedules.filter(
                          (_, index) => index !== idx,
                        ),
                      });
                    }}
                  >
                    삭제
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
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
          완료
        </Button>
      </div>
    </form>
  );
}
