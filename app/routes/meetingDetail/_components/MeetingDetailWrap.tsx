import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useMeetingQuery from '@/features/meetings/hooks/useMeetingQuery';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import { useModalStore } from '@/shared/stores/useModalStore';
import { formatNumberWithComma } from '@/shared/utils/cash';

import { cn } from '@/styles/tailwind';
import type { Meeting } from '@/shared/types/entities';
import MeetingDetailContentWrap from './MeetingDetailContentWrap';
import Slider from '../../../shared/components/common/Slider';
import MeetingDetailCard from './MeetingDetailCard';
import MeetingDetailCardTop from './MeetingDetailCardTop';
import MeetingDetailHost from './MeetingDetailHost';
import Text from '../../../shared/components/ui/Text';
import { Button } from '../../../shared/components/ui/Button';
import TitleAndDes from '@/shared/components/common/TitleAndDes';
import GuideBookRecommendationCard from '@/features/guidebooks/components/GuideBookRecommendationCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/Tooltip';
import { Tag } from '@/shared/components/ui/Tag';
import toast from 'react-hot-toast';
import HeartFillIcon from '@/shared/components/icons/HeartFillIcon';
import HeartIcon from '@/shared/components/icons/HeartIcon';
import SirenIcon from '@/shared/components/icons/SirenIcon';
import ClockIcon from '@/shared/components/icons/ClockIcon';

export default function MeetingDetailWrap({ id }: { id: number }) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);

  const { data: meeting } = useMeetingQuery(id);
  const { userStatus, recruitmentStatus } = meeting;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const measureAndSetPosition = () => {
      if (contentRef.current && sliderRef.current) {
        const contentH = contentRef.current.offsetHeight;
        setContentHeight(contentH);

        const sliderH = sliderRef.current.offsetHeight;
        setSliderHeight(sliderH);
      }
    };

    const handleResize = () => {
      setTimeout(measureAndSetPosition, 0);
    };

    let observer: ResizeObserver | null = null;
    if (sliderRef.current) {
      observer = new ResizeObserver(measureAndSetPosition);
      observer.observe(sliderRef.current);
    }

    measureAndSetPosition();
    window.addEventListener('resize', handleResize);
    setTimeout(measureAndSetPosition, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [meeting, isClient]);

  console.log(meeting);

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

  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation();

  const isMeetingStatusCommentBlock =
    (meeting.recruitmentStatus === '모집중' &&
      meeting.maxParticipants - 2 <= meeting.applicantCount) ||
    meeting.recruitmentStatus === '모임중';

  const meetingStatusComment =
    meeting.recruitmentStatus === '모집중' &&
    meeting.maxParticipants - 2 <= meeting.applicantCount
      ? `${meeting.maxParticipants - meeting.applicantCount} 자리 남음`
      : meeting.recruitmentStatus === '모임중'
        ? `${meeting.participantCount}명 모임 참여 중`
        : null;

  return (
    <div className="relative flex w-full items-start gap-8">
      <div className="w-full min-w-0 lg:max-w-[60%] xl:max-w-[70%] 2xl:max-w-[970px]">
        <Slider
          ref={sliderRef}
          images={meeting.meetingImages}
          isCount={true}
          slideWidth="w-full"
          slideHeight="lg:h-[557px]"
          delay={5000}
          isBtn="lg:flex hidden"
          classNames="lg:mt-0 mt-[72px] lg:rounded-xl rounded-none"
          imageStyle="rounded-none lg:aspect-auto aspect-square lg:rounded-xl bg-yellow-200"
        />

        <div
          ref={contentRef}
          className="absolute z-10 w-full rounded-t-4xl bg-[#e9e9e9] lg:relative lg:bg-white lg:bg-none"
          style={
            isClient && window.innerWidth < 1024
              ? { top: sliderHeight + 72 - sliderHeight * 0.05 }
              : {}
          }
        >
          <MeetingDetailCardTop meeting={meeting} isBlock="lg:hidden block" />

          <MeetingDetailHost
            hostImg={meeting.hostImage}
            hostName={meeting.hostName}
            hostDes={meeting.hostDescription}
            onClick={() => navigate(`/host/${meeting.hostId}`)}
          />

          <div
            className={cn(
              'mt-5 box-border flex w-full flex-col items-center rounded-xl border-1 border-gray-300 bg-white p-12 text-center',
              meeting.reviewable ? 'block' : 'hidden',
            )}
          >
            <Text color="gray-600" className="mb-6">
              참여한 모임은 어떠셨나요?
              <br />
              소중한 경험을 함께 나눠요🥰
            </Text>

            <Button
              size="md"
              className="w-full"
              onClick={() =>
                open('EDIT_MEETING_REVIEW_MODAL', {
                  meeting,
                })
              }
            >
              ✍️ 후기 작성하기
            </Button>
          </div>

          <MeetingDetailContentWrap meeting={meeting} />

          {meeting.guidebook && (
            <TitleAndDes
              title="참고한 가이드북"
              wrapStyle="lg:mb-14 mb-6 bg-white p-4 box-border"
            >
              <GuideBookRecommendationCard
                data={meeting.guidebook}
                onClick={() => navigate(`/guideBook/${meeting.guidebook.id}`)}
              />
            </TitleAndDes>
          )}

          <div className="fixed bottom-0 left-0 z-10 box-border flex w-full items-center justify-between gap-10 bg-white p-5 shadow-[0_-2px_14px_4px_rgba(0,0,0,0.1)] lg:hidden">
            <Tag
              variant="tertiary"
              className={cn(
                isMeetingStatusCommentBlock ? 'block' : 'hidden',
                'absolute top-0 left-2 -translate-y-full transform rounded-t-md rounded-b-none bg-[#D01010] px-4 py-5 text-b3 text-white',
              )}
            >
              <span className="flex items-center gap-1">
                <ClockIcon width={20} height={20} />
                {meetingStatusComment}
              </span>
            </Tag>

            <p className="min-w-0 text-t1">
              총 {formatNumberWithComma(meeting.paymentAmount)}원
            </p>

            <div className="flex w-full flex-1 items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  meeting.liked
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-gray-500 text-gray-700',
                  'box-border flex aspect-square flex-col items-center justify-center gap-0 p-0 text-b3',
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
                {meeting.liked ? (
                  <HeartFillIcon width={26} height={26} />
                ) : (
                  <HeartIcon width={26} height={26} />
                )}
                {meeting.likesCount}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="box-border flex aspect-square flex-col items-center justify-center gap-0 p-0 text-b3"
                onClick={() => {
                  open('DECLARE_MODAL', {
                    type: 'meeting',
                    id: meeting.id,
                    refetchKey: 'meeting',
                  });
                }}
              >
                <SirenIcon width={28} height={28} />
                {meeting.isComplaint ? '신고 취소' : '신고'}
              </Button>

              {buttonText === '신청하기' && meeting.isHost ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span tabIndex={-1} className="flex flex-1">
                        <Button
                          size="lg"
                          className="w-full flex-1 gap-1 text-t3 text-white"
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
                  className="w-full flex-1 gap-1 text-t3 text-white"
                  onClick={onClickHandler}
                  disabled={disable}
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div
          className="w-full"
          style={{
            height:
              isClient && window.innerWidth < 1024
                ? contentHeight - sliderHeight * 0.05
                : 0,
          }}
        ></div>
      </div>

      <div className="sticky top-[100px] hidden h-fit w-full flex-1 lg:block">
        <MeetingDetailCard meeting={meeting} />
        <div
          className={cn(
            'mt-5 box-border flex w-full flex-col items-center rounded-xl border-1 border-gray-300 bg-white p-12 text-center',
            meeting.reviewable ? 'block' : 'hidden',
          )}
        >
          <Text color="gray-600" className="mb-6">
            참여한 모임은 어떠셨나요?
            <br />
            소중한 경험을 함께 나눠요🥰
          </Text>

          <Button
            size="md"
            className="w-full"
            onClick={() =>
              open('EDIT_MEETING_REVIEW_MODAL', {
                meeting,
              })
            }
          >
            ✍️ 후기 작성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
