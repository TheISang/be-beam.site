// 현재 smart 패턴 컴포넌트로 동작. 후에 smart 컴포넌트를 분리시킬지 고민(dumb 디렉토리에 위치)

import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';
import { readFileAsBase64 } from '@/utils/file';
import { useModalStore } from '@/stores/useModalStore';
import toast from 'react-hot-toast';

import type { Review } from '@/types/entities';
import MeetingReviewCardHeader from '../molecules/MeetingReviewCardHeader';
import { Button } from '../atoms/button/Button';
import MeetingReviewEditForm from './MeetingReviewEditForm';
import MeetingReviewContent from './MeetingReviewContent';

interface EditType {
  isActive: boolean;
  id: number | null;
}

export interface EditDataType {
  rating: number;
  text: string;
  existingImages: string[];
}

export default function MeetingReviewCard({
  review,
  meetingReviewList,
}: {
  review: Review;
  meetingReviewList: Review[];
}) {
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

  const isMyMeetingReviewEdit = edit.isActive && review.reviewId === edit.id;

  useEffect(() => {
    if (edit.isActive && review.reviewId === edit.id) {
      const origin = meetingReviewList.find((r) => r.reviewId === edit.id);
      if (origin) {
        setEditData({
          rating: origin.rating,
          text: origin.text,
          existingImages: origin.images,
        });
        setTotalEditImages(origin.images);
      }
    }
  }, [edit, review.reviewId, meetingReviewList]);

  // 나중에 코드 하나로 합치기(리뷰 좋아요/좋아요 취소 코드)
  const queryClient = useQueryClient();
  const { mutate: likeMeetingReview, isPending } = useMutation({
    mutationFn: () => {
      return axiosInstance({
        baseURL: API_V1_BASE_URL,
        url: `/reviews/${review.reviewId}/like`,
        method: review.liked ? 'DELETE' : 'POST',
      });
    },
    onSuccess: () => {
      toast.success(
        review.liked
          ? '해당 모임 후기의 좋아요를 취소하였습니다.'
          : '해당 모임 후기의 좋아요를 눌렀습니다.',
      );
      queryClient.invalidateQueries({ queryKey: ['meetingReviews'] });
    },
    onError: (err) => {
      toast.error(
        `${review.liked ? '해당 모임 후기의 좋아요 취소' : '해당 모임 후기의 좋아요'}를 실패하였습니다. 다시 시도해주세요.`,
      );
      console.error('Failed to follow host:', err);
    },
  });

  return (
    <div
      key={review.reviewId}
      className="mb-4 w-full rounded-2xl border-1 border-gray-300 p-8"
    >
      <MeetingReviewCardHeader
        edit={edit}
        review={review}
        onEditMeetingReview={() => {
          setEdit({ isActive: true, id: review.reviewId });
        }}
        onDeleteMeetingReview={() => console.log('삭제')}
        onDeclareMeetingReview={() => {
          if (!user) {
            toast('로그인 후 다시 시도해주세요.');
          } else {
            open('DECLARE_MODAL', {
              type: 'review',
              id: review.reviewId,
              refetchKey: 'meetingReviews',
            });
          }
        }}
      />

      <div className="mt-4 w-full">
        {isMyMeetingReviewEdit ? (
          <MeetingReviewEditForm
            rating={review.rating}
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
          <MeetingReviewContent review={review} />
        )}
      </div>

      <Button
        variant="tertiary"
        className="mt-8 h-10 min-w-31 rounded-full border-gray-300 text-t4 text-gray-500"
        onClick={() => {
          if (!user) {
            toast('로그인 후 다시 시도해주세요.');
          } else {
            if (isPending) return;
            likeMeetingReview();
          }
        }}
      >
        <img
          className="h-6 w-6"
          src={
            review.liked
              ? '/images/icons/fill_like.svg'
              : '/images/icons/like.svg'
          }
          alt="like_icon"
        />
        좋아요 | {review.likesCount}
      </Button>
    </div>
  );
}
