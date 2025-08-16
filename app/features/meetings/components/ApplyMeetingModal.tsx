import { useModalStore } from '@/shared/stores/useModalStore';
import useMyInfoQuery from '@/features/users/hooks/useMyInfoQuery';
import useApplyMeetingMutation from '@/features/meetings/hooks/useApplyMeetingMutation';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { applyMeetingSchema } from '@/features/meetings/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Meeting } from '@/shared/types/entities';
import type { MyInfoResult } from '@/shared/api/endpoints/users';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/components/ui/Dialog';
import Text from '../../../shared/components/ui/Text';
import InfoItem from '../../../shared/components/common/InfoItem';
import { Button } from '../../../shared/components/ui/Button';
import { Textarea } from '../../../shared/components/ui/Textarea';
import toast from 'react-hot-toast';

export default function ApplyMeetingModal() {
  const { isOpen, modalProps, close } = useModalStore();
  const meeting = modalProps.meeting as Meeting;

  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof applyMeetingSchema>
  >({
    resolver: zodResolver(applyMeetingSchema),
    defaultValues: {
      joinReason: '',
    },
  });

  const { data: myInfo } = useMyInfoQuery();
  const { mutate: applyMeeting, isPending } = useApplyMeetingMutation(
    meeting.id,
    'meeting',
  );

  function hasAllFields(obj: MyInfoResult) {
    return Object.values(obj).every((value) => {
      return value !== null && value !== undefined && value !== '';
    });
  }

  const onSubmit = (data: z.infer<typeof applyMeetingSchema>) => {
    if (myInfo && hasAllFields(myInfo)) {
      if (isPending) return;
      applyMeeting(data);
    } else {
      toast('개인정보를 전부 채운 후 다시 시도해주세요.');
    }

    reset();
    close();
  };

  const isRegPaymentAmount =
    meeting.recruitmentType === '정기모임' && meeting.paymentAmount !== 0;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="z-99 max-w-[820px]">
        <DialogHeader>
          <DialogTitle className="text-h2">
            {meeting.recruitmentType} 신청하기
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[400px] w-full overflow-y-scroll">
            <div className="mb-8 w-full">
              <Text variant="T2_Semibold" className="mb-3">
                모임 정보
              </Text>

              <div className="box-border flex w-full items-center gap-4 rounded-lg border-1 border-gray-300 px-5 py-6">
                <img
                  className="h-25 w-25 rounded-lg object-cover"
                  src={meeting.meetingImages[0]}
                  alt="meeting_thumbnail"
                />
                <div className="flex-1 text-b3">
                  <Text className="mb-2 text-t2">{meeting.introduction}</Text>
                  <InfoItem
                    icon="/images/icons/location.svg"
                    iconAlt="location_icon"
                    text={meeting.address}
                    iconStyle="mr-2"
                    wrapStyle="mb-1"
                  />
                  <InfoItem
                    icon="/images/icons/clock.svg"
                    iconAlt="clock_icon"
                    text={meeting.schedules[0].meetingStartTime.slice(0, 10)}
                    iconStyle="mr-2"
                  />
                </div>
              </div>
            </div>

            {isRegPaymentAmount && (
              <div className="mb-8 w-full">
                <Text variant="T2_Semibold" className="mb-3">
                  결제 정보
                </Text>

                <div className="box-border flex w-full items-center justify-between rounded-lg border-1 border-gray-300 px-5 py-6 text-gray-700">
                  <Text>무통장입금 안내</Text>
                  <div className="flex items-center gap-3">
                    <Text>토스뱅크</Text>
                    <Text>1000-5552-9626 (비빔모임용_김성원)</Text>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8 w-full">
              <Controller
                name="joinReason"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="신청 사유"
                    labelClassName="text-t2 mb-3"
                    maxLength={500}
                    placeholder="참여 사유를 입력해주세요."
                    value={field.value}
                    onChange={field.onChange}
                    className="h-[144px]"
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="tertiary"
              className="border-gray-500"
              onClick={() => {
                reset();
                close();
                toast('모임 참여 신청을 취소하였습니다.');
              }}
            >
              취소
            </Button>
            <Button disabled={!formState.isValid}>신청하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
