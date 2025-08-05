import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export interface useParticipatedMeetingParamsType {
  params: {
    status: 'participating' | 'completed' | 'cancelled';
    page: number;
  };
  handleUpdateStatus: (status: string) => void;
  handleUpdatePage: (page: number) => string;
}

export default function useParticipatedMeetingParams(): useParticipatedMeetingParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      status: (searchParams.get('status') ||
        'participating') as useParticipatedMeetingParamsType['params']['status'],
      page: (searchParams.get('page') ||
        1) as useParticipatedMeetingParamsType['params']['page'],
    };
  }, [searchParams]);

  const handleUpdateStatus = (status: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('status', status);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdatePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  return { params, handleUpdateStatus, handleUpdatePage };
}
