import { useSearchParams } from 'react-router';

export interface useCreatedMeetingDetailParamsType {
  params: {
    step: 'intro' | 'detail' | 'manage' | 'host';
  };
  handleStepType: (step: string) => void;
}

export default function useCreatedMeetingDetailParams(): useCreatedMeetingDetailParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    step: (searchParams.get('step') ||
      'intro') as useCreatedMeetingDetailParamsType['params']['step'],
  };

  const handleStepType = (step: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('step', step);
        return searchParams;
      },

      {
        preventScrollReset: true,
      },
    );
  };

  return {
    params,
    handleStepType,
  };
}
