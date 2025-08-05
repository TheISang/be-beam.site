import { cn } from '@/lib/tailwind';
import StarIcon from '../atoms/icons/StarIcon';
import StarOutlineIcon from '../atoms/icons/StarOutlineIcon';
import { useState } from 'react';

type RatingInputProps = {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  starClassName?: string;
  count?: number;
};

export default function RatingInput({
  value = 0,
  onChange,
  disabled = false,
  className,
  starClassName,
  count = 5,
}: RatingInputProps) {
  // 사용자가 마우스를 올렸을 때 표시할 별점 값을 저장합니다.
  // 이 값은 클릭되지 않은 상태에서 시각적인 피드백을 제공합니다.
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  /**
   * 별을 클릭했을 때 호출되는 함수입니다.
   * disabled 상태가 아니면 onChange 콜백을 통해 새로운 별점 값을 전달합니다.
   * @param newValue 클릭된 별의 값 (1부터 count까지)
   */
  const handleClick = (newValue: number) => {
    if (!disabled && onChange) {
      onChange(newValue);
    }
  };

  /**
   * 별 위에 마우스를 올렸을 때 호출되는 함수입니다.
   * hoverValue를 업데이트하여 해당 별까지 채워진 것처럼 보이게 합니다.
   * @param hoveredRating 마우스가 올라간 별의 값
   */
  const handleMouseEnter = (hoveredRating: number) => {
    if (!disabled) {
      setHoverValue(hoveredRating);
    }
  };

  /**
   * 별에서 마우스가 벗어났을 때 호출되는 함수입니다.
   * hoverValue를 null로 설정하여 호버 효과를 초기화합니다.
   */
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverValue(null);
    }
  };

  return (
    <div className={cn('flex', className)}>
      {Array.from({ length: count }, (_, index) => {
        const ratingValue = index + 1;
        // 현재 별의 상태를 결정합니다.
        // 마우스 오버 상태라면 hoverValue를 기준으로, 아니라면 실제 value를 기준으로 채워진 별을 표시합니다.
        const isFilled =
          (hoverValue !== null ? hoverValue : value) >= ratingValue;

        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              'p-1 focus:outline-none',
              {
                'cursor-pointer': !disabled,
                'cursor-not-allowed': disabled,
              },
              starClassName,
            )}
            disabled={disabled}
            aria-label={`${ratingValue}점`}
          >
            {isFilled ? (
              <StarIcon className="size-8 text-primary" /> // 채워진 별
            ) : (
              <StarOutlineIcon className="size-8 text-gray-300" /> // 비어있는 별
            )}
          </button>
        );
      })}
    </div>
  );
}
