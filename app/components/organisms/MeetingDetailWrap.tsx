import useMeetingQuery from '@/hooks/api/useMeetingQuery';
import { useModalStore } from '@/stores/useModalStore';

import { cn } from '@/lib/tailwind';
import MeetingDetailContent from '../sections/MeetingDetailContent';
import Slider from './Slider';
import MeetingDetailMeetingReviewsContainer from '../sections/MeetingDetailMeetingReviewsContainer';
import MeetingDetailCard from './MeetingDetailCard';
import Text from '../atoms/text/Text';
import { Button } from '../atoms/button/Button';

export default function MeetingDetailWrap({ id }: { id: number }) {
  const { open } = useModalStore();

  const { data: meeting } = useMeetingQuery(id);
  console.log(meeting);

  return (
    <div className="flex items-start gap-8">
      <div className="w-full max-w-[970px]">
        <Slider
          images={meeting?.meetingImages}
          isCount={true}
          slideWidth="w-full"
          slideHeight="h-[657px]"
          delay={5000}
        />
        <MeetingDetailContent meeting={meeting} />
        <MeetingDetailMeetingReviewsContainer meetingId={id} />
      </div>

      <div className="sticky top-[100px] h-fit flex-1">
        <MeetingDetailCard meeting={meeting} />
        <div
          className={cn(
            'mt-5 box-border flex w-full flex-col items-center rounded-xl border-1 border-gray-300 p-12 text-center',
            meeting?.reviewable ? 'block' : 'hidden',
          )}
        >
          <Text color="gray-600" className="mb-6">
            참여한 모임은 어떠셨나요?
            <br />
            소중한 경험을 함께 나눠요🥰
          </Text>
          <Button
            size="sm"
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
