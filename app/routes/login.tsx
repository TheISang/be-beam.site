import { LoginTemplate } from '../components/templates/LoginTemplate';
import LoginCard from '@/components/organisms/LoginCard';

export function meta() {
  return [
    { title: '회원가입/로그인 화면입니다.' },
    { name: 'description', content: '회원가입 및 로그인을 진행해주세요.' },
  ];
}

export default function Login() {
  return (
    <LoginTemplate>
      <LoginCard />
    </LoginTemplate>
  );
}
