import { useQuery } from '@tanstack/react-query';
import { getMyCreatedMeetingParticipants } from '@/api/users';

import type { Participants } from '@/types/entities';
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
import { Tag } from '../atoms/tag/Tag';

export default function CreatedMeetingParticipantsManageContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data: participants } = useQuery({
    queryKey: ['participants', meetingId],
    queryFn: () => getMyCreatedMeetingParticipants(meetingId),
  });

  return (
    <div className="w-full">
      <div className="mt-10 w-full">
        <div className="mb-3 flex items-center gap-2">
          <Text variant="T2_Semibold">모임 참여자</Text>
          <Text className="rounded-md bg-[#e5f7ed] px-2 py-1 text-c1 text-[#00AE4F]">
            {participants?.participantCount}
          </Text>
        </div>

        <Table className="rounded-md border-1 border-gray-400">
          <TableHeader>
            <TableRow className="border-gray-400">
              <TableHead>닉네임</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>권한</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants?.participants.map(
              (participant: Participants, idx: number) => (
                <TableRow
                  key={participant.id}
                  className={cn(
                    idx % 2 === 0 && 'bg-gray-100',
                    'border-0 text-b2',
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-7 w-7 rounded-full object-cover"
                        src={participant.image}
                        alt="profile_img"
                      />
                      {participant.nickname}
                    </div>
                  </TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.phoneNumber}</TableCell>
                  <TableHead>
                    <Tag
                      variant={
                        participant.authority === '호스트' ? 'blue' : 'primary'
                      }
                    >
                      {participant.authority}
                    </Tag>
                  </TableHead>
                  <TableCell>
                    <Tag
                      variant={
                        participant.userStatus === '참여중'
                          ? 'green'
                          : participant.userStatus === '참여완료'
                            ? 'brown'
                            : 'red'
                      }
                    >
                      {participant.userStatus}
                    </Tag>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
