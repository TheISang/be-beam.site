import { API_V1_BASE_URL } from '@/shared/constants/api';
import { axiosInstance } from '@/shared/api/axios';
import type { APIResponse } from '@/shared/types/api';

export type FollowHostResult = string;

export const followHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<FollowHostResult>>({
    method: 'POST',
    url: `follows/${id}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export const unfollowHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<FollowHostResult>>({
    method: 'DELETE',
    url: `follows/${id}`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};
