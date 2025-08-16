import { redirect } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';

export function meta() {
  return metaTemplates.loginCallback();
}

export function clientLoader() {
  return redirect('/');
}

export default function LoginCallback() {
  return <div>로그인 콜백</div>;
}
