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
import StarOutlineIcon from '../atoms/icons/StarOutlineIcon';
import { ReviewForm } from './ReviewForm';
import useCreateReviewMutation from '@/hooks/api/useCreateReviewMutation';
import MeetingTypeTag from '../atoms/MeetingTypeTag';

interface ReviewableMeetingCardProps {
  meeting: {
    id: number;
    title: string;
    type: '정기모임' | '소모임';
    image: string;
  };
}

export default function ReviewableMeetingCard({
  meeting,
}: ReviewableMeetingCardProps) {
  const createReviewMutation = useCreateReviewMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleReviewSubmit = (review: {
    rating: number;
    content: string;
    images: File[];
  }) => {
    createReviewMutation.mutate({
      meetingId: meeting.id,
      data: {
        rating: review.rating,
        text: review.content,
        images: review.images,
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-300 p-5 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]">
      <div className="flex flex-col items-start justify-between gap-3 border-b border-gray-300 pb-4">
        <MeetingTypeTag type={meeting.type} />
        <div className="flex items-center gap-3">
          <img
            src={meeting.image}
            alt=""
            width={60}
            height={60}
            className="aspect-square size-15 rounded-lg border border-gray-200 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-t3 text-gray-600">`{meeting.title}` 모임</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5.5">
        <div className="flex justify-center">
          {Array.from({ length: 5 }, (_, index) => (
            <StarOutlineIcon key={index} className="size-6 text-gray-500" />
          ))}
        </div>
        <p className="text-center text-t4 text-gray-600">
          참여한 모임은 어떠셨나요?
          <br />
          소중한 경험을 함께 나눠요🥰
        </p>
      </div>
      <div className="mt-5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="w-full">
              ✍️후기 작성하기
            </Button>
          </DialogTrigger>
          <DialogContent className="z-99 max-w-[600px]">
            <DialogHeader>
              <DialogTitle>후기 작성</DialogTitle>
              <DialogDescription className="sr-only">
                후기 작성하기
              </DialogDescription>
            </DialogHeader>
            <ReviewForm meeting={meeting} onReviewSubmit={handleReviewSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
