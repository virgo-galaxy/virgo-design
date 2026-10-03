import type { AxiosInstance } from 'axios';

import { normalizeHttpError } from './error';
export function installHttpInterceptors(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeHttpError(error)),
  );
}
