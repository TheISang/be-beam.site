import ThreeDotHorizontalIcon from '../../../shared/components/icons/ThreeDotHorizontalIcon';
import StarIcon from '../../../shared/components/icons/StarIcon';
import { Link } from 'react-router';
import ArrowRightIcon from '../../../shared/components/icons/ArrowRightIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/DropdownMenu';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../shared/components/ui/Dialog';
import useReportComplaintMutation from '@/features/report/hooks/useReportComplaintMutation';
import ReportForm from '../../../features/report/components/ReportForm';
import { ReviewUpdateForm } from '../../../features/reviews/components/ReviewUpdateForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../shared/components/ui/AlertDialog';
import useUpdateReviewMutation from '@/features/reviews/hooks/useUpdateReviewMutation';
import useDeleteReviewMutation from '@/features/reviews/hooks/useDeleteReviewMutation';
import { ImageViewerModal } from '../../../shared/components/common/ImageViewerModal';
import ReviewLikeButton from '@/features/reviews/components/ReviewLikeButton';

interface WideReviewCardProps {
  reviewId: number;
  profileImg: string;
  nickname: string;
  rating: number;
  text: string;
  images: string[];
  createdAt: string;
  likesCount: number;
  liked: boolean;
  myReview: boolean;
  meeting: {
    id: number;
    name: string;
    recruitmentType: '정기모임' | '소모임';
    image: string;
  };
}

const MAX_IMAGES_DISPLAY = 4;

export default function WideReviewCard({
  review,
}: {
  review: WideReviewCardProps;
}) {
  const updateReviewMutation = useUpdateReviewMutation();
  const deleteReviewMutation = useDeleteReviewMutation();
  const reportComplaintMutation = useReportComplaintMutation();
  const [modalState, setModalState] = useState<
    'update' | 'delete' | 'report' | null
  >(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const hasMoreImages = review.images.length > MAX_IMAGES_DISPLAY;

  const displayImages = review.images.slice(0, MAX_IMAGES_DISPLAY);

  return (
    <>
      <div className="rounded-2xl border border-gray-300 px-[37px] pt-8 pb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4.5">
            <img
              src={review.profileImg}
              alt="user"
              className="size-10 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-b2">{review.nickname}</p>
              <time className="text-c2 text-gray-600">
                {new Date(review.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ThreeDotHorizontalIcon className="size-6 text-black" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {review.myReview ? (
                  <>
                    <DropdownMenuItem onSelect={() => setModalState('update')}>
                      수정하기
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setModalState('delete')}>
                      삭제하기
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={() => setModalState('report')}>
                    신고하기
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {Array.from({ length: review.rating }, (_, i) => i + 1).map((i) => (
            <StarIcon key={i} className="size-6 text-gray-700" />
          ))}
        </div>
        <div className="mt-5.5">
          <p className="text-b3 text-gray-600">{review.text}</p>
        </div>

        {review.images.length > 0 && (
          <div className="mt-5.5">
            <div className="flex max-w-[840px] flex-wrap gap-2">
              {displayImages.map((image, index) => {
                const isLastImage = index === MAX_IMAGES_DISPLAY - 1;
                const shouldShowOverlay = hasMoreImages && isLastImage;

                return (
                  <div
                    key={image + review.reviewId + index}
                    className="relative"
                  >
                    <img
                      src={image}
                      alt="review"
                      className={`size-37 shrink-0 cursor-pointer rounded-lg object-cover`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                    {shouldShowOverlay && (
                      <div
                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/50"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <span className="text-b1 text-white">사진 더 보기</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            to={`/meeting/${review.meeting.id}`}
            className="flex items-center gap-1 text-t3 text-gray-600"
          >
            <p>`{review.meeting.name}` 모임 보러가기</p>
            <ArrowRightIcon className="size-6" />
          </Link>
        </div>
        <div className="mt-8">
          <ReviewLikeButton
            reviewId={review.reviewId}
            liked={review.liked}
            likesCount={review.likesCount}
          />
        </div>
      </div>
      <Dialog
        open={modalState === 'update'}
        onOpenChange={() => setModalState(null)}
      >
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>후기 작성</DialogTitle>
            <DialogDescription className="sr-only">
              후기 작성하기
            </DialogDescription>
          </DialogHeader>
          <ReviewUpdateForm
            meeting={review.meeting}
            onReviewSubmit={(review) => {
              updateReviewMutation.mutate(
                {
                  reviewId: review.id,
                  data: {
                    rating: review.rating,
                    content: review.content,
                    existingImages: review.existingImages,
                    newImages: review.newImages,
                  },
                },
                {
                  onSuccess: () => {
                    setModalState(null);
                  },
                },
              );
            }}
            defaultValues={{
              rating: review.rating,
              content: review.text,
              images: {
                existingImages: review.images,
                newImages: [],
              },
              id: review.reviewId,
            }}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={modalState === 'delete'}
        onOpenChange={() => setModalState(null)}
      >
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
                deleteReviewMutation.mutate(
                  { reviewId: review.reviewId },
                  {
                    onSuccess: () => {
                      setModalState(null);
                    },
                  },
                )
              }
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={modalState === 'report'}
        onOpenChange={() => setModalState(null)}
      >
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>신고하기</DialogTitle>
            <DialogDescription className="sr-only">
              신고 이유를 입력하고 리뷰를 신고할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <ReportForm
            onSubmit={(data) => {
              reportComplaintMutation.mutate(
                {
                  targetType: 'REVIEW',
                  complaintId: review.reviewId,
                  reasonType: data.reason,
                  description: data.message,
                },
                {
                  onSuccess: () => {
                    setModalState(null);
                  },
                },
              );
            }}
          />
        </DialogContent>
      </Dialog>
      <ImageViewerModal
        title="후기 이미지"
        images={review.images}
        initialIndex={selectedImageIndex || 0}
        isOpen={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      />
    </>
  );
}
