import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export default function useMyNotificationsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const type = searchParams.get('type') || 'all';
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get('size')) || 10;
    return {
      type,
      page,
      size,
    } as {
      type: 'all' | 'meeting' | 'review' | 'host';
      page: number;
      size: number;
    };
  }, [searchParams]);

  const setType = (type: 'all' | 'meeting' | 'review' | 'host') => {
    setSearchParams((searchParams) => {
      searchParams.set('type', type);
      return searchParams;
    });
  };

  const setPage = (page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  };

  const setSize = (size: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('size', size.toString());
      return searchParams;
    });
  };

  return {
    params,
    setType,
    setPage,
    setSize,
  };
}
