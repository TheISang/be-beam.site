import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CloseIcon from '../icons/CloseIcon';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

type ImageData = string;

interface ImageViewerModalProps {
  title: string;
  images: ImageData[];
  initialIndex?: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  title,
  images,
  initialIndex = 0,
  isOpen,
  onOpenChange,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset to initial index when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <div className="mx-4 w-full overflow-hidden rounded-xl bg-white shadow-lg">
            {/* Header */}
            <div className="relative h-[52px] border-b border-gray-200">
              <div className="relative flex h-full items-center justify-center">
                <Dialog.Title className="text-base font-semibold text-gray-900">
                  {title}
                </Dialog.Title>
                <Dialog.Close className="absolute top-1.5 right-1.5 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none">
                  <CloseIcon className="size-6 text-gray-900" />
                  <span className="sr-only">닫기</span>
                </Dialog.Close>
              </div>
            </div>

            {/* Main Image Viewer */}
            <div className="relative bg-gray-100">
              <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                initialSlide={initialIndex}
                className="aspect-square max-h-[60vh] w-full"
                key={isOpen ? 'open' : 'closed'} // Force re-render when modal opens
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <img
                        src={image}
                        alt={''}
                        className="max-h-full max-w-full object-contain"
                        loading={index === initialIndex ? 'eager' : 'lazy'}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-black/40 focus:ring-2 focus:ring-white focus:outline-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">이전 이미지</span>
              </button>
              <button className="swiper-button-next-custom absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-black/40 focus:ring-2 focus:ring-white focus:outline-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">다음 이미지</span>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                <div className="rounded-full bg-black/40 px-3 py-1 text-sm text-white">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Thumbnail List */}
            <div className="p-2.5">
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode]}
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbnail-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="!w-[70px] p-1">
                    <div
                      className={`h-[70px] w-[70px] cursor-pointer overflow-hidden rounded-xl transition-all duration-200 ${
                        index === currentIndex
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
