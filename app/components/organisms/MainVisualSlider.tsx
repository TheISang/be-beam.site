import type { Banner } from '@/types/entities';
import Slider from './Slider';

export default function MainVisualSlider({ banners }: { banners: Banner[] }) {
  return (
    <Slider
      datas={banners}
      isBtn={false}
      slideWidth="max-w-[1480px]"
      slideHeight="h-[400px]"
    />
  );
}
