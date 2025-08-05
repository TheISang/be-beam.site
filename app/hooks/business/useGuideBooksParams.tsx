import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export interface useGuideBooksParamsType {
  params: {
    type:
      | 'all'
      | 'communication'
      | 'engagement'
      | 'planning'
      | 'operation'
      | 'support';
    targetType: 'all' | 'planner' | 'participant';
    level: 'all' | 'before' | 'ongoing' | 'completed';
    time: 'all' | 'under30min' | 'under1hour' | 'over1hour';
  };
  handleUpdateType: (type: string) => void;
  handleUpdateTargetType: (targetType: string) => void;
  handleUpdateLevel: (level: string) => void;
  handleUpdateTime: (time: string) => void;
}

export default function useGuideBooksParams(): useGuideBooksParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const type = searchParams.get('type') || 'all';
    const targetType = searchParams.get('target-type') || 'all';
    const level = searchParams.get('level') || 'all';
    const time = searchParams.get('time') || 'all';

    return {
      type: type as useGuideBooksParamsType['params']['type'],
      targetType: targetType as useGuideBooksParamsType['params']['targetType'],
      level: level as useGuideBooksParamsType['params']['level'],
      time: time as useGuideBooksParamsType['params']['time'],
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

  const handleUpdateTargetType = (targetType: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('target-type', targetType);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateLevel = (level: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('level', level);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateTime = (time: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('time', time);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  return {
    params,
    handleUpdateType,
    handleUpdateTargetType,
    handleUpdateLevel,
    handleUpdateTime,
  };
}
