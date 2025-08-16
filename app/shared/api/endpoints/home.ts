import { API_V1_BASE_URL } from '@/shared/constants/api';
import type { APIResponse } from '@/shared/types/api';
import type {
  Banner,
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/shared/types/entities';
import { axiosInstance } from '@/shared/api/axios';

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
) => {
  const res = await axiosInstance<APIResponse<RecommendationMeetingsResult>>({
    baseURL: API_V1_BASE_URL,
    url: `/home/${topic}-meetings?type=${type}`,
    method: 'GET',
  });
  return res.data.result;
};
