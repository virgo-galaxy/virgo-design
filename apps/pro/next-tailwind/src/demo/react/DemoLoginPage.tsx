import { LoginView } from '@/features/auth/view';

import { DemoAccounts } from './DemoAccounts';

export function DemoLoginPage() {
  return (
    <LoginView defaultCredentials={{ account: 'admin', password: 'virgo123' }}>
      <DemoAccounts />
    </LoginView>
  );
}
