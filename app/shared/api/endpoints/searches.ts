import { API_V1_BASE_URL } from '@/shared/constants/api';
import { axiosInstance } from '@/shared/api/axios';
import type { APIResponse } from '@/shared/types/api';
import type {
  Guidebook,
  Host,
  ImageType,
  Meeting,
  MeetingSchedule,
} from '@/shared/types/entities';

export type SearchTotalParams = {
  search: string;
};

export type SearchTotalResult = {
  meetings: {
    id: Meeting['id'];
    name: Meeting['name'];
    recruitmentType: Meeting['recruitmentType'];
    recruitmentStatus: Meeting['recruitmentStatus'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    image: ImageType;
    address: Meeting['address'];
    liked: boolean;
  }[];
  guidebooks: {
    id: Guidebook['id'];
    title: Guidebook['title'];
    thumbnailImage: ImageType;
    description: Guidebook['description'];
  }[];
  hosts: {
    id: Host['id'];
    nickname: Host['hostName'];
    profileImage: Host['hostImage'];
    introduction: Host['hostInstruction'];
    liked: boolean;
  }[];
};

export const getTotalSearchResult = async ({ search }: SearchTotalParams) => {
  const res = await axiosInstance.get<APIResponse<SearchTotalResult>>(
    `/searches/total`,
    {
      params: {
        search,
      },
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data.result;
};

export type SearchMeetingParams = {
  search: string;
  page: number;
  size: number;
};

export type SearchMeetingResult = {
  meetings: {
    id: Meeting['id'];
    name: Meeting['name'];
    recruitmentType: Meeting['recruitmentType'];
    recruitmentStatus: Meeting['recruitmentStatus'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    image: ImageType;
    address: Meeting['address'];
    liked: boolean;
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getSearchMeetingResult = async ({
  search,
  page,
  size,
}: SearchMeetingParams) => {
  const res = await axiosInstance.get<APIResponse<SearchMeetingResult>>(
    `/searches/meetings`,
    {
      params: {
        search,
        page,
        size,
      },
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data.result;
};

export type SearchGuidebookParams = {
  search: string;
  page: number;
  size: number;
};

export type SearchGuidebookResult = {
  guidebooks: {
    id: Guidebook['id'];
    title: Guidebook['title'];
    thumbnailImage: ImageType;
    description: Guidebook['description'];
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getSearchGuidebookResult = async ({
  search,
  page,
  size,
}: SearchGuidebookParams) => {
  const res = await axiosInstance.get<APIResponse<SearchGuidebookResult>>(
    `/searches/guidebooks`,
    {
      params: {
        search,
        page,
        size,
      },
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data.result;
};

export type SearchHostParams = {
  search: string;
  page: number;
  size: number;
};

export type SearchHostResult = {
  hosts: {
    id: Host['id'];
    nickname: Host['hostName'];
    profileImage: Host['hostImage'];
    introduction: Host['hostInstruction'];
    liked: boolean;
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export const getSearchHostResult = async ({
  search,
  page,
  size,
}: SearchHostParams) => {
  const res = await axiosInstance.get<APIResponse<SearchHostResult>>(
    `/searches/hosts`,
    {
      params: {
        search,
        page,
        size,
      },
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data.result;
};
