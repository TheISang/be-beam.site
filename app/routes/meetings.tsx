import CommonTemplate from '@/components/templates/CommonTemplate';

export function meta() {
  return [
    { title: '모임 페이지' },
    { name: 'description', content: '모임을 생성하거나 모임에 참여하세요!' },
  ];
}

export default function Meetings() {
  return (
    <CommonTemplate>
      <h1>모임 페이지</h1>
    </CommonTemplate>
  );
}
