import type { meetingReviewFilterType } from '@/routes/meetingDetail/_components/MeetingDetailMeetingReviewsContainer';
import { API_V2_BASE_URL } from '@/shared/constants/api';
import { axiosInstance } from '@/shared/api/axios';
import type { APIResponse, CursorPaginationResult } from '@/shared/types/api';
import type { Meeting, Review } from '@/shared/types/entities';
import { type AxiosRequestConfig } from 'axios';

export type MeetingReviewsResult = {
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
    };
  }[];
  pageInfo: CursorPaginationResult;
};

// TODO: params를 별도의 타입으로 분리 필요
export const getMeetingReviews = async (
  meetingId: number,
  filters: meetingReviewFilterType,
  pageParam: number = 0,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const res = await axiosInstance<APIResponse<MeetingReviewsResult>>({
    baseURL: API_V2_BASE_URL,
    method: 'GET',
    url: `/meetings/${meetingId}/reviews?sort=${filters.sort}&type=${filters.type}&rating=${filters.rating}&&cursor=${pageParam}&size=12`,
    ...axiosRequestConfig,
  });
  const data = res.data;
  return data.result;
};
