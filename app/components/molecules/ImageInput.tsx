import { useRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import CameraIcon from '@/components/atoms/icons/CameraIcon';
import CloseIcon from '@/components/atoms/icons/CloseIcon';

type ImageInputProps = {
  /** 이미지가 있는 배열 */
  existingImages?: string[];
  /** 이미지 변경 시 호출되는 콜백 함수 */
  onChangeExistingImages?: (images: string[]) => void;
  /** 업로드된 이미지 배열 (File 객체 또는 이미지 URL) */
  images: File[];
  /** 최대 업로드 가능한 이미지 수 (기본값: 10) */
  maxImages?: number;
  /** 이미지 변경 시 호출되는 콜백 함수 */
  onImagesChange: (images: File[]) => void;
};

/**
 * 이미지 URL을 가져오는 유틸리티 함수
 */
const getImageUrl = (image: File): string =>
  typeof image === 'string' ? image : URL.createObjectURL(image);

export const ImageInput = ({
  existingImages = [],
  onChangeExistingImages,
  images = [],
  maxImages = 10,
  onImagesChange,
}: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const remainingSlots = Math.max(
    0,
    maxImages - existingImages.length - images.length,
  );

  /**
   * 이미지 파일 선택 핸들러
   */
  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newImages = Array.from(files).slice(0, remainingSlots);
      if (newImages.length === 0) return;

      onImagesChange([...images, ...newImages]);
      // Reset file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [images, onImagesChange, remainingSlots],
  );

  const renderExistingImagePreview = (image: string, index: number) => {
    const imageKey = `url-${image}`;

    return (
      <div
        key={imageKey}
        className="relative size-26 overflow-hidden rounded-lg"
      >
        <img
          src={image}
          alt="업로드된 이미지"
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          className="absolute top-1.5 right-1.5 size-4 cursor-pointer rounded-full bg-gray-300"
          onClick={() =>
            onChangeExistingImages?.(
              existingImages.filter((_, idx) => idx !== index),
            )
          }
          aria-label="이미지 삭제"
        >
          <CloseIcon className="size-4 text-gray-800" />
        </button>
      </div>
    );
  };

  /**
   * 기본 이미지 미리보기 컴포넌트
   */
  const renderFileImagePreview = (image: File, index: number) => {
    const imageUrl = getImageUrl(image);
    const imageKey =
      typeof image === 'string'
        ? `url-${image}`
        : `file-${image.name}-${image.lastModified}`;

    return (
      <div
        key={imageKey}
        className="relative size-26 overflow-hidden rounded-lg"
      >
        <img
          src={imageUrl}
          alt={
            typeof image === 'string'
              ? '업로드된 이미지'
              : `업로드된 이미지 ${image.name}`
          }
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          className="absolute top-1.5 right-1.5 size-4 cursor-pointer rounded-full bg-gray-300"
          onClick={() =>
            onImagesChange?.(images.filter((_, idx) => idx !== index))
          }
          aria-label="이미지 삭제"
        >
          <CloseIcon className="size-4 text-gray-800" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* 기존 이미지 목록 렌더링 */}
      {existingImages.map((image, index) =>
        renderExistingImagePreview(image, index),
      )}
      {images.map((image, index) => renderFileImagePreview(image, index))}

      {/* 이미지 업로드 버튼 */}
      {remainingSlots > 0 && (
        <label className="flex size-26 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-500 transition-colors hover:bg-gray-50">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple={remainingSlots > 1}
            max={remainingSlots}
            onChange={handleImageChange}
            aria-label="이미지 업로드"
          />
          <CameraIcon className="size-6 text-gray-500" />
          <span className="text-xs text-gray-500">
            {images.length}/{maxImages}
          </span>
        </label>
      )}
    </div>
  );
};
