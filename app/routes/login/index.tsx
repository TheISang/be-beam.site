import LoginCard from '@/routes/login/_components/LoginCard';
import { metaTemplates } from '@/shared/config/meta-templates';
import { LoginTemplate } from '@/routes/login/_components/LoginTemplate';
import { guestOnlyMiddleware } from '@/shared/server/auth';

export function meta() {
  return metaTemplates.login();
}

export const unstable_middleware = [guestOnlyMiddleware()];

export default function Login() {
  return (
    <LoginTemplate>
      <LoginCard />
    </LoginTemplate>
  );
}
