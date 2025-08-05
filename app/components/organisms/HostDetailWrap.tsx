import { useNavigate, useRouteLoaderData } from 'react-router';
import useHostQuery from '@/hooks/api/useHostQuery';
import useHostFollowAndFollowCancelMutation from '@/hooks/api/useHostFollowAndFollowCancelMutation';
import { useModalStore } from '@/stores/useModalStore';

import { cn } from '@/lib/tailwind';
import { Button } from '../atoms/button/Button';
import Text from '../atoms/text/Text';
import GridGroup from './gridGroup/GridGroup';
import Badge from '../atoms/badge/Badge';
import toast from 'react-hot-toast';

interface meetingType {
  id: number;
  meetingName: string;
  meetingImage: string;
  topic: string;
}

export default function HostDetailWrap({ id }: { id: number }) {
  const navigate = useNavigate();

  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;

  const { data: host } = useHostQuery(id);
  console.log(host);

  const { mutate: followHost, isPending: isPending } =
    useHostFollowAndFollowCancelMutation(id, host, 'hostDetail');

  const { open } = useModalStore();

  return (
    <>
      <Text variant="H2_Semibold">호스트 프로필</Text>

      <div className="mt-14 flex w-full items-center gap-6">
        <div className="relative h-22 w-22">
          <img
            className="h-full w-full rounded-full object-cover"
            src={host?.hostImage}
            alt="host_profile_image"
          />
          <img
            className="absolute bottom-0 left-0"
            src="/images/icons/host.svg"
            alt="host_icon"
          />
        </div>

        <div className="w-full flex-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-6">
              <Text variant="T2_Semibold">{host?.hostName}</Text>
              <Button
                onClick={() => {
                  if (user) {
                    if (isPending) return;
                    followHost();
                  } else {
                    toast('로그인 후 다시 시도해주세요.');
                  }
                }}
                className={cn(
                  host.hostName === user?.nickname && 'hidden',
                  'h-8 px-4 text-b1',
                )}
              >
                {host?.followed ? '팔로우 취소' : '팔로우'}
              </Button>
            </div>

            <Button
              variant="tertiary"
              className={cn(
                host.hostName === user?.nickname && 'hidden',
                'border-none text-t3',
              )}
              onClick={() => {
                if (user) {
                  open('DECLARE_MODAL', {
                    type: 'host',
                    id: id,
                    refetchKey: 'hostDetail',
                  });
                } else {
                  toast('로그인 후 다시 시도해주세요.');
                }
              }}
            >
              호스트 신고하기
              <img
                src="/images/icons/next.svg"
                alt="next_icon"
                className="ml-1"
              />
            </Button>
          </div>

          <Text variant="B2_Medium" className="mt-2">
            {host?.hostInstruction}
          </Text>
          <Text variant="C1_Semibold" className="mt-2">
            <span className="mr-2 text-c2 text-gray-500">팔로워</span>
            {host?.followCount}
          </Text>
        </div>
      </div>

      <div className="mt-20 w-full">
        <Text variant="T3_Semibold">
          개설한 모임
          <span className="ml-2 text-gray-500">
            {host?.openingMeetingCount}
          </span>
        </Text>
        <GridGroup columns={3} gap={4} className="mt-4">
          {host?.openingMeetings?.map((meeting: meetingType) => (
            <div
              key={meeting.id}
              className="box-border flex w-full items-center gap-4 rounded-lg border-1 border-gray-300 p-6"
            >
              <img
                className="h-25 w-25 rounded-lg object-cover"
                src={meeting.meetingImage}
                alt="meeting_thumbnail"
              />
              <div>
                <Text
                  variant="B2_Medium"
                  className="cursor-pointer"
                  onClick={() => navigate(`/meeting/${meeting.id}`)}
                >
                  {meeting.meetingName}
                </Text>
                <Badge
                  text={meeting.topic}
                  className="mt-3 inline-block border-none px-2 py-1 text-b1"
                />
              </div>
            </div>
          ))}
        </GridGroup>
      </div>
    </>
  );
}
