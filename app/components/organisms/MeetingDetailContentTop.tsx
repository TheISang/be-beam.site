import { useModalStore } from '@/stores/useModalStore';

import type { Meeting } from '@/types/entities';
import Text from '../atoms/text/Text';
import RecruitmentTypeAndTopic from '../molecules/RecruitmentTypeAndTopic';
import { DropdownMenuItem } from '../atoms/dropdown-menu/DropdownMenu';
import MoreDropdownMenu from './MoreDropdownMenu';
import Badge from '../atoms/badge/Badge';

export default function MeetingDetailContentTop({
  meeting,
}: {
  meeting: Meeting;
}) {
  const { open } = useModalStore();

  return (
    <div className="w-full border-b-1 border-gray-400 pb-8">
      <RecruitmentTypeAndTopic
        recruitmentType={meeting?.recruitmentType}
        topic={meeting?.topic}
      />

      <div className="flex items-center justify-between">
        <Text variant="H2_Semibold" className="mt-4">
          {meeting?.name}
        </Text>

        <MoreDropdownMenu>
          <DropdownMenuItem
            onSelect={() => {
              open('DECLARE_MODAL', {
                type: 'meeting',
                id: meeting.id,
                refetchKey: 'meeting',
              });
            }}
          >
            신고하기
          </DropdownMenuItem>
        </MoreDropdownMenu>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {meeting?.hashtags?.map((hashtag, idx) => (
          <Badge
            key={idx}
            text={`#${hashtag}`}
            className="rounded-md bg-primary-light px-2 py-1 text-b1 text-primary"
          />
        ))}
      </div>
    </div>
  );
}
