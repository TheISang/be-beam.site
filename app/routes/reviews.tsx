import CommonTemplate from '@/components/templates/CommonTemplate';

export function meta() {
  return [
    { title: '리뷰 페이지' },
    {
      name: 'description',
      content: '여러 사람들이 작성한 모임 후기를 확인하세요!',
    },
  ];
}
export default function Reviews() {
  return (
    <CommonTemplate>
      <h1>모임 후기 페이지</h1>
    </CommonTemplate>
  );
}
