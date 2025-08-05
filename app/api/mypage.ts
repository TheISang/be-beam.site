import { API_V2_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { APIResponse } from '@/types/api';
import type {
  ImageType,
  Meeting,
  MeetingSchedule,
  MeetingSummary,
  Review,
} from '@/types/entities';

export type ParticipationMeetingListParams = {
  status: 'participating' | 'completed' | 'cancelled';
  page: number;
  // size: number;
};

export type MyPageMeetingResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentType: Meeting['recruitmentType'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  thumbnailImage: MeetingSummary['image'];
  meetingStartTime: MeetingSchedule['meetingStartTime'];
  address: Meeting['address'];
  userStatus: Meeting['userStatus'];
};

export type MyPageMeetingListResult = {
  meetings: MyPageMeetingResult[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getParticipationMeetingList = async (
  params: ParticipationMeetingListParams,
) => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    // size: params.size.toString(),
    status: params.status,
  });
  const res = await axiosInstance<APIResponse<MyPageMeetingListResult>>({
    method: 'GET',
    baseURL: API_V2_BASE_URL,
    url: `/users/meetings/participation?${searchParams.toString()}&size=9`,
  });
  const data = res.data;
  return data.result;
};

export type ApplicationMeetingListParams = {
  status: 'applied' | 'confirmed' | 'rejected';
  page: number;
  // size: number;
};

export const getApplicationMeetingList = async (
  params: ApplicationMeetingListParams,
) => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    // size: params.size.toString(),
    status: params.status,
  });
  const res = await axiosInstance<APIResponse<MyPageMeetingListResult>>({
    method: 'GET',
    baseURL: API_V2_BASE_URL,
    url: `/users/meetings/application?${searchParams.toString()}&size=9`,
  });
  const data = res.data;
  return data.result;
};

export type OpeningMeetingListParams = {
  page: number;
  type: 'regular' | 'small';
  // size: number;
};

export const getOpeningMeetingList = async (
  params: OpeningMeetingListParams,
) => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    // size: params.size.toString(),
    type: params.type,
  });
  const res = await axiosInstance<APIResponse<MyPageMeetingListResult>>({
    method: 'GET',
    baseURL: API_V2_BASE_URL,
    url: `/users/meetings/created?${searchParams.toString()}&size=9`,
  });
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
