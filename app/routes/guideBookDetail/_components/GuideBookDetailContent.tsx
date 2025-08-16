import Text from '../../../shared/components/ui/Text';
import { Tag } from '../../../shared/components/ui/Tag';
import InfoItem from '../../../shared/components/common/InfoItem';

import type { Guidebook } from '@/shared/types/entities';

export default function GuideBookDetailContent({
  guideBook,
}: {
  guideBook: Guidebook;
}) {
  const infoData = [
    {
      icon: '/images/icons/g_step.svg',
      iconAlt: 'step_icon',
      title: '추천 단계',
      text: guideBook?.level,
    },
    {
      icon: '/images/icons/g_person.svg',
      iconAlt: 'person_icon',
      title: '추천 대상',
      text: guideBook?.targetType,
    },
    {
      icon: '/images/icons/g_clock.svg',
      iconAlt: 'clock_icon',
      title: '예상 소요시간',
      text: guideBook?.time,
    },
  ];

  return (
    <div className="box-border w-full py-6">
      <Text variant="T3_Semibold" color="primary">
        {guideBook?.guidebookType}
      </Text>
      <Text variant="H2_Semibold" className="mt-2">
        {guideBook?.title}
      </Text>
      <Text variant="T4_Regular" className="mt-5">
        {guideBook?.description}
      </Text>

      <div className="mt-5 flex w-full items-center gap-2">
        {guideBook?.hashtags?.map((hashtag, idx) => (
          <Tag key={idx} variant="primary" className="px-2 py-4 text-b1">
            {`#${hashtag}`}
          </Tag>
        ))}
      </div>

      <div className="mt-8 w-full">
        {infoData.map((info, idx) => (
          <div key={idx} className="mb-5 flex w-full items-center gap-16">
            <InfoItem
              icon={info.icon}
              iconAlt={info.iconAlt}
              text={info.title}
              textStyle="text-b2 text-gray-600"
              wrapStyle="gap-3 w-[120px]"
            />
            <Text variant="B2_Medium" className="flex-1">
              {info.text}
            </Text>
          </div>
        ))}
      </div>

      <div className="box-border w-full rounded-xl bg-gray-100 p-7">
        <InfoItem
          icon="/images/icons/good.svg"
          iconAlt="good_icon"
          text="다음과 같은 분들에게 유용해요"
          textStyle="text-b1"
          wrapStyle="gap-2 pb-4 mb-4 border-b-1 border-gray-300"
        />

        {guideBook?.benefits.map((benefit, idx) => (
          <InfoItem
            key={idx}
            icon="/images/icons/check.svg"
            iconAlt="check_icon"
            iconStyle="w-4 h-4"
            text={benefit}
            textStyle="text-b2"
            wrapStyle="gap-3 mb-2"
          />
        ))}
      </div>
    </div>
  );
}
