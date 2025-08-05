import { useQuery } from '@tanstack/react-query';
import { getMyCreatedMeetingApplicants } from '@/api/users';
import useAcceptOrRejectApplicationMutation from '@/hooks/api/useAcceptOrRejectApplicationMutation';

import type { Applicants } from '@/types/entities';
import { cn } from '@/lib/tailwind';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../atoms/table/Table';
import Text from '../atoms/text/Text';
import { Button } from '../atoms/button/Button';
import { Tag } from '../atoms/tag/Tag';

export default function CreatedMeetingApplicantsManageContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data: applicants } = useQuery({
    queryKey: ['applicants', meetingId],
    queryFn: () => getMyCreatedMeetingApplicants(meetingId),
  });
  const { mutate: acceptOrRejectApplication, isPending } =
    useAcceptOrRejectApplicationMutation(meetingId);

  return (
    <div className="mt-6 w-full">
      <div className="mb-3 flex items-center gap-2">
        <Text variant="T2_Semibold">모임 신청자</Text>
        <Text className="rounded-md bg-[#fff4ec] px-2 py-1 text-c1 text-primary">
          {applicants?.applicantCount}
        </Text>
      </div>

      <Table className="rounded-lg border-1 border-gray-400">
        <TableHeader>
          <TableRow className="border-gray-400 text-b1">
            <TableHead className="px-5 py-3">닉네임</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>신청 사유</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applicants.map((applicant: Applicants, idx: number) => (
            <TableRow
              key={applicant.id}
              className={cn(idx % 2 === 0 && 'bg-gray-100', 'border-0 text-b2')}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={applicant.image}
                    alt="profile_img"
                  />
                  {applicant.nickname}
                </div>
              </TableCell>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>{applicant.phoneNumber}</TableCell>
              <TableCell>{applicant.joinReason}</TableCell>
              <TableCell className="text-c1">
                <Tag
                  variant={
                    applicant.userStatus === '신청중'
                      ? 'tertiary'
                      : applicant.userStatus === '확정'
                        ? 'green'
                        : 'red'
                  }
                >
                  {applicant.userStatus}
                </Tag>
              </TableCell>
              <TableCell>
                {applicant.userStatus === '신청중' && (
                  <div className="flex items-center gap-2 text-b1">
                    <Button
                      onClick={() => {
                        if (isPending) return;
                        acceptOrRejectApplication({
                          userId: applicant.id,
                          type: 'REJECTED',
                        });
                      }}
                      className="h-auto border-gray-500 px-5 py-2 text-gray-600"
                      variant="tertiary"
                    >
                      거절
                    </Button>
                    <Button
                      onClick={() => {
                        if (isPending) return;
                        acceptOrRejectApplication({
                          userId: applicant.id,
                          type: 'ACCEPTED',
                        });
                      }}
                      className="h-auto border-gray-500 px-5 py-2 text-gray-600"
                      variant="tertiary"
                    >
                      수락
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
