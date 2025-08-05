import { getMyMeetingLikes } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

const myMeetingLikesQueryOptions = ({
  page,
  size,
  type,
}: {
  page: number;
  size: number;
  type: 'regular' | 'small';
}) => {
  return queryOptions({
    queryKey: ['my-meeting-likes', { page, size, type }],
    queryFn: () => getMyMeetingLikes({ page, size, type }),
  });
};

export default function useMyMeetingLikesQuery({
  page,
  size,
  type,
}: {
  page: number;
  size: number;
  type: 'regular' | 'small';
}) {
  return useQuery(myMeetingLikesQueryOptions({ page, size, type }));
}
