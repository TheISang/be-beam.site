import { getTotalSearchResult, type SearchTotalParams } from '@/api/searches';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const searchTotalQueryOptions = (params: SearchTotalParams) =>
  queryOptions({
    queryKey: ['search-total', params],
    queryFn: () => getTotalSearchResult(params),
  });

export default function useSearchTotalQuery(params: SearchTotalParams) {
  return useQuery(searchTotalQueryOptions(params));
}
