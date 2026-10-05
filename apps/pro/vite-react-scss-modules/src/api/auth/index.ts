import { http } from '@/lib/http';

export interface SessionDto {
  authenticated: boolean;
}

export function getSession(signal?: AbortSignal): Promise<SessionDto> {
  return http.get('/auth/session', { withCredentials: true, ...(signal ? { signal } : {}) });
}

export function logout(): Promise<SessionDto> {
  return http.post('/auth/logout', undefined, { withCredentials: true });
}

// Available only on the mock gateway; real authentication belongs to the deployment's identity provider.
export function enterDemoSession(): Promise<SessionDto> {
  return http.post('/auth/demo-login');
}
