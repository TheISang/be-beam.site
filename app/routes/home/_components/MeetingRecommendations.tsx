import { useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';

import type { RecommendationMeeting } from '@/shared/api/endpoints/home';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../shared/components/ui/Tabs';
import Text from '../../../shared/components/ui/Text';
import MeetingCard from '../../../features/meetings/components/MeetingCard';
import useMeetingRecommendationQuery from '@/features/meetings/hooks/useMeetingRecommendationsQuery';
import LoadingSpinner from '../../../shared/components/ui/LoadingSpinner';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import { Button } from '../../../shared/components/ui/Button';

export default function MeetingRecommendations({
  title,
  type,
  className,
  moreUrl,
}: {
  title: string;
  type: 'likes' | 'random' | 'recent';
  className?: string;
  moreUrl: string;
}) {
  const navigate = useNavigate();
  const rootLoaderData = useRouteLoaderData('root');
  const user = rootLoaderData.user;
  console.log('user', user);

  const [tab, setTab] = useState<'all' | 'regular' | 'small'>('all');
  const { data: datas, isLoading } = useMeetingRecommendationQuery(type, tab);

  const tabList = [
    {
      text: '전체',
      value: 'all',
    },
    {
      text: '정기모임',
      value: 'regular',
    },
    {
      text: '소모임',
      value: 'small',
    },
  ];

  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation();

  return (
    <div className={`${className} w-full text-left`}>
      <Text variant="H2_Semibold" className="px-4">
        {title}
      </Text>

      <div className="mt-6 mb-5 flex w-full items-center gap-3">
        <Tabs
          defaultValue="all"
          className="w-full text-b1"
          value={tab}
          onValueChange={(value) =>
            setTab(value as 'all' | 'regular' | 'small')
          }
        >
          <div className="flex w-full items-center justify-between gap-4 overflow-x-auto px-4">
            <TabsList className="h-auto gap-3 before:h-0">
              {tabList.map((data, idx) => (
                <TabsTrigger
                  key={idx}
                  className="cursor-pointer rounded-3xl bg-gray-200 px-5 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                  value={data.value}
                >
                  {data.text}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              onClick={() =>
                navigate(`/meetings?search=&recruitment-type=${tab}&${moreUrl}`)
              }
              className="px-4 py-3"
              variant="ghost"
            >
              더보기
            </Button>
          </div>

          {tabList?.map((tab, idx) => (
            <TabsContent key={idx} value={tab.value} className="mt-5 w-full">
              <div className="overflow-x-auto pl-4">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="flex gap-4 md:grid md:grid-cols-4">
                    {datas?.map((meeting: RecommendationMeeting) => (
                      <MeetingCard
                        classNames="w-[40vw] md:w-full shrink-0"
                        key={meeting.id}
                        name={meeting.name}
                        image={meeting.thumbnailImage}
                        recruitmentStatus={meeting.recruitmentStatus}
                        recruitmentType={meeting.recruitmentType}
                        meetingStartTime={meeting.meetingStartTime}
                        meetingEndTime={meeting.meetingEndTime}
                        paymentAmount={meeting.paymentAmount}
                        onClick={() => navigate(`/meeting/${meeting.id}`)}
                        onLikeClick={() => {
                          if (isPending) return;
                          if (meeting) {
                            likeMeeting(
                              meeting as { id: number; liked: boolean },
                            );
                          }
                        }}
                        isLikeBtn={user}
                        liked={meeting.liked}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
