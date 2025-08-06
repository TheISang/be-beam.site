import Text from '../atoms/text/Text';

export default function MeetingRecommendations({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`${className} w-full text-left`}>
      <Text variant="H2_Semibold">{title}</Text>

      {/* 나중에 Tab으로 제작 */}
      <div className="mt-6 mb-5 flex items-center gap-3">
        <button className="rounded-full bg-gray-900 px-4 py-2 text-b1 text-white">
          전체
        </button>
        <button className="rounded-full bg-gray-200 px-4 py-2 text-b1">
          정기모임
        </button>
        <button className="rounded-full bg-gray-200 px-4 py-2 text-b1">
          소모임
        </button>
      </div>

      {/* Tab 안에 미팅 카드 */}
    </div>
  );
}
