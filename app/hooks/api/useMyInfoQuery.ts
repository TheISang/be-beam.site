import { getMyInfo } from '@/api/users';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const myInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['my-info'],
    queryFn: () => getMyInfo(),
    select: (data) => ({
      ...data,
      gender: data.gender,
      birthday: data.birthday.replaceAll('-', '.'),
      phoneNumber: data.phoneNumber.replaceAll('-', ''),
    }),
  });
};

export default function useMyInfoQuery() {
  return useQuery(myInfoQueryOptions());
}
