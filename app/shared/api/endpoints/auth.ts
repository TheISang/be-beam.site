import { API_V1_BASE_URL } from '@/shared/constants/api';
import { axiosInstance } from '@/shared/api/axios';
import type { APIResponse } from '@/shared/types/api';
import type { AxiosRequestConfig } from 'axios';

export function reissueToken(axiosRequestConfig?: AxiosRequestConfig) {
  return axiosInstance.post<APIResponse<void>>('reissue', undefined, {
    baseURL: API_V1_BASE_URL,
    ...axiosRequestConfig,
  });
}

export function logout() {
  return axiosInstance.post<APIResponse<void>>('logout', undefined, {
    baseURL: API_V1_BASE_URL,
  });
}
