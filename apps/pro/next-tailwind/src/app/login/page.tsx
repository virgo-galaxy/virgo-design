import { LoginView } from '@/features/auth/view';
import { DemoLoginPage } from '@/mock/react';

export default function Page() {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'true' ? <DemoLoginPage /> : <LoginView />;
}
