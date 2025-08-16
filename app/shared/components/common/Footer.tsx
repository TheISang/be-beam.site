import Text from '@/shared/components/ui/Text';

export default function Footer() {
  return (
    <div className="w-full border-t-1 border-gray-300 py-20">
      <div className="mx-auto w-[1480px]">
        <Text variant="B3_Regular" color="gray-600">
          be:beam
        </Text>
        <Text variant="B3_Regular" color="gray-600" className="mt-2">
          이용약관
          <span className="mx-2 text-gray-400">|</span>
          개인정보 처리방침
          <span className="mx-2 text-gray-400">|</span>
        </Text>
        <Text variant="B3_Regular" color="gray-600" className="mt-2">
          Copyright © 2024 Be:Beam. All Rights Reserved.
        </Text>
      </div>
    </div>
  );
}
