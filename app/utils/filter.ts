import type { FiltersType } from '@/types/components';

export const getInitialFilters = (filters: FiltersType[]) => {
  const initial: Record<string, string> = {};
  filters.forEach((filter) => {
    initial[filter.label] = filter.label === '정렬' ? 'recent' : 'all';
  });
  return initial;
};
