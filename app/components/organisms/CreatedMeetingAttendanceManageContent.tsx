import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useCheckAttendanceMutation from '@/hooks/api/useCheckAttendanceMutation';
import { getMyCreatedMeetingAttendance } from '@/api/users';

import type { MeetingAttendance } from '@/types/entities';
import { cn } from '@/lib/tailwind';
import Text from '../atoms/text/Text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion/Accrodion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../atoms/select/Select';

interface AttendanceItem {
  id: number;
  nickname: string;
  name: string;
  image: string;
  isChecked: '참석' | '불참' | '지각' | '출석 안함' | '출석 완료';
}

export default function CreatedMeetingAttendanceManageContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const [allAttendances, setAllAttendance] = useState<AttendanceItem[][]>([]);

  const { data: attendance } = useQuery<MeetingAttendance>({
    queryKey: ['attendance', meetingId],
    queryFn: () => getMyCreatedMeetingAttendance(meetingId),
  });

  useEffect(() => {
    if (attendance) {
      setAllAttendance([
        attendance?.attendanceStatus?.flatMap(
          (item) => item.scheduleParticipants,
        ),
      ]);
    }
  }, [attendance]);

  const { mutate: checkAttendance, isPending } =
    useCheckAttendanceMutation(meetingId);

  return (
    <div className="w-full">
      {attendance?.attendanceStatus.map((attendance, idx: number) => (
        <Accordion
          key={attendance.scheduleId}
          type="single"
          collapsible
          className="mt-5 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 px-10 pt-1 pb-5"
        >
          <AccordionItem value="item-1" className="border-b-1 border-gray-400">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Text
                  variant="T2_Semibold"
                  color="gray-900"
                  className="text-left"
                >
                  {idx + 1}회차 출석체크
                </Text>

                <div className="rounded-md bg-gray-200 px-2 py-1 text-c1">
                  <span className="text-primary">
                    {attendance.checkedCount}
                  </span>
                  /{attendance.totalCount}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {attendance.scheduleParticipants.map(
                (participant, index: number) => (
                  <div
                    key={participant.id}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="h-12 w-12 rounded-full border-1 border-gray-300 object-cover"
                        src={participant.image}
                        alt="profile_image"
                      />
                      <Text variant="T3_Semibold">{participant.nickname}</Text>
                    </div>

                    <Select
                      value={
                        allAttendances?.[idx]?.[index]?.isChecked === '불참' ||
                        allAttendances?.[idx]?.[index]?.isChecked ===
                          '출석 안함'
                          ? '출석 안함'
                          : '출석 완료'
                      }
                      onValueChange={(value) => {
                        if (isPending) return;
                        checkAttendance({
                          scheduleId: attendance.scheduleId,
                          userId: participant.id,
                          status:
                            value === '불참' || value === '출석 안함'
                              ? 'ABSENT'
                              : value === '참석' || value === '출석 완료'
                                ? 'PRESENT'
                                : 'LATE',
                        });
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          allAttendances?.[idx]?.[index]?.isChecked ===
                            '불참' ||
                            allAttendances?.[idx]?.[index]?.isChecked ===
                              '출석 안함'
                            ? 'border-0 bg-gray-200'
                            : 'bg-black text-white',
                          'w-auto rounded-full text-b1',
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-0 bg-white">
                        <SelectGroup>
                          <SelectLabel>출석 여부</SelectLabel>
                          {['출석 완료', '출석 안함'].map(
                            (item, idx: number) => (
                              <SelectItem key={idx} value={item}>
                                {item}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ),
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
