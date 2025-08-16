import Text from '@/shared/components/ui/Text';

export default function AboutSection() {
  return (
    <section className="mt-20 w-full max-w-[1480px] overflow-hidden rounded-3xl bg-[#FFFBF2] py-20 pl-24">
      <div className="grid grid-cols-2 items-center justify-between gap-21">
        <div>
          <Text variant="T2_Semibold" color="primary">
            About us
          </Text>

          <Text variant="H0_Bold" className="mt-1">
            BE:BEAM
          </Text>

          <Text variant="H2_Semibold">
            비빔(BE:BEAM)은 비빔밥의 재료처럼 다양한 청년들이 모여,
            <br />
            빗줄기(BEAM)처럼 따뜻한 연결망을 이어나간다는 의미입니다.
          </Text>

          <Text variant="T4_Regular" color="gray-600" className="mt-8">
            2022년 소셜다이닝을 시작으로 다양한 활동을 진행하고 있습니다.
            <br />
            현재 비빔은, 커뮤니티를 만드는 것에서 그치지 않고
            <br />
            누구나 참여할 수 있는 활동을 만들어나가고있습니다.
          </Text>
        </div>

        <div className="flex items-center gap-8">
          <img src="/images/about_1.png" alt="커뮤니티 활동 이미지 1" />
          <img src="/images/about_2.png" alt="커뮤니티 활동 이미지 2" />
        </div>
      </div>
    </section>
  );
}
