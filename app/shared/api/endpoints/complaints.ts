import { axiosInstance } from '@/shared/api/axios';
import { API_V1_BASE_URL } from '@/shared/constants/api';
import type {
  DeclareDataType,
  DeclareModalPropsType,
} from '@/features/report/hooks/useDeclareMeetingOrReviewOrHost';
import type { APIResponse } from '@/shared/types/api';

interface ReportComplaintData {
  complaintId: number;
  targetType: 'REVIEW' | 'USER' | 'MEETING';
  reasonType:
    | 'ADVERTISEMENT'
    | 'SEXUAL'
    | 'PERSONAL_ATTACKS'
    | 'COMMERCIAL'
    | 'SPAM'
    | 'SPYWARE'
    | 'PRIVACY_VIOLATION'
    | 'OTHER';
  description: string;
}

export const reportComplaint = async (data: ReportComplaintData) => {
  const res = await axiosInstance.post<APIResponse<string>>(
    '/complaints',
    data,
    {
      baseURL: API_V1_BASE_URL,
    },
  );
  return res.data;
};

export const declareMeetingOrReviewOrHost = (
  data: DeclareDataType,
  modalProps: DeclareModalPropsType,
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    url: '/complaints',
    data: {
      complaintId: modalProps.id,
      targetType:
        modalProps.type === 'meeting'
          ? 'MEETING'
          : modalProps.type === 'review'
            ? 'REVIEW'
            : 'USER',
      ...data,
    },
  });
};
