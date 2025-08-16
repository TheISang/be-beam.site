import { useEffect, useState } from 'react';
import { metaTemplates } from '@/shared/config/meta-templates';

import { cn } from '@/styles/tailwind';
import type { CreateMeeting } from '@/shared/types/components';
import CreateMeetingTemplate from '@/routes/createMeeting/_components/CreateMeetingTemplate';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import CreateMeetingFirstContent from '@/routes/createMeeting/_components/CreateMeetingFirstContent';
import CreateMeetingSecondContent from '@/routes/createMeeting/_components/CreateMeetingSecondContent';
import CreateMeetingThirdContent from '@/routes/createMeeting/_components/CreateMeetingThirdContent';
import CreateMeetingFourthContent from '@/routes/createMeeting/_components/CreateMeetingFourthContent';
import type { Route } from '.react-router/types/app/routes/createMeeting/+types';

export function meta() {
  return metaTemplates.createMeeting();
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  return title;
}

export default function CreatedMeeting() {
  // 임시 user role 설정
  const userRole: '일반 참가자' | '정기모임 호스트' | '소모임 호스트' =
    '정기모임 호스트';

  const tabList = [
    {
      label: '모임 선택',
      value: 0,
    },
    {
      label: '모임 소개',
      value: 1,
    },
    {
      label: '상세 정보',
      value: 2,
    },
    {
      label: '일정 등록',
      value: 3,
    },
  ];
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<CreateMeeting>({
    thumbnailImage: null,
    thumbnailImagePreview: '',
    name: '',
    recruitmentType: undefined,
    selectionType: null,
    meetingMode: null,
    topicId: null,
    hashtags: [],
    isGuideBookRefer: 'false',
    guidebookReferenceId: null,
    introduction: '',
    images: [],
    imagesPreview: [],
    minParticipants: 0,
    maxParticipants: 0,
    hostDescription: '',
    recruitingStartTime: null,
    recruitingEndTime: null,
    paymentAmount: 0,
    info: '',
    schedules: [
      {
        meetingDate: '',
        meetingStartTime: '',
        meetingEndTime: '',
        address: '',
        addressDetail: '',
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [tab]);

  return (
    <CreateMeetingTemplate>
      <Tabs value={String(tab)} className="relative">
        <div className="mt-5 flex w-full justify-center">
          <TabsList className="h-auto py-8 text-t3 before:h-0">
            {tabList.map((tab1) => (
              <div key={tab1.value} className="flex flex-col items-center">
                <TabsTrigger
                  value={String(tab1.value)}
                  className={cn(
                    "= relative z-2 mx-3 h-9 w-9 cursor-pointer rounded-full bg-gray-300 text-white after:absolute after:top-1/2 after:left-[calc(100%+4px)] after:h-[2px] after:w-[80px] after:-translate-y-1/2 after:border-t-[2px] after:content-[''] last:after:hidden data-[state=active]:bg-primary data-[state=active]:after:bg-transparent",
                    tab > tab1.value && 'bg-primary',
                    tab1.value >= tab && tab1.value < tabList.length - 1
                      ? 'after:border-dashed after:border-gray-500'
                      : tab1.value < tab && tab1.value < tabList.length - 1
                        ? 'after:border-solid after:border-primary'
                        : 'after:border-h-0',
                  )}
                >
                  {tab > tab1.value ? (
                    <img src="/images/icons/w_check.svg" alt="check_icon" />
                  ) : (
                    tab1.value + 1
                  )}
                </TabsTrigger>

                <TabsTrigger
                  value={String(tab1.value)}
                  className={cn(
                    tab > tab1.value && 'text-gray-500',
                    'mt-4 after:h-0 data-[state=active]:text-primary',
                  )}
                >
                  {tab1.label}
                </TabsTrigger>
              </div>
            ))}
          </TabsList>
        </div>

        {tabList.map((tab1) => (
          <TabsContent key={tab1.value} value={String(tab1.value)}>
            {tab1.value === 0 ? (
              <CreateMeetingFirstContent
                userRole={userRole}
                tab={tab}
                setTab={setTab}
                form={form}
                setForm={setForm}
              />
            ) : tab1.value === 1 ? (
              <CreateMeetingSecondContent
                tab={tab}
                setTab={setTab}
                form={form}
                setForm={setForm}
              />
            ) : tab1.value === 2 ? (
              <CreateMeetingThirdContent
                tab={tab}
                setTab={setTab}
                form={form}
                setForm={setForm}
              />
            ) : (
              <CreateMeetingFourthContent
                tab={tab}
                setTab={setTab}
                form={form}
                setForm={setForm}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </CreateMeetingTemplate>
  );
}
