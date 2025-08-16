import Text from '@/shared/components/ui/Text';

export default function ValueCard({
  title,
  des,
}: {
  title: string;
  des: string;
}) {
  return (
    <div className="box-border w-full rounded-2xl border-[1px] border-gray-200 bg-white p-5 text-left">
      <Text variant="T3_Semibold" color="primary">
        {title}
      </Text>
      <Text variant="B2_Medium" className="mt-2">
        {des}
      </Text>
    </div>
  );
}
