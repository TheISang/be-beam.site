import HomeTemplate from '@/components/templates/HomeTemplate';
import MainVisualSlider from '@/components/organisms/MainVisualSlider';
import AboutSection from '@/components/sections/AboutSection';
import MeetingRecommendationSection from '@/components/sections/MeetingRecommendationSection';
import ValueSection from '@/components/sections/ValueSection';

export function meta() {
  return [
    { title: '홈 화면입니다.' },
    {
      name: 'description',
      content: 'BE:BEAM 모임 커뮤니티에 오신 것을 환영합니다.',
    },
  ];
}
export default function Home() {
  return (
    <HomeTemplate>
      <MainVisualSlider />
      <AboutSection />
      <MeetingRecommendationSection />
      <ValueSection />
    </HomeTemplate>
  );
}
