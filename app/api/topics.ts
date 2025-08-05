import { API_V1_BASE_URL } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import type { AxiosRequestConfig } from 'axios';

export const getTopics = async (axiosRequestConfig?: AxiosRequestConfig) => {
  const res = await axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'GET',
    url: '/meetings/topics',
    ...axiosRequestConfig,
  });
  return res.data.result;
};
