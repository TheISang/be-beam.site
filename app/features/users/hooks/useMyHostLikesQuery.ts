import { getMyHostLikes } from '@/shared/api/endpoints/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const myHostLikesQueryOptions = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return queryOptions({
    queryKey: ['my-host-likes', { page, size }],
    queryFn: () => getMyHostLikes({ page, size }),
  });
};

export default function useMyHostLikesQuery({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  return useSuspenseQuery(myHostLikesQueryOptions({ page, size }));
}
