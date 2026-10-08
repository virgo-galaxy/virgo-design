import type { AxiosInstance } from 'axios';

import { expireAuthSession, getAccessToken } from '@/lib/auth/session';

import { normalizeHttpError } from './error';
export function installHttpInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && !['/auth/login', '/auth/demo-accounts'].includes(config.url ?? ''))
      config.headers.set('Authorization', `Bearer ${token}`);
    return config;
  });
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const normalized = normalizeHttpError(error);
      if (normalized.status === 401 && getAccessToken()) expireAuthSession();
      return Promise.reject(normalized);
    },
  );
}
