import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';

import type { APIResponse } from '@/types/api';
import type { useGuideBooksParamsType } from '@/hooks/business/useGuideBooksParams';
import type { Guidebook, GuidebookSummary } from '@/types/entities';

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
  params: useGuideBooksParamsType['params'],
  pageParam: number = 0,
) => {
  const res = await axiosInstance<APIResponse<GuideBookListResult>>({
    method: 'GET',
    baseURL: API_V1_BASE_URL,
    url: `guidebooks?type=${params.type}&targetType=${params.targetType}&level=${params.level}&time=${params.time}&cursor=${pageParam}&size=9`,
    // url: `guidebooks?search={params.search}&type=${params.type}&targetType=${params.targetType}&mode={params.mode}&level=${params.level}&time=${params.time}&cursor=${pageParam}&size=9`,
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
