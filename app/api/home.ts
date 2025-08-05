import { API_V1_BASE_URL } from '@/constants/api';
import type { APIResponse } from '@/types/api';
import type {
  Banner,
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/types/entities';
import { axiosInstance } from '@/lib/axios';
import type { AxiosRequestConfig } from 'axios';

export type HomeBannersResult = {
  banners: {
    bannerId: Banner['bannerId'];
    bannerImage: Banner['bannerImage'];
    bannerUrl: Banner['bannerUrl'];
  }[];
};

export const getBanner = async () => {
  const res = await axiosInstance<APIResponse<HomeBannersResult>>({
    baseURL: API_V1_BASE_URL,
    url: '/home/banners',
    method: 'GET',
  });
  return res.data.result;
};

export type RecommendationMeetingsParams = {
  type: 'all' | 'regular' | 'small';
  topic: 'likes' | 'random' | 'recent';
  axiosRequestConfig: AxiosRequestConfig;
};

export type RecommendationMeeting = {
  id: Meeting['id'];
  name: Meeting['name'];
  recruitmentStatus: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  meetingStartTime: MeetingSchedule['meetingStartTime'];
  thumbnailImage: ImageType;
  liked: Meeting['liked'];
  address: Meeting['address'];
};

export type RecommendationMeetingsResult = RecommendationMeeting[];

export const getRecommendationMeeting = async (
  topic: RecommendationMeetingsParams['topic'],
  type: RecommendationMeetingsParams['type'],
  axiosRequestConfig?: RecommendationMeetingsParams['axiosRequestConfig'],
) => {
  const res = await axiosInstance<APIResponse<RecommendationMeetingsResult>>({
    baseURL: API_V1_BASE_URL,
    url: `/home/${topic}-meetings?type=${type}`,
    method: 'GET',
    ...axiosRequestConfig,
  });
  return res.data.result;
};
