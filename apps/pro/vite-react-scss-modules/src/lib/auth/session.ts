import type { LoginDto, SessionUser } from '@/contracts/auth';
import { sessionStorageAccess } from '@/lib/storage';
const storageKey = 'virgo-pro.auth-session.v1';
export const sessionExpiredEvent = 'virgo-pro:session-expired';
let memory: LoginDto | undefined;
function saved(): LoginDto | undefined {
  try {
    const saved = sessionStorageAccess.get(storageKey);
    if (!saved.ok) return memory;
    const value = JSON.parse(saved.value ?? 'null');
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
    sessionStorageAccess.set(storageKey, JSON.stringify(session));
  } catch {
    // Retain the in-memory session if serialization fails.
  }
}
export function clearAuthSession() {
  memory = undefined;
  sessionStorageAccess.remove(storageKey);
}
export function expireAuthSession() {
  clearAuthSession();
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(sessionExpiredEvent));
}
