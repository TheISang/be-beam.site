import { guestOnly } from '@/lib/auth.server';
import type { Route } from './+types/login';
import { LoginTemplate } from '../components/templates/LoginTemplate';
import LoginCard from '@/components/organisms/LoginCard';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.login();
}

export async function loader({ request }: Route.LoaderArgs) {
  return guestOnly(request, '/');
}

export default function Login() {
  return (
    <LoginTemplate>
      <LoginCard />
    </LoginTemplate>
  );
}
