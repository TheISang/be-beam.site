import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export interface useCreatedMeetingDetailDetailParamsType {
  params: {
    type: 'meeting' | 'schedule';
  };
  handleUpdateType: (type: string) => void;
}

export default function useCreatedMeetingDetailDetailParams(): useCreatedMeetingDetailDetailParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      type: (searchParams.get('type') ||
        'meeting') as useCreatedMeetingDetailDetailParamsType['params']['type'],
    };
  }, [searchParams]);

  const handleUpdateType = (type: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('type', type);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  return { params, handleUpdateType };
}
