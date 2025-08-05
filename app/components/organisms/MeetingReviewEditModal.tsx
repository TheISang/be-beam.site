import { useModalStore } from '@/stores/useModalStore';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReviewSchema } from '@/schemas/reviews';
import useCreateReviewMutation from '@/hooks/api/useCreateReviewMutation';

import type { Meeting } from '@/types/entities';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../atoms/dialog/Dialog';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '../atoms/textarea/Textarea';
import RatingInput from '../molecules/RatingInput';
import { Tag } from '../atoms/tag/Tag';
import { ImageInput } from '../molecules/ImageInput';
import { Button } from '../atoms/button/Button';

export default function MeetingReviewEditModal() {
  const { isOpen, modalProps, close } = useModalStore();
  const meeting = modalProps.meeting as Meeting;

  const createReviewMutation = useCreateReviewMutation();

  const handleReviewSubmit = (review: {
    rating: number;
    content: string;
    images: File[];
  }) => {
    createReviewMutation.mutate({
      data: {
        rating: review.rating,
        text: review.content,
        images: review.images,
      },
      meetingId: (modalProps.meeting as Meeting).id,
    });
    close();
  };

  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof createReviewSchema>
  >({
    resolver: zodResolver(createReviewSchema),
    defaultValues: modalProps.defaultValues || {
      rating: 0,
      content: '',
      images: [],
    },
  });

  const onSubmit = (data: z.infer<typeof createReviewSchema>) => {
    handleReviewSubmit(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="z-99 max-w-[600px]">
        <DialogHeader>
          <DialogTitle>후기 작성</DialogTitle>
          <DialogDescription className="sr-only">
            후기 작성하기
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Tag
              variant={
                meeting.recruitmentType === '정기모임' ? 'blue' : 'primary'
              }
            >
              {meeting.recruitmentType}
            </Tag>
            <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
              <img
                src={meeting.meetingImages[0]}
                alt=""
                width={60}
                height={60}
                className="size-15 rounded-lg"
              />
              <p className="text-t3 text-gray-600">`{meeting.name}` 모임</p>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-6">
            <p className="text-center text-t2">참여한 모임은 어떠셨나요?</p>
            <div className="mt-5 flex justify-center">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <RatingInput value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 border-b border-gray-300 pb-6">
            <p className="text-center text-t2">어떤점이 좋았나요?</p>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="h-36"
                  maxLength={100}
                  placeholder="이번 모임은 어땠나요? 즐거웠나요?&#10;소중한 경험을 함께 나눠요🥰"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text text-t2">
              사진으로 남기고 싶은 장면이 있었나요?
            </p>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageInput
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={10}
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => handleSubmit(onSubmit)}
              disabled={!formState.isValid}
              className="w-full"
            >
              {modalProps.defaultValues ? '수정 완료' : '작성 완료'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
