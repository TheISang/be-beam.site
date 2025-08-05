import { useState } from 'react';
import { Button } from '../atoms/button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../atoms/dialog/Dialog';
import StarIcon from '../atoms/icons/StarIcon';
import useUpdateReviewMutation from '@/hooks/api/useUpdateReviewMutation';
import { ReviewUpdateForm } from './ReviewUpdateForm';
import MeetingTypeTag from '../atoms/MeetingTypeTag';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../atoms/alert-dialog/AlertDialog';
import useDeleteReviewMutation from '@/hooks/api/useDeleteReviewMutation';

interface WrittenReviewCardProps {
  review: {
    id: number;
    content: string;
    rating: number;
    images: string[];
    meeting: {
      name: string;
      id: number;
      recruitmentType: '정기모임' | '소모임';
      image: string;
    };
    createdAt: string;
  };
}

const MAX_IMAGES_DISPLAY = 3;

export default function WrittenReviewCard({ review }: WrittenReviewCardProps) {
  const updateReviewMutation = useUpdateReviewMutation();
  const deleteReviewMutation = useDeleteReviewMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleReviewSubmit = (review: {
    rating: number;
    content: string;
    existingImages: string[];
    newImages: File[];
    id: number;
  }) => {
    updateReviewMutation.mutate({
      reviewId: review.id,
      data: {
        rating: review.rating,
        content: review.content,
        existingImages: review.existingImages,
        newImages: review.newImages,
      },
    });
    setIsOpen(false);
  };

  const hasMoreImages = review.images.length > MAX_IMAGES_DISPLAY;

  return (
    <div className="rounded-2xl border border-gray-300 px-7 pt-7 pb-6 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]">
      <div>
        <MeetingTypeTag type={review.meeting.recruitmentType} />
        <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
          <img
            src={review.meeting.image}
            alt=""
            width={60}
            height={60}
            className="aspect-square size-15 rounded-lg object-cover"
          />
          <p className="text-t3 text-gray-600">
            {`${review.meeting.name} 모임`}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5">
        <div className="flex">
          {Array.from({ length: review.rating }, (_, index) => (
            <StarIcon key={index} className="size-6 text-gray-700" />
          ))}
        </div>
        <p className="text-b1 text-gray-600">{review.content}</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {review.images.slice(0, MAX_IMAGES_DISPLAY).map((image, index) => {
          const isLastImage = index === MAX_IMAGES_DISPLAY - 1;
          const shouldShowOverlay = hasMoreImages && isLastImage;
          return (
            <div className="relative" key={`${review.id}-img-${index}`}>
              <img
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className="aspect-square rounded-lg object-cover"
              />
              {shouldShowOverlay && (
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/50">
                  <span className="text-b1 text-white">더보기</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-2.5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="tertiary" className="flex-1">
              수정
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>후기 작성</DialogTitle>
              <DialogDescription className="sr-only">
                후기 작성하기
              </DialogDescription>
            </DialogHeader>
            <ReviewUpdateForm
              meeting={review.meeting}
              onReviewSubmit={handleReviewSubmit}
              defaultValues={{
                rating: review.rating,
                content: review.content,
                existingImages: review.images,
                id: review.id,
              }}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="tertiary" className="flex-1">
              삭제
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>후기를 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                후기를 삭제하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteReviewMutation.mutate({ reviewId: review.id })
                }
              >
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
