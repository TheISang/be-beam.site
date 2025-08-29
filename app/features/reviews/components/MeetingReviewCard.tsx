// 현재 smart 패턴 컴포넌트로 동작. 후에 smart 컴포넌트를 분리시킬지 고민(dumb 디렉토리에 위치)

import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router';
import { readFileAsBase64 } from '@/shared/utils/file';
import { useModalStore } from '@/shared/stores/useModalStore';
import toast from 'react-hot-toast';

import type { Review } from '@/shared/types/entities';
import MeetingReviewCardHeader from './MeetingReviewCardHeader';
import { Button } from '../../../shared/components/ui/Button';
import MeetingReviewEditForm from './MeetingReviewEditForm';
import MeetingReviewContent from './MeetingReviewContent';
import useLikeReviewMutation from '@/features/reviews/hooks/useLikeReviewMutation';
import useUnlikeReviewMutation from '@/features/reviews/hooks/useUnlikeReviewMutation';

interface EditType {
  isActive: boolean;
  id: number | null;
}

export interface EditDataType {
  rating: number;
  text: string;
  existingImages: string[];
}

interface MeetingReviewCardProps {
  reviewId: Review['reviewId'];
  rating: Review['rating'];
  text: Review['text'];
  images: Review['images'];
  liked: Review['liked'];
  likesCount: Review['likesCount'];
  profileImg: Review['profileImg'];
  nickname: Review['nickname'];
  createdAt: Review['createdAt'];
  myReview: Review['myReview'];
}

export default function MeetingReviewCard({
  reviewId,
  rating,
  text,
  images,
  liked,
  likesCount,
  profileImg,
  nickname,
  createdAt,
  myReview,
}: MeetingReviewCardProps) {
  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;

  const { open } = useModalStore();

  const [edit, setEdit] = useState<EditType>({ isActive: false, id: null });
  const [editData, setEditData] = useState<EditDataType>({
    rating: 0,
    text: '',
    existingImages: [],
  });
  const [totalEditImages, setTotalEditImages] = useState<string[]>([]);

  const isMyMeetingReviewEdit = edit.isActive && reviewId === edit.id;

  useEffect(() => {
    if (edit.isActive && reviewId === edit.id) {
      setEditData({
        rating: rating,
        text: text,
        existingImages: images,
      });
      setTotalEditImages(images);
    }
  }, [edit, reviewId, rating, text, images]);

  // 나중에 코드 하나로 합치기(리뷰 좋아요/좋아요 취소 코드)
  const { mutate: likeReview, isPending: likeReviewPending } =
    useLikeReviewMutation();
  const { mutate: unlikeReview, isPending: unlikeReviewPending } =
    useUnlikeReviewMutation();

  const handleLikeReview = () => {
    if (!user) {
      return alert('로그인 후 이용해주세요.');
    }
    if (likeReviewPending || unlikeReviewPending) return;
    if (liked) {
      unlikeReview({ reviewId: reviewId });
    } else {
      likeReview({ reviewId: reviewId });
    }
  };

  return (
    <div
      key={reviewId}
      className="mb-4 w-full rounded-2xl border-1 border-gray-300 p-8"
    >
      <MeetingReviewCardHeader
        edit={edit}
        review={{
          reviewId,
          profileImg,
          nickname,
          createdAt,
          myReview,
        }}
        onEditMeetingReview={() => {
          setEdit({ isActive: true, id: reviewId });
        }}
        onDeleteMeetingReview={() => console.log('삭제')}
        onDeclareMeetingReview={() => {
          if (!user) {
            toast('로그인 후 다시 시도해주세요.');
          } else {
            open('DECLARE_MODAL', {
              type: 'review',
              id: reviewId,
              refetchKey: 'meetingReviews',
            });
          }
        }}
      />

      <div className="mt-4 w-full">
        {isMyMeetingReviewEdit ? (
          <MeetingReviewEditForm
            rating={rating}
            text={editData.text}
            totalEditImages={totalEditImages}
            onRatingChange={(value) => {
              setEditData((prev) => ({ ...prev, rating: value }));
            }}
            onTextChange={(e) =>
              setEditData((prev) => ({ ...prev, text: e.target.value }))
            }
            onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (totalEditImages.length < 10) {
                if (!e.target.files) return;

                const files = Array.from(e.target.files).slice(
                  0,
                  10 - totalEditImages.length,
                );

                Promise.all(files.map(readFileAsBase64)).then(
                  (base64Images) => {
                    setTotalEditImages((prev) => [...prev, ...base64Images]);
                  },
                );

                e.target.value = '';
              }
            }}
            onCancelEditMeetigReview={() =>
              setEdit({ isActive: false, id: null })
            }
            setEditData={setEditData}
            setTotalEditImages={setTotalEditImages}
          />
        ) : (
          <MeetingReviewContent rating={rating} images={images} text={text} />
        )}
      </div>

      <Button
        variant="outline"
        className="mt-8 h-10 min-w-31 rounded-full border-gray-300 text-t4 text-gray-500"
        onClick={handleLikeReview}
      >
        <img
          className="h-6 w-6"
          src={liked ? '/images/icons/fill_like.svg' : '/images/icons/like.svg'}
          alt="like_icon"
        />
        좋아요 | {likesCount}
      </Button>
    </div>
  );
}
