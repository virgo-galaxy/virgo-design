import { type AxiosInstance, isAxiosError } from 'axios';

import { expireAuthSession, getAccessToken } from '@/lib/auth/session';

import { normalizeHttpError } from '../model/error';

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
      const token = getAccessToken();

      if (
        normalized.status === 401 &&
        token &&
        isAxiosError(error) &&
        error.config?.headers.get('Authorization') === `Bearer ${token}`
      )
        expireAuthSession();

      return Promise.reject(normalized);
    },
  );
}
