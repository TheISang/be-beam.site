import { useQuery } from '@tanstack/react-query';
import useCheckAttendanceMutation from '@/features/meetings/hooks/useCheckAttendanceMutation';
import { getMyCreatedMeetingAttendance } from '@/shared/api/endpoints/users';

import type { MeetingAttendance } from '@/shared/types/entities';
import { cn } from '@/styles/tailwind';
import Text from '../../../shared/components/ui/Text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../shared/components/ui/Accrodion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../shared/components/ui/Select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../shared/components/ui/Tooltip';

export default function CreatedMeetingAttendanceManageContent({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data: attendance } = useQuery<MeetingAttendance>({
    queryKey: ['attendance', meetingId],
    queryFn: () => getMyCreatedMeetingAttendance(meetingId),
  });

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
                    className="mb-2 flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="h-12 w-12 rounded-full border-1 border-gray-300 object-cover"
                        src={participant.image}
                        alt="profile_image"
                      />
                      <Text variant="T3_Semibold">{participant.name}</Text>
                    </div>

                    {!attendance.attendanceCheckAvailable ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span tabIndex={-1}>
                              <Select
                                disabled={!attendance.attendanceCheckAvailable}
                                value={
                                  attendance.scheduleParticipants[index]
                                    ?.isChecked === '불참'
                                    ? 'ABSENT'
                                    : attendance.scheduleParticipants[index]
                                          ?.isChecked === '참석'
                                      ? 'PRESENT'
                                      : 'LATE'
                                }
                                onValueChange={(value) => {
                                  if (isPending) return;
                                  checkAttendance({
                                    scheduleId: attendance.scheduleId,
                                    userId: participant.id,
                                    status: value,
                                  });
                                }}
                              >
                                <SelectTrigger
                                  className={cn(
                                    attendance.scheduleParticipants[index]
                                      ?.isChecked === '불참'
                                      ? 'border-0 bg-gray-200'
                                      : attendance.scheduleParticipants[index]
                                            ?.isChecked === '참석'
                                        ? 'bg-black text-white'
                                        : 'bg-red-600 text-white',
                                    'w-auto rounded-full text-b1',
                                  )}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-0 bg-white">
                                  <SelectGroup>
                                    <SelectLabel>출석 여부</SelectLabel>
                                    {[
                                      {
                                        label: '출석 완료',
                                        value: 'PRESENT',
                                      },
                                      {
                                        label: '출석 안함',
                                        value: 'ABSENT',
                                      },
                                      {
                                        label: '지각',
                                        value: 'LATE',
                                      },
                                    ].map((item, idx: number) => (
                                      <SelectItem key={idx} value={item.value}>
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="text-center">
                            <p>출석체크는 모임 시작 30분 전부터 가능하며,</p>
                            <p>
                              모임 스케쥴 시작 후 24시간까지 수정 가능합니다.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Select
                        disabled={!attendance.attendanceCheckAvailable}
                        value={
                          attendance.scheduleParticipants[index]?.isChecked ===
                          '불참'
                            ? 'ABSENT'
                            : attendance.scheduleParticipants[index]
                                  ?.isChecked === '참석'
                              ? 'PRESENT'
                              : 'LATE'
                        }
                        onValueChange={(value) => {
                          if (isPending) return;
                          checkAttendance({
                            scheduleId: attendance.scheduleId,
                            userId: participant.id,
                            status: value,
                          });
                        }}
                      >
                        <SelectTrigger
                          className={cn(
                            attendance.scheduleParticipants[index]
                              ?.isChecked === '불참'
                              ? 'border-0 bg-gray-200'
                              : attendance.scheduleParticipants[index]
                                    ?.isChecked === '참석'
                                ? 'bg-black text-white'
                                : 'bg-red-600 text-white',
                            'w-auto rounded-full text-b1',
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-0 bg-white">
                          <SelectGroup>
                            <SelectLabel>출석 여부</SelectLabel>
                            {[
                              {
                                label: '출석 완료',
                                value: 'PRESENT',
                              },
                              {
                                label: '출석 안함',
                                value: 'ABSENT',
                              },
                              {
                                label: '지각',
                                value: 'LATE',
                              },
                            ].map((item, idx: number) => (
                              <SelectItem key={idx} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
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
