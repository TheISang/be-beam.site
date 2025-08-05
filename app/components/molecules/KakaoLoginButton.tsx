import Text from '../atoms/text/Text';

export const KakaoLoginButton = () => {
  return (
    <a
      href={import.meta.env.VITE_KAKAO_LOGIN_URL}
      className="mt-20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-4 text-black"
    >
      <img src="/images/icons/kakao.svg" alt="kakao_icon" />
      <Text variant="T1_Regular" color="brown">
        카카오로 계속하기
      </Text>
    </a>
  );
};
