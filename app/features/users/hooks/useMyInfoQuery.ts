import { getMyInfo } from '@/shared/api/endpoints/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const myInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['my-info'],
    queryFn: () => getMyInfo(),
    select: (data) => ({
      ...data,
      gender: data.gender,
      birthday:
        data.birthday !== null ? data.birthday.replaceAll('-', '.') : null,
      phoneNumber:
        data.phoneNumber !== null ? data.phoneNumber.replaceAll('-', '') : null,
    }),
  });
};

export default function useMyInfoQuery() {
  return useQuery(myInfoQueryOptions());
}
