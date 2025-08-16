import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../../shared/components/ui/Button';
import { Rating, RatingButton } from '../../../shared/components/ui/Rating';
import Text from '../../../shared/components/ui/Text';
import { Textarea } from '../../../shared/components/ui/Textarea';
import type { EditDataType } from './MeetingReviewCard';

interface MeetingReviewEditFormProps {
  rating: number;
  text: string;
  totalEditImages: string[];
  onRatingChange: (value: number) => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelEditMeetigReview: () => void;
  setEditData: Dispatch<SetStateAction<EditDataType>>;
  setTotalEditImages: (data: string[]) => void;
}

export default function MeetingReviewEditForm({
  rating,
  text,
  totalEditImages,
  onRatingChange,
  onTextChange,
  onFileChange,
  onCancelEditMeetigReview,
  setEditData,
  setTotalEditImages,
}: MeetingReviewEditFormProps) {
  return (
    <div>
      <div className="w-full">
        <Rating
          onValueChange={onRatingChange}
          defaultValue={rating}
          className="gap-0 text-gray-700"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} />
          ))}
        </Rating>
      </div>

      <div className="mt-4 grid w-full grid-cols-6 gap-3">
        {totalEditImages.map((image, idx) => (
          <div key={idx} className="relative">
            <img
              className="aspect-square rounded-lg object-cover"
              src={image}
              alt="edit_review_img"
            />

            <Button
              variant="tertiary"
              className="absolute top-2 right-2 h-6 min-w-6 rounded-full border-none bg-gray-300 p-0 shadow-md"
              onClick={() => {
                setEditData((prev) => ({
                  ...prev,
                  existingImages: prev.existingImages.filter(
                    (_, i) => i !== idx,
                  ),
                }));

                setTotalEditImages(
                  totalEditImages.filter(
                    (image) => image !== totalEditImages[idx],
                  ),
                );
              }}
            >
              <img src="/images/icons/close.svg" alt="close_icon" />
            </Button>
          </div>
        ))}

        <label className="cursor-pointer">
          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500">
            <img src="/images/icons/camera.svg" alt="camera_icon" />
            <Text variant="B3_Regular" color="gray-500" className="mt-2">
              <span className="text-primary">{totalEditImages.length}</span>/ 10
            </Text>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>

      <Textarea value={text} onChange={onTextChange} className="mt-3" />

      <div className="mt-8 flex w-full items-center gap-3">
        <Button>수정하기</Button>
        <Button onClick={onCancelEditMeetigReview}>취소하기</Button>
      </div>
    </div>
  );
}
