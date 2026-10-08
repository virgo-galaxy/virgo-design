import type { LoginDto, SessionUser } from '@/api/auth/contract';
const storageKey = 'virgo-pro.auth-session.v1';
export const sessionExpiredEvent = 'virgo-pro:session-expired';
let memory: LoginDto | undefined;
function saved(): LoginDto | undefined {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
    if (
      value?.authenticated === true &&
      typeof value.accessToken === 'string' &&
      typeof value.expiresAt === 'string' &&
      typeof value.user?.id === 'string'
    )
      return value;
    return undefined;
  } catch {
    return memory;
  }
}
export function getAccessToken(): string | undefined {
  return saved()?.accessToken;
}
export function getSessionExpiresAt(): string | undefined {
  return saved()?.expiresAt;
}
export function getStoredUser(): SessionUser | undefined {
  return saved()?.user;
}
export function saveAuthSession(session: LoginDto) {
  memory = session;
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(session));
  } catch {
    /* memory fallback */
  }
}
export function clearAuthSession() {
  memory = undefined;
  try {
    sessionStorage.removeItem(storageKey);
  } catch {
    /* memory fallback */
  }
}
export function expireAuthSession() {
  clearAuthSession();
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(sessionExpiredEvent));
}
