import { axiosInstance } from '@/shared/api/axios';
import { API_V1_BASE_URL } from '@/shared/constants/api';
import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';

import type { APIResponse } from '@/shared/types/api';
import type { Guidebook, GuidebookSummary } from '@/shared/types/entities';

export type GuideBookListResult = {
  pageInfo: {
    nextCursor: number;
    size: number;
    hasNext: boolean;
  };
  guidebooks: {
    id: Guidebook['id'];
    title: Guidebook['title'];
    thumbnailImage: GuidebookSummary['thumbnailImage'];
    description: Guidebook['description'];
  }[];
};

export const getGuideBookList = async (
  filters: GuideBookListFilters,
  pageParam: number = 0,
) => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const res = await axiosInstance<APIResponse<GuideBookListResult>>({
    method: 'GET',
    baseURL: API_V1_BASE_URL,
    url: `/guidebooks?${searchParams.toString()}&cursor=${pageParam}&size=9`,
  });
  const data = res.data;
  return data.result;
};

export type GuideBookDetailResult = {
  id: Guidebook['id'];
  guidebookType: Guidebook['guidebookType'];
  title: Guidebook['title'];
  description: Guidebook['description'];
  images: Guidebook['images'];
  hashtags: Guidebook['hashtags'];
  level: Guidebook['level'];
  targetType: Guidebook['targetType'];
  time: Guidebook['time'];
  benefits: Guidebook['benefits'];
  file: Guidebook['file'];
  recommendations: Guidebook['recommendations'];
};

export const getGuideBookDetail = async (id: number) => {
  const res = await axiosInstance<APIResponse<GuideBookDetailResult>>({
    baseURL: API_V1_BASE_URL,
    url: `/guidebooks/${id}`,
    method: 'GET',
  });
  const data = res.data;
  return data.result;
};

export const getGuideBookPdf = async (guideBook: GuideBookDetailResult) => {
  const res = await axiosInstance<Blob>({
    baseURL: API_V1_BASE_URL,
    url: `/guidebooks/download?pdf=${guideBook.file}`,
    method: 'GET',
    responseType: 'blob',
  });
  return res.data;
};

export const downloadGuideBookPdf = () => {};
