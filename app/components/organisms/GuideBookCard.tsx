import Text from '../atoms/text/Text';
import { useNavigate } from 'react-router';
import type { GuidebookSummary } from '@/types/entities';

export default function GuideBookCard({ data }: { data: GuidebookSummary }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
      key={data.id}
      onClick={() => navigate(`/guideBook/${data.id}`)}
    >
      <img
        className="h-[240px] w-full object-cover"
        src={data.thumbnailImage}
        alt="guidBook_thumbnail"
      />
      <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
        <Text variant="T2_Semibold" className="truncate">
          {data.title}
        </Text>
        <Text variant="T4_Regular" color="gray-700" className="mt-3 truncate">
          {data.description}
        </Text>
      </div>
    </div>
  );
}
