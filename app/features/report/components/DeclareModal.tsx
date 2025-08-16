import { useModalStore } from '@/shared/stores/useModalStore';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { declareReasonSchema } from '@/features/meetings/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/components/ui/Dialog';
import { Button } from '../../../shared/components/ui/Button';
import toast from 'react-hot-toast';
import Text from '../../../shared/components/ui/Text';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../shared/components/ui/RadioGroup';
import { Label } from '../../../shared/components/ui/Label';
import { Textarea } from '../../../shared/components/ui/Textarea';
import useDeclareMeetingOrReviewOrHost from '@/features/report/hooks/useDeclareMeetingOrReviewOrHost';

export default function DeclareModal() {
  const { isOpen, modalProps, close } = useModalStore();

  const radioList = [
    {
      id: 'ADVERTISEMENT',
      value: 'ADVERTISEMENT',
      label: '불법 광고',
    },
    {
      id: 'SEXUAL',
      value: 'SEXUAL',
      label: '음란성/선정성',
    },
    {
      id: 'PERSONAL_ATTACKS',
      value: 'PERSONAL_ATTACKS',
      label: '욕설/인신공격',
    },
    {
      id: 'COMMERCIAL',
      value: 'COMMERCIAL',
      label: '영리목적',
    },
    {
      id: 'SPAM',
      value: 'SPAM',
      label: '도배성 글',
    },
    {
      id: 'SPYWARE',
      value: 'SPYWARE',
      label: '악성 코드/스파이웨어',
    },
    {
      id: 'PRIVACY_VIOLATION',
      value: 'PRIVACY_VIOLATION',
      label: '개인정보 노출/사생활 침해',
    },
    {
      id: 'OTHER',
      value: 'OTHER',
      label: '기타',
    },
  ];

  const { mutate: declareMutate, isPending } = useDeclareMeetingOrReviewOrHost(
    modalProps as {
      id: number;
      type: 'meeting' | 'review' | 'host';
      refetchKey: string;
    },
  );

  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof declareReasonSchema>
  >({
    resolver: zodResolver(declareReasonSchema),
    defaultValues: {
      reasonType: 'ADVERTISEMENT',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof declareReasonSchema>) {
    if (isPending) return;
    declareMutate(data);

    reset();
    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-t2">
            {`${
              modalProps.type === 'meeting'
                ? '모임'
                : modalProps.type === 'review'
                  ? '모임 후기'
                  : '호스트'
            } 신고하기`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[400px] overflow-y-scroll">
            <div className="mt-5 w-full">
              <Text variant="T3_Semibold" className="mb-4">
                신고 사유를 선택해 주세요
              </Text>

              <Controller
                name="reasonType"
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
                            className="cursor-pointer text-b3"
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
                신고 사유를 자유롭게 작성해 주세요.
              </Text>
              <Controller
                name="description"
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
          </div>

          <DialogFooter className="mt-6 flex w-full items-center gap-4">
            <Button
              type="button"
              onClick={() => {
                close();
                toast(
                  `${modalProps.type === 'meeting' ? '해당 모임' : modalProps.type === 'review' ? '해당 모임 후기' : '해당 호스트'} 신고를 취소하였습니다.`,
                );
              }}
              variant="tertiary"
              size="sm"
              className="w-30 border-gray-500 text-gray-600"
            >
              취소
            </Button>
            <Button disabled={!formState.isValid} className="flex-1">
              {`${modalProps.type === 'meeting' ? '모임' : modalProps.type === 'review' ? '모임 후기' : '호스트'} 신고하기`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
