import { useEffect, useState } from 'react';
import type { CreateMeetingType } from '@/types/components';

import { cn } from '@/lib/tailwind';
import Text from '../atoms/text/Text';
import { Button } from '../atoms/button/Button';
import { Label } from '../atoms/label/Label';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group/RadioGroup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs/Tabs';
import GuideBookSelect from '../molecules/GuideBookSelect';

interface CreateMeetingFirstContentProps {
  userRole: string;
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeetingType;
  setForm: (form: CreateMeetingType) => void;
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
        return '';
      }
    }
  });
  const [isGuideBookRefer, setIsGuideBookRefer] = useState(
    form.isGuideBookRefer ?? 'false',
  );
  const [selectedGuideBook, setSelectedGuideBook] = useState<
    number | null | undefined
  >(form.guidbookReferenceId ?? null);

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
    console.log(meetingTypeTab);
    if (meetingTypeTab) {
      setForm({
        ...form,
        recruitmentType: meetingTypeTab === 'small' ? '소모임' : '정기모임',
        isGuideBookRefer:
          meetingTypeTab === 'regular' ? 'false' : form.isGuideBookRefer,
        guidbookReferenceId:
          meetingTypeTab === 'regular' ? null : form.guidbookReferenceId,
      });
    }
  }, [meetingTypeTab, setForm]);

  return (
    <div className="w-full">
      <div className="h-[300px] w-full overflow-y-scroll">
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
                          setForm({
                            ...form,
                            isGuideBookRefer: value as 'false' | 'true',
                          });
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
                            setSelectedGuideBook(value);
                            setForm({
                              ...form,
                              guidbookReferenceId: value ?? null,
                            });
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
        className="absolute bottom-0 w-full"
        disabled={userRole === '일반 참가자'}
      >
        다음
      </Button>
    </div>
  );
}
