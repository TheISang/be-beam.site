import Text from '../atoms/text/Text';
import MeetingRecommendations from '../organisms/MeetingRecommendations';

export default function MeetingRecommendationSection() {
  return (
    <div className="mt-20 flex w-full max-w-[1480px] flex-col items-center pt-10">
      <Text variant="H1_Bold">다양한 사람들이 다양하게 어우러지는 모임</Text>
      <Text variant="T1_Regular" color="gray-500" className="mt-3 mb-28">
        관심사에 맞게 모임을 Pick 하세요
      </Text>

      <MeetingRecommendations
        title="좋아요 기반  추천 리스트"
        className="mb-20"
      />
      <MeetingRecommendations title="랜덤 추천 리스트" className="mb-20" />
      <MeetingRecommendations title="최신 등록 모임 리스트" />
    </div>
  );
}
