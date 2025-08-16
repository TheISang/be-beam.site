import { useModalStore } from '@/shared/stores/useModalStore';

import type { Meeting } from '@/shared/types/entities';
import Text from '../../../shared/components/ui/Text';
import RecruitmentTypeAndTopic from './RecruitmentTypeAndTopic';
import { DropdownMenuItem } from '../../../shared/components/ui/DropdownMenu';
import MoreDropdownMenu from '../../../shared/components/common/MoreDropdownMenu';
import { Tag } from '../../../shared/components/ui/Tag';

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
          <Tag
            key={idx}
            variant="primary"
            className="rounded-md border-1 border-primary px-2 py-1 text-b1"
          >
            {`#${hashtag}`}
          </Tag>
        ))}
      </div>
    </div>
  );
}
