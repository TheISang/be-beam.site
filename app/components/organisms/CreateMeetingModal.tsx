import { useState } from 'react';
import { useModalStore } from '@/stores/useModalStore';
import type { CreateMeetingType } from '@/types/components';

import clsx from 'clsx';
import { Dialog, DialogContent } from '../atoms/dialog/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs/Tabs';
import CreateMeetingFirstContent from './CreateMeetingFirstContent';
import CreateMeetingSecondContent from './CreateMeetingSecondContent';
import CreateMeetingThirdContent from './CreateMeetingThirdContent';
import CreateMeetingFourthContent from './CreateMeetingFourthContent';
import { cn } from '@/lib/tailwind';

export default function CreateMeetingModal() {
  const { isOpen, close } = useModalStore();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<CreateMeetingType>({
    thumbnailImage: null,
    thumbnailImagePreview: '',
    name: '',
    recruitmentType: undefined,
    selectionType: null,
    meetingMode: null,
    topicId: null,
    hashtags: [],
    isGuideBookRefer: 'false',
    guidbookReferenceId: null,
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

  console.log(form);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[600px] max-w-[820px]">
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
                    className={clsx(
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
      </DialogContent>
    </Dialog>
  );
}
