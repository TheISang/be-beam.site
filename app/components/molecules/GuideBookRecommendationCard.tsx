import type { GuidebookRecommendation } from '@/types/entities';
import Text from '../atoms/text/Text';

export default function GuideBookRecommendationCard({
  data,
  onClick,
}: {
  data: GuidebookRecommendation;
  onClick: () => void;
}) {
  const { id, thumbnailImage, title, description } = data;

  return (
    <div
      key={id}
      onClick={onClick}
      className="mb-3 box-border flex w-full cursor-pointer items-center gap-5 rounded-lg border-1 border-gray-300 p-6 transition-all duration-700 hover:bg-gray-100"
    >
      <img
        className="h-20 w-20 border-1 border-gray-300 object-cover"
        src={thumbnailImage}
        alt="guideBook_thumbnail"
      />

      <div className="flex-1">
        <Text variant="B1_Semibold" className="mb-2">
          {title}
        </Text>
        <Text variant="C2_Regular" color="gray-600">
          {description}
        </Text>
      </div>
    </div>
  );
}
