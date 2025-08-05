import Text from '../atoms/text/Text';
import ValueCard from '../molecules/ValueCard';
import GridGroup from '../organisms/gridGroup/GridGroup';

export default function ValueSection() {
  const values = [
    {
      title: '연결망',
      des: '사람과 사람 간, 지역과 사람 간 느슨한 연결망을 만듭니다.',
    },
    {
      title: '행동',
      des: '주체성이 담긴 행동을 통해서 사회 구성원의 인식 및 행동의 변화를 이끌어냅니다.',
    },
    {
      title: '청년',
      des: '청년의 주체성 있는 사회참여활동을 기반으로 합니다',
    },
    {
      title: '공감',
      des: '사회 구성원에 대한 공감대를 기반으로 서로에게 즐겁고 따뜻한 활동을 진행합니다.',
    },
    {
      title: '안정',
      des: '서로를 존중하고 배려하며 서로에게 안정감을 줄 수 있는 활동을 진행합니다.',
    },
    {
      title: '공감',
      des: '서로의 이야기를 경청하고, 존중하는 대화를 통해 활동을 진행합니다.',
    },
  ];

  return (
    <div className="mt-40 w-full bg-gray-100">
      <div className="mx-auto max-w-[1480px] py-24 text-center">
        <Text variant="H2_Semibold">비빔이 추구하는 가치</Text>
        <Text variant="T4_Regular" color="gray-500" className="mt-2">
          연경망을 통한 따뜻한 사회로
        </Text>

        <GridGroup columns={3} className="mt-12 max-w-[1145px]">
          {values.map((value, idx) => (
            <ValueCard key={idx} title={value.title} des={value.des} />
          ))}
        </GridGroup>
      </div>
    </div>
  );
}
