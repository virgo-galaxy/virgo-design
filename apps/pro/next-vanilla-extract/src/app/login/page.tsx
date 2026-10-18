import { DemoLoginPage } from '@/demo/react';
import { LoginView } from '@/features/auth/view';

export default function Page() {
  return process.env.NEXT_PUBLIC_DEMO_API === 'true' ? <DemoLoginPage /> : <LoginView />;
}
