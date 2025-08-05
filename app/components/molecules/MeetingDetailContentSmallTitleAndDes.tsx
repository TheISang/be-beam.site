import Text from '../atoms/text/Text';

export default function MeetingDetailContentSmallTitleAndDes({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mb-6">
      <Text variant="B2_Medium" color="gray-600" className="mb-2">
        {title}
      </Text>
      <Text variant="B2_Medium">{text}</Text>
    </div>
  );
}
