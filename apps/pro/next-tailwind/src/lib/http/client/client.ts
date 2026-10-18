import axios, { type AxiosRequestConfig } from 'axios';

import { apiError, protocolError } from '../model/error';
import {
  API_SUCCESS_CODE,
  API_SUCCESS_MSG,
  isApiErrorData,
  isApiResponse,
} from '../model/protocol';
import { installHttpInterceptors } from './interceptors';
import { notifyHttpResponse } from './responses';

export function resolveApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || '/api/v1';

  return configured === '/' ? configured : configured.replace(/\/+$/, '');
}

export type HttpRequestConfig = Omit<
  AxiosRequestConfig,
  'baseURL' | 'url' | 'method' | 'data' | 'validateStatus'
>;

const client = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 5000,
  headers: { Accept: 'application/json' },
});

installHttpInterceptors(client);

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await client.request<unknown>(config);
  const body = response.data;

  if (!isApiResponse(body)) throw protocolError(response, 'Invalid API response');

  if (body.code !== API_SUCCESS_CODE) {
    if (!isApiErrorData(body.data)) throw protocolError(response, 'Invalid API error response');

    throw apiError(response, body.code, body.msg, body.data);
  }

  if (body.msg !== API_SUCCESS_MSG) throw protocolError(response, 'Invalid API success response');

  notifyHttpResponse(response);
  return body.data as T;
}

export const http = {
  get<T>(url: string, config?: HttpRequestConfig) {
    return request<T>({ ...config, url, method: 'GET' });
  },
  post<T>(url: string, data?: unknown, config?: HttpRequestConfig) {
    return request<T>({ ...config, url, method: 'POST', data });
  },
  put<T>(url: string, data?: unknown, config?: HttpRequestConfig) {
    return request<T>({ ...config, url, method: 'PUT', data });
  },
  patch<T>(url: string, data?: unknown, config?: HttpRequestConfig) {
    return request<T>({ ...config, url, method: 'PATCH', data });
  },
  delete<T>(url: string, config?: HttpRequestConfig) {
    return request<T>({ ...config, url, method: 'DELETE' });
  },
};
