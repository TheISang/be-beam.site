import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';
import type {
  ImageType,
  Meeting,
  MeetingSchedule,
  Review,
} from '@/types/entities';

export type ApplicationMeetingListParams = {
  page: number;
  size: number;
  status: 'pending' | 'approved' | 'rejected';
};

export type ApplicationMeetingListResult = {
  status: 'pending' | 'approved' | 'rejected';
  meetings: {
    id: Meeting['id'];
    name: Meeting['name'];
    recruitmentStatus: Meeting['recruitmentStatus'];
    recruitmentType: Meeting['recruitmentType'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: Meeting['address'];
    image: ImageType;
    liked: Meeting['liked'];
  };
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getApplicationMeetingList = async ({
  page,
  size,
  status,
}: ApplicationMeetingListParams) => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    status,
  });
  const res = await axiosInstance.get<
    APIResponse<ApplicationMeetingListResult>
  >(`/mypage/meetings/applications?${searchParams.toString()}`);
  const data = res.data;
  return data.result;
};

export type MyReviewListParams = {
  written: boolean;
};

export type MyReviewListWrittenResult = {
  written: true;
  reviews: {
    reviewId: Review['reviewId'];
    recruitmentType: Meeting['recruitmentType'];
    meetingName: Meeting['name'];
    thumbnailUrl: ImageType;
    rating: Review['rating'];
    content: Review['text'];
    images: Review['images'];
    createdAt: Review['createdAt'];
  };
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export type MyReviewListReviewableResult = {
  written: false;
  reviews: {
    reviewId: Review['reviewId'];
    recruitmentType: Meeting['recruitmentType'];
    meetingName: Meeting['name'];
    thumbnailUrl: ImageType;
  };
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export type MyReviewListResult =
  | MyReviewListWrittenResult
  | MyReviewListReviewableResult;

export const getMyReviewList = async ({ written }: MyReviewListParams) => {
  const searchParams = new URLSearchParams({
    written: written.toString(),
  });
  const res = await axiosInstance.get<APIResponse<MyReviewListResult>>(
    `/mypage/reviews?${searchParams.toString()}`,
  );
  const data = res.data;
  return data.result;
};
