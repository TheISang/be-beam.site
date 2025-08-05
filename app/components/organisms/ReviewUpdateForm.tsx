import { Button } from '@/components/atoms/button/Button';
import { Tag } from '@/components/atoms/tag/Tag';
import { Textarea } from '@/components/atoms/textarea/Textarea';
import RatingInput from '@/components/molecules/RatingInput';
import { ImageInput } from '@/components/molecules/ImageInput';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateReviewSchema } from '@/schemas/reviews';

type ReviewUpdateFormProps = {
  meeting: {
    id: string | number;
    recruitmentType: '정기모임' | '소모임';
    name: string;
    image: string;
  };
  onReviewSubmit: (review: {
    rating: number;
    content: string;
    existingImages: string[];
    newImages: File[];
    id: number;
  }) => void;
  defaultValues?: Pick<
    z.infer<typeof updateReviewSchema>,
    'rating' | 'content' | 'existingImages' | 'id'
  >;
};

export function ReviewUpdateForm({
  meeting,
  onReviewSubmit,
  defaultValues,
}: ReviewUpdateFormProps) {
  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof updateReviewSchema>
  >({
    resolver: zodResolver(updateReviewSchema),
    defaultValues: {
      rating: defaultValues?.rating || 0,
      content: defaultValues?.content || '',
      existingImages: defaultValues?.existingImages || [],
      newImages: [],
      id: defaultValues?.id || 0,
    },
  });

  const onSubmit = (data: z.infer<typeof updateReviewSchema>) => {
    console.log('onSubmit', data);
    onReviewSubmit({
      rating: data.rating,
      content: data.content,
      existingImages: data.existingImages,
      newImages: data.newImages || [],
      id: data.id,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <Tag
          variant={meeting.recruitmentType === '정기모임' ? 'blue' : 'primary'}
        >
          {meeting.recruitmentType}
        </Tag>
        <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
          <img
            src={meeting.image}
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
        <p className="text text-t2">사진으로 남기고 싶은 장면이 있었나요?</p>
        <Controller
          name="existingImages"
          control={control}
          render={({ field }) => (
            <Controller
              name="newImages"
              control={control}
              render={({ field: newImagesField }) => {
                return (
                  <ImageInput
                    existingImages={field.value}
                    onChangeExistingImages={field.onChange}
                    images={newImagesField.value}
                    onImagesChange={newImagesField.onChange}
                    maxImages={10}
                  />
                );
              }}
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
