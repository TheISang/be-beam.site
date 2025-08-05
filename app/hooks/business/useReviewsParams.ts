import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

type useReviewsParamsType = {
  params: {
    sort: 'recent' | 'likes';
    type: 'image' | 'text';
    rating: 'all' | '1' | '2' | '3' | '4' | '5';
    recruitmentType: 'all' | 'regular' | 'small';
  };
  handleUpdateRecruitmentType: (recruitmentType: string) => void;
  handleUpdateSort: (sort: string) => void;
  handleUpdateType: (type: string) => void;
  handleUpdateRating: (rating: string) => void;
};

export default function useReviewsParams(): useReviewsParamsType {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const recruitmentType = searchParams.get('recruitmentType') || 'all';
    const sort = searchParams.get('sort') || 'recent';
    const type = searchParams.get('type') || 'text';
    const rating = searchParams.get('rating') || 'all';
    return {
      recruitmentType: recruitmentType as 'all' | 'regular' | 'small',
      sort: sort as 'recent' | 'likes',
      type: type as 'image' | 'text',
      rating: rating as 'all' | '1' | '2' | '3' | '4' | '5',
    };
  }, [searchParams]);

  const handleUpdateRecruitmentType = (recruitmentType: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('recruitmentType', recruitmentType);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  const handleUpdateSort = (sort: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('sort', sort);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

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

  const handleUpdateRating = (rating: string) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('rating', rating);
        return searchParams;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  return {
    params,
    handleUpdateRecruitmentType,
    handleUpdateSort,
    handleUpdateType,
    handleUpdateRating,
  };
}
