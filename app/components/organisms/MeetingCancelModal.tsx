import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { cancelMeetingReasonSchema } from '@/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/stores/useModalStore';
import useCancelMeetingMutation from '@/hooks/api/useCancelMeetingMutation';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../atoms/dialog/Dialog';
import { Button } from '../atoms/button/Button';
import { Label } from '../atoms/label/Label';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group/RadioGroup';
import Text from '../atoms/text/Text';
import { Textarea } from '../atoms/textarea/Textarea';
import toast from 'react-hot-toast';

export default function MeetingCancelModal() {
  const radioList = [
    {
      id: 'personalSchedule',
      value: '개인일정',
      label: '갑작스러운 개인 일정',
    },
    {
      id: 'changeMind',
      value: '단순변심',
      label: '단순 변심',
    },
    {
      id: 'locationNonconformity',
      value: '위치',
      label: '장소가 너무 멀거나 불편함',
    },
    {
      id: 'etc',
      value: '기타',
      label: '기타',
    },
  ];

  const { isOpen, modalProps, close } = useModalStore();

  const { mutate: cancelMeeting, isPending } = useCancelMeetingMutation(
    modalProps.meetingId as number,
    modalProps.refetchKey as string,
    modalProps.statusType as 'participating' | 'applied',
  );

  const onSubmit = (data: z.infer<typeof cancelMeetingReasonSchema>) => {
    if (isPending) return;
    cancelMeeting(data);

    reset();
    close();
  };

  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof cancelMeetingReasonSchema>
  >({
    resolver: zodResolver(cancelMeetingReasonSchema),
    defaultValues: {
      cancellationReasonType: '개인일정',
      cancelReason: '',
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-t2">
            {modalProps.statusType === 'participating'
              ? '모임 중도 이탈 신청하기'
              : '모임 신청 취소하기'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 w-full">
            <Text variant="T3_Semibold" className="mb-4">
              {modalProps.statusType === 'participating'
                ? '중도 이탈 사유'
                : '신청 취소 사유'}
              를 선택해 주세요.
            </Text>

            <Controller
              name="cancellationReasonType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="gap-4"
                >
                  {radioList.map((option) => (
                    <div
                      key={option.id}
                      className="mb-1 flex items-center gap-3"
                    >
                      <RadioGroupItem
                        id={option.id}
                        value={option.value}
                        className="cursor-pointer"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={option.id}
                          className="cursor-pointer text-b1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          <div className="mt-5 w-full">
            <Text variant="T3_Semibold">
              {modalProps.statusType === 'participating'
                ? '중도 이탈 사유'
                : '취소 사유'}
              를 자유롭게 작성해 주세요.
            </Text>
            <Controller
              name="cancelReason"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="text"
                  className="mt-3 h-[144px] w-[430px]"
                  {...field}
                  maxLength={100}
                />
              )}
            />
          </div>

          <DialogFooter className="mt-6 flex w-full items-center gap-4">
            <Button
              type="button"
              onClick={() => {
                reset();
                close();
                toast(
                  modalProps.statusType === 'participating'
                    ? '모임 중도 이탈 신청을 취소하였습니다.'
                    : '모임 취소 신청을 취소하였습니다.',
                );
              }}
              variant="tertiary"
              size="sm"
              className="border-gray-500 text-gray-600"
            >
              취소
            </Button>
            <Button disabled={!formState.isValid} className="flex-1">
              {modalProps.statusType === 'participating'
                ? ' 중도 이탈 신청하기'
                : '신청 취소하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
