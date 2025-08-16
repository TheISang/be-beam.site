import { Button } from '@/shared/components/ui/Button';
import { Textarea } from '@/shared/components/ui/Textarea';
import RatingInput from '@/shared/components/common/RatingInput';
import { ImageInput } from '@/shared/components/common/ImageInput';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReviewSchema } from '@/features/reviews/schemas/reviews';
import MeetingTypeTag from '@/features/meetings/components/MeetingTypeTag';

type MeetingType = '정기모임' | '소모임';

type ReviewFormProps = {
  meeting: {
    id: string | number;
    type: MeetingType;
    title: string;
    image: string;
  };
  onReviewSubmit: (review: {
    rating: number;
    content: string;
    images: File[];
  }) => void;
  defaultValues?: z.infer<typeof createReviewSchema>;
};

export function ReviewForm({
  meeting,
  onReviewSubmit,
  defaultValues,
}: ReviewFormProps) {
  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof createReviewSchema>
  >({
    resolver: zodResolver(createReviewSchema),
    defaultValues: defaultValues || {
      rating: 0,
      content: '',
      images: [],
    },
  });

  const onSubmit = (data: z.infer<typeof createReviewSchema>) => {
    onReviewSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <MeetingTypeTag type={meeting.type} />
        <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
          <img
            src={meeting.image}
            alt=""
            width={60}
            height={60}
            className="aspect-square size-15 rounded-lg object-cover"
          />
          <p className="text-t3 text-gray-600">`{meeting.title}` 모임</p>
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
        <p className="text text-t2">사진으로 남기고 싶은 장면이 있었나요?</p>
        <Controller
          name="images"
          control={control}
          render={({ field, fieldState }) => (
            <ImageInput
              maxImages={10}
              newImages={field.value || []}
              onChange={(data) => field.onChange(data)}
              error={fieldState.error?.message}
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
          {defaultValues ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </form>
  );
}
