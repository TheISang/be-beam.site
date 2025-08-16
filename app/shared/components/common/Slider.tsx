import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { Banner } from '@/shared/types/entities';
import { cn } from '@/styles/tailwind';
import Text from '../ui/Text';
import { Button } from '../ui/Button';

export default function Slider({
  images,
  slidesPreView = 1,
  spaceBetween = 20,
  isLoop = true,
  delay = 3000,
  isBtn = true,
  isPagination = false,
  isCount = false,
  slideWidth,
  slideHeight,
  datas,
}: {
  images?: string[];
  slidesPreView?: number;
  spaceBetween?: number;
  isLoop?: boolean;
  delay?: number;
  isBtn?: boolean;
  isPagination?: boolean;
  isCount?: boolean;
  slideWidth: string;
  slideHeight: string;
  datas?: Banner[];
}) {
  const navigate = useNavigate();

  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-xl', slideWidth)}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // ✅ Swiper 인스턴스를 ref에 저장
          setCurrentIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={isPagination}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPreView}
        loop={isLoop}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
      >
        {images
          ? images?.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={cn('w-full object-cover', slideHeight)}
                />
              </SwiperSlide>
            ))
          : datas?.map((data, index) => (
              <SwiperSlide key={index}>
                <img
                  src={data.bannerImage}
                  alt={`Slide ${index + 1}`}
                  className={cn(
                    'w-full cursor-pointer object-cover',
                    slideHeight,
                  )}
                  onClick={() => navigate(data.bannerUrl)}
                />
              </SwiperSlide>
            ))}

        {isCount && (
          <Text
            variant="C2_Regular"
            className="absolute top-5 right-5 z-10 flex h-[26px] w-[50px] items-center justify-center rounded-3xl bg-white shadow-lg"
          >{`${currentIndex + 1} / ${images?.length}`}</Text>
        )}

        <Button
          variant="tertiary"
          size="icon"
          className={cn(
            'absolute top-1/2 left-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none bg-white shadow-md',
            isBtn && images?.length === 1
              ? 'cursor-default bg-gray-300'
              : isBtn && images?.length !== 1
                ? 'bg-white'
                : 'hidden',
          )}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img src="/images/icons/prev.svg" alt="prev_icon" />
        </Button>

        <Button
          variant="tertiary"
          size="icon"
          className={cn(
            'absolute top-1/2 right-5 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-none shadow-md',
            isBtn && images?.length === 1
              ? 'cursor-default bg-gray-300'
              : isBtn && images?.length !== 1
                ? 'bg-white'
                : 'hidden',
          )}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img src="/images/icons/next.svg" alt="next_icon" />
        </Button>
      </Swiper>
    </div>
  );
}
