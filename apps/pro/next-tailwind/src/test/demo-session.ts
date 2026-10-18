import { clearAuthSession, saveAuthSession } from '@/lib/auth/session';
import { createSession, revokeSession } from '@/server/demo/auth/session';
import { demoAccounts } from '@/server/demo/fixtures/accounts';

export function resetSession() {
  revokeSession();
  clearAuthSession();
  const session = createSession(demoAccounts[0]!);
  saveAuthSession(session);
  return session;
}
