import Text from '../atoms/text/Text';

export default function RecruitmentTypeAndTopic({
  recruitmentType,
  topic,
}: {
  recruitmentType: string;
  topic: string;
}) {
  return (
    <div className="flex items-center">
      <Text
        variant="B1_Semibold"
        color="primary"
        className='relative after:mx-3 after:inline-block after:h-4 after:w-px after:bg-gray-300 after:align-middle after:content-[""]'
      >
        {recruitmentType}
      </Text>
      <Text variant="B1_Semibold">{topic}</Text>
    </div>
  );
}
