import type { Review } from '@/types/entities';
import { DropdownMenuItem } from '../atoms/dropdown-menu/DropdownMenu';
import MoreDropdownMenu from '../organisms/MoreDropdownMenu';
import MeetingReviewEditorProfile from './MeetingReviewEditorProfile';

interface MeetingReviewCardHeaderProps {
  review: Review;
  edit: {
    isActive: boolean;
    id: number | null;
  };
  onEditMeetingReview: () => void;
  onDeleteMeetingReview: () => void;
  onDeclareMeetingReview: () => void;
}

export default function MeetingReviewCardHeader({
  review,
  edit,
  onEditMeetingReview,
  onDeleteMeetingReview,
  onDeclareMeetingReview,
}: MeetingReviewCardHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <MeetingReviewEditorProfile
        profileImg={review.profileImg}
        nickname={review.nickname}
        createdAt={review.createdAt}
      />

      {review.reviewId !== edit.id && (
        <MoreDropdownMenu>
          {review.myReview ? (
            <>
              <DropdownMenuItem onSelect={onEditMeetingReview}>
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={onDeleteMeetingReview}>
                삭제하기
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onSelect={onDeclareMeetingReview}>
              신고하기
            </DropdownMenuItem>
          )}
        </MoreDropdownMenu>
      )}
    </div>
  );
}
