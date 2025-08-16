import { useEffect, useState } from 'react';
import type { CreateMeeting } from '@/shared/types/components';

import { cn } from '@/styles/tailwind';
import Text from '@/shared/components/ui/Text';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup';
import { Label } from '@/shared/components/ui/Label';
import { Button } from '@/shared/components/ui/Button';
import GuideBookSelect from '@/features/guidebooks/components/GuideBookSelect';

interface CreateMeetingFirstContentProps {
  userRole: string;
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeeting;
  setForm: (form: CreateMeeting) => void;
}

export default function CreateMeetingFirstContent({
  userRole,
  tab,
  setTab,
  form,
  setForm,
}: CreateMeetingFirstContentProps) {
  const [meetingTypeTab, setMeetingTypeTab] = useState(() => {
    if (form.recruitmentType) {
      return form.recruitmentType === '소모임' ? 'small' : 'regular';
    } else {
      if ((userRole as string) === '정기모임 호스트') {
        return 'regular';
      } else if ((userRole as string) === '소모임 호스트') {
        return 'small';
      } else {
        return undefined;
      }
    }
  });
  const [isGuideBookRefer, setIsGuideBookRefer] = useState(() => {
    return 'isGuideBookRefer' in form ? form.isGuideBookRefer : 'false';
  });
  const [selectedGuideBook, setSelectedGuideBook] = useState<number | null>(
    () => {
      const guideId =
        'guidbookReferenceId' in form ? form.guidbookReferenceId : null;
      return typeof guideId === 'number' ? guideId : null;
    },
  );

  const meetingTypeTabList = [
    {
      label: '정기모임',
      value: 'regular',
    },
    {
      label: '소모임',
      value: 'small',
    },
  ];
  const radioList = [
    {
      label: '가이드북을 참고 할게요!',
      value: 'true',
    },
    {
      label: '나중에 참고하겠습니다.',
      value: 'false',
    },
  ];

  useEffect(() => {
    if (meetingTypeTab) {
      setForm(
        meetingTypeTab === 'regular'
          ? {
              ...form,
              recruitmentType: '정기모임',
              isGuideBookRefer: 'false',
              guidebookReferenceId: null,
            }
          : {
              ...form,
              recruitmentType: '소모임',
              isGuideBookRefer: isGuideBookRefer,
              guidebookReferenceId:
                isGuideBookRefer === 'false' ? null : selectedGuideBook,
            },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingTypeTab, isGuideBookRefer, selectedGuideBook, setForm]);

  return (
    <div className="w-full">
      <div className="w-full">
        <Text variant="T2_Semibold" className="mb-4">
          모임 분류
        </Text>
        <Tabs
          value={meetingTypeTab}
          onValueChange={(value) => setMeetingTypeTab(value)}
        >
          <TabsList className="h-auto gap-2 before:h-0">
            {meetingTypeTabList.map((tab2) => (
              <TabsTrigger
                key={tab2.value}
                value={tab2.value}
                disabled={
                  (tab2.value === 'regular' &&
                    (userRole as string) !== '정기모임 호스트') ||
                  (tab2.value === 'small' &&
                    (userRole as string) === '일반 참가자')
                }
                className={cn(
                  'h-auto rounded-md border-1 border-gray-300 px-4 py-[10px] text-b1 data-[state=active]:border-primary data-[state=active]:bg-primary-light data-[state=active]:text-primary data-[state=active]:after:h-0',
                )}
              >
                {tab2.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {meetingTypeTabList.map((tab2) => (
            <TabsContent key={tab2.value} value={tab2.value}>
              {tab2.value === 'small' && (
                <>
                  <div className="mt-5 w-full">
                    <Text variant="T2_Semibold" className="mb-3">
                      가이드북 참고 여부
                    </Text>
                    <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-200 p-5">
                      <Text variant="B3_Regular" color="gray-800">
                        📢 이 서비스(또는 프로그램)는 원활한 이용을 위해
                        가이드북을 제공합니다. 필요 시 언제든 참고하실 수
                        있으며, 아래에서 열람 여부를 선택해주세요.
                      </Text>

                      <RadioGroup
                        value={isGuideBookRefer}
                        onValueChange={(value) => {
                          setIsGuideBookRefer(value as 'false' | 'true');
                          if (form.recruitmentType === '소모임') {
                            setForm({
                              ...form,
                              isGuideBookRefer: value as 'false' | 'true',
                            });
                          }
                        }}
                        className="mt-6 gap-4"
                      >
                        {radioList.map((option, idx) => (
                          <div
                            key={idx}
                            className="mb-1 flex items-center gap-3"
                          >
                            <RadioGroupItem
                              id={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor={option.value}
                                className="cursor-pointer text-b1"
                              >
                                {option.label}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  {isGuideBookRefer === 'true' && (
                    <div className="mt-5 w-full">
                      <Text variant="T2_Semibold" className="mb-3">
                        가이드북 선택
                      </Text>
                      <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-200 p-5">
                        <Text variant="B3_Regular" color="gray-800">
                          📢 상황에 맞는 가이드북을 골라주세요 🙂 각
                          가이드북에는 꼭 필요한 정보만 담겨 있어요. 어떤 걸
                          선택하셔도, 나중에 다시 볼 수 있으니 걱정 마세요!
                        </Text>
                        <GuideBookSelect
                          value={selectedGuideBook}
                          onValueChange={(value) => {
                            setSelectedGuideBook(value as number);
                            if (form.recruitmentType === '소모임') {
                              setForm({
                                ...form,
                                guidebookReferenceId:
                                  form.isGuideBookRefer === 'false'
                                    ? null
                                    : form.guidebookReferenceId,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Button
        onClick={() => {
          setTab(tab + 1);
        }}
        className="mt-20 w-full"
        disabled={userRole === '일반 참가자'}
      >
        다음
      </Button>
    </div>
  );
}
