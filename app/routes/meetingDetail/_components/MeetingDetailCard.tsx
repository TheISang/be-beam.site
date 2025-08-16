import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import { useModalStore } from '@/shared/stores/useModalStore';

import type { Meeting } from '@/shared/types/entities';
import { cn } from '@/styles/tailwind';
import MeetingDetailCardTop from './MeetingDetailCardTop';
import { Button } from '../../../shared/components/ui/Button';
import toast from 'react-hot-toast';
import HeartFillIcon from '../../../shared/components/icons/HeartFillIcon';
import HeartIcon from '../../../shared/components/icons/HeartIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../shared/components/ui/Tooltip';

export default function MeetingDetailCard({ meeting }: { meeting: Meeting }) {
  const { open } = useModalStore();
  const { userStatus, recruitmentStatus } = meeting;

  const getMeetingButtonProps = (
    meeting: Meeting | undefined | null,
    open: (type: string, props: unknown) => void,
  ) => {
    if (!meeting) {
      return {
        text: '정보 없음',
        onClickHandler: () => {
          console.log('모임 정보가 없습니다.');
        },
      };
    }

    if (recruitmentStatus === '모집예정') {
      return {
        text: '모집 예정',
        disable: true,
      };
    }

    if (
      recruitmentStatus === '모집중' &&
      (!userStatus ||
        userStatus === '신청전' ||
        userStatus === '거절' ||
        userStatus === '신청취소완료')
    ) {
      return {
        text: '신청하기',
        onClickHandler: () => {
          if (userStatus && !meeting.isHost) {
            open('APPLY_MEETING_MODAL', { meeting });
          } else {
            toast('로그인 후 다시 시도해주세요.');
          }
        },
        disable: meeting.isHost,
      };
    }

    if (
      (recruitmentStatus === '모집중' &&
        (userStatus === '신청중' || userStatus === '확정')) ||
      (recruitmentStatus === '모집마감' && userStatus === '확정')
    ) {
      return {
        text: '신청 취소하기',
        onClickHandler: () =>
          open('CANCEL_MEETING_MODAL', {
            meetingId: meeting.id,
            statusType: 'applying',
            refetchKey: 'meeting',
          }),
        disable: false,
      };
    }

    if (recruitmentStatus === '모집중' && userStatus === '신청취소중') {
      return {
        text: '신청 취소 대기 중',
        disable: true,
      };
    }

    if (recruitmentStatus === '모임중' && userStatus === '참여중') {
      return {
        text: '모임 중도 이탈하기',
        onClickHandler: () =>
          open('CANCEL_MEETING_MODAL', {
            meetingId: meeting.id,
            statusType: 'participating', // applying
            refetchKey: 'meeting',
          }),
        disable: false,
      };
    }

    if (recruitmentStatus === '모임중' && userStatus === '중도이탈신청중') {
      return {
        text: '중도 이탈 신청 중',
        disable: true,
      };
    }

    if (
      recruitmentStatus === '모집마감' &&
      (!userStatus ||
        userStatus === '거절' ||
        userStatus === '신청전' ||
        userStatus === '신청중' ||
        userStatus === '신청취소완료')
    ) {
      return {
        text: '모집 종료',
        disable: true,
      };
    }

    if (
      recruitmentStatus === '모임중' &&
      (!userStatus ||
        userStatus === '거절' ||
        userStatus === '신청전' ||
        userStatus === '신청중' ||
        userStatus === '신청취소완료' ||
        userStatus === '중도이탈완료' ||
        userStatus === '참여완료')
    ) {
      return {
        text: '모임 중',
        disable: true,
      };
    }

    if (recruitmentStatus === '모임완료') {
      return {
        text: '모임 완료',
        disable: true,
      };
    }
    return {
      text: '신청하기',
      onClickHandler: () => {
        if (userStatus) {
          open('APPLY_MEETING_MODAL', { meeting });
        } else {
          toast('로그인 후 다시 시도해주세요.');
        }
      },
      disable: meeting.isHost,
    };
  };

  const {
    text: buttonText,
    onClickHandler,
    disable,
  } = getMeetingButtonProps(meeting, open as () => void);

  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation('meeting');

  return (
    <div className="box-border flex h-[657px] flex-1 flex-col justify-between rounded-xl border-1 border-gray-300 bg-white px-7 py-10">
      <MeetingDetailCardTop meeting={meeting} />

      <div className="mt-8 flex w-full items-center gap-4">
        <Button
          variant="tertiary"
          size="lg"
          className={cn(
            meeting?.liked
              ? 'border-primary bg-primary-light text-primary'
              : 'border-gray-300 text-gray-700',
            'gap-1 px-6 text-t1',
          )}
          onClick={() => {
            if (userStatus) {
              if (isPending) return;
              likeMeeting(meeting);
            } else {
              toast('로그인 후 다시 시도해주세요.');
            }
          }}
        >
          {meeting?.liked ? (
            <HeartFillIcon width={28} height={28} />
          ) : (
            <HeartIcon width={28} height={28} />
          )}
          {meeting.likesCount}
        </Button>

        {buttonText === '신청하기' && meeting.isHost ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={-1} className="flex flex-1">
                  <Button
                    size="lg"
                    className="flex-1 gap-1 text-t3 text-white"
                    onClick={onClickHandler}
                    disabled={disable}
                  >
                    {buttonText}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent className="text-center">
                <p>호스트는 모임 신청을 할 수 없습니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            size="lg"
            className="flex-1 gap-1 text-t3 text-white"
            onClick={onClickHandler}
            disabled={disable}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
