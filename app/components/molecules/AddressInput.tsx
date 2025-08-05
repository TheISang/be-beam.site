'use client';

import type React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode'; // 다음 주소 검색 팝업 훅
import { Input } from '@/components/atoms/input/Input'; // 당신의 Input 컴포넌트
import { Button } from '@/components/atoms/button/Button'; // 당신의 Button 컴포넌트
import { cn } from '@/lib/tailwind'; // 당신의 cn 유틸리티 함수

const SCRIPT_URL =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface AddressInputProps {
  address: string;
  addressDetail: string;
  onChange: (address: string, addressDetail: string) => void;
  placeholder?: string;
  detailPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

interface DaumAddressData {
  address: string; // 기본 주소 (도로명 또는 지번)
  addressType: 'R' | 'J'; // 주소 타입 (R: 도로명, J: 지번)
  bname: string; // 법정동명 (예: '역삼동')
  buildingName: string; // 건물명 (예: '아크로타워')
  roadAddress: string; // 도로명 주소
  roadAddressEnglish: string; // 도로명 주소 영문
  autoJibunAddress: string; // 자동 생성 지번 주소
  autoRoadAddress: string; // 자동 생성 도로명 주소
  zonecode: string; // 우편번호 (5자리)
  sido: string; // 시/도명 (예: '서울')
  sigungu: string; // 시/군/구명 (예: '강남구')
  bcode: string; // 법정동 코드
}

export const AddressInput: React.FC<AddressInputProps> = ({
  address,
  addressDetail,
  onChange,
  placeholder = '주소를 검색해주세요.',
  detailPlaceholder = '상세 주소를 입력해주세요.',
  disabled,
  className,
  id,
}) => {
  const open = useDaumPostcodePopup(SCRIPT_URL);

  // 다음 주소 검색 팝업에서 주소를 선택했을 때 호출되는 콜백
  const handleComplete = (data: DaumAddressData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      // 도로명 주소인 경우
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    onChange(fullAddress, '');
  };

  const handleAddressSearch = () => {
    if (disabled) return;
    open({ onComplete: handleComplete });
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(address, e.target.value);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex w-full items-center gap-2 rounded-lg border-1 border-gray-300 bg-white p-3">
        <Input
          id={id}
          type="text"
          value={address}
          placeholder={placeholder}
          readOnly
          onClick={handleAddressSearch}
          className="h-auto flex-1 cursor-pointer border-none bg-transparent p-0 shadow-none"
          disabled={disabled}
        />
        <Button
          type="button"
          onClick={handleAddressSearch}
          disabled={disabled}
          variant="tertiary"
          className="h-auto min-w-auto border-none p-0 text-b1 text-primary"
        >
          수정
        </Button>
      </div>

      <Input
        id={`${id}-detail`}
        type="text"
        value={addressDetail}
        placeholder={detailPlaceholder}
        onChange={handleDetailAddressChange}
        className="border border-gray-300 bg-white p-3 shadow-none"
        disabled={disabled}
      />
    </div>
  );
};
