import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { ImageType, Meeting, Review } from '@/types/entities';

export type getReviewListParams = {
  sort: 'recent' | 'likes';
  type: 'image' | 'text';
  rating: 'all' | '1' | '2' | '3' | '4' | '5';
  recruitmentType: 'all' | 'regular' | 'small';
  cursor: number;
  size: number;
};

export type ReviewListResult = {
  reviews: {
    reviewId: Review['reviewId'];
    profileImg: Review['profileImg'];
    nickname: Review['nickname'];
    rating: Review['rating'];
    text: Review['text'];
    images: Review['images'];
    createdAt: Review['createdAt'];
    likesCount: Review['likesCount'];
    liked: Review['liked'];
    myReview: Review['myReview'];
    meeting: {
      id: Meeting['id'];
      name: Meeting['name'];
      recruitmentType: Meeting['recruitmentType'];
      image: ImageType;
    };
  }[];
  pageInfo: {
    nextCursor: number;
    size: number;
    hasNext: boolean;
  };
};

export const getReviewList = async ({
  sort,
  type,
  rating,
  recruitmentType,
  cursor = 0,
  size = 20,
}: getReviewListParams) => {
  const searchParams = new URLSearchParams({
    sort,
    type,
    rating,
    'recruitment-type': recruitmentType,
    cursor: cursor.toString(),
    size: size.toString(),
  });

  const res = await axiosInstance.get<{
    isSuccess: boolean;
    code: number;
    message: string;
    result: ReviewListResult;
  }>(`/reviews?${searchParams.toString()}`);
  const data = res.data;
  return data.result;
};

export const likeReview = async ({ reviewId }: { reviewId: number }) => {
  await axiosInstance.post<void>(`/reviews/${reviewId}/like`, undefined, {
    baseURL: API_V1_BASE_URL,
  });
};

export const unlikeReview = async ({ reviewId }: { reviewId: number }) => {
  await axiosInstance.delete<void>(`/reviews/${reviewId}/like`, {
    baseURL: API_V1_BASE_URL,
  });
};

export type CreateReviewData = {
  rating: number;
  text: string;
  images: File[];
};

export const createReview = async (
  meetingId: number,
  data: CreateReviewData,
) => {
  console.log('createReview', meetingId, data);
  return;
  // const formData = new FormData();
  // data.images.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: data.rating,
  //   text: data.text,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.post(`/meetings/${meetingId}/reviews`, formData);
  // return;
};

export type UpdateReviewData = {
  rating: number;
  content: string;
  existingImages: string[];
  newImages: File[];
};

export const updateReview = async (
  reviewId: number,
  data: UpdateReviewData,
) => {
  console.log('updateReview', reviewId, data);
  return;
  // const formData = new FormData();
  // data.newImages.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: data.rating,
  //   text: data.content,
  //   existingImages: data.existingImages,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.patch(`/reviews/${reviewId}`, formData);
  // return;
};

export const deleteReview = async ({ reviewId }: { reviewId: number }) => {
  console.log('deleteReview', reviewId);
  return;
  // await axiosInstance.delete(`/reviews/${reviewId}`);
  // return;
};
