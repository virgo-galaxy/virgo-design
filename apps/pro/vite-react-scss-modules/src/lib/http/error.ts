import axios, { type AxiosResponse } from 'axios';

import { API_SUCCESS_CODE, type ApiErrorData, isApiErrorData, isApiResponse } from './protocol';
export type HttpErrorKind = 'api' | 'protocol' | 'http' | 'timeout' | 'network' | 'cancelled';
interface HttpErrorOptions {
  kind: HttpErrorKind;
  msg: string;
  code?: number | null;
  status?: number | null;
  data?: ApiErrorData | null;
  requestId?: string | null;
  traceparent?: string | null;
  cause?: unknown;
}
export class HttpError extends Error {
  override readonly name = 'HttpError';
  readonly kind: HttpErrorKind;
  readonly code: number | null;
  readonly msg: string;
  readonly status: number | null;
  readonly data: ApiErrorData | null;
  readonly requestId: string | null;
  readonly traceparent: string | null;
  constructor(options: HttpErrorOptions) {
    super(options.msg, { cause: options.cause });
    this.kind = options.kind;
    this.code = options.code ?? null;
    this.msg = options.msg;
    this.status = options.status ?? null;
    this.data = options.data ?? null;
    this.requestId = options.requestId ?? null;
    this.traceparent = options.traceparent ?? null;
  }
}
export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
function metadata(response: AxiosResponse) {
  const header = (key: string) => {
    const value: unknown = response.headers[key];
    return typeof value === 'string' ? value : null;
  };
  return {
    status: response.status,
    requestId: header('x-request-id'),
    traceparent: header('traceparent'),
  };
}
export function protocolError(response: AxiosResponse, msg: string) {
  return new HttpError({ kind: 'protocol', msg, ...metadata(response) });
}
export function apiError(response: AxiosResponse, code: number, msg: string, data: ApiErrorData) {
  return new HttpError({ kind: 'api', code, msg, data, ...metadata(response) });
}
export function normalizeHttpError(error: unknown): HttpError {
  if (isHttpError(error)) return error;
  if (axios.isCancel(error))
    return new HttpError({ kind: 'cancelled', msg: 'Request cancelled', cause: error });
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const response = error.response;
      const body: unknown = response.data;
      if (isApiResponse(body)) {
        if (body.code === API_SUCCESS_CODE || !isApiErrorData(body.data))
          return protocolError(response, 'Invalid API error response');
        return apiError(response, body.code, body.msg, body.data);
      }
      return new HttpError({
        kind: 'http',
        msg: `HTTP ${response.status}`,
        ...metadata(response),
        cause: error,
      });
    }
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT')
      return new HttpError({ kind: 'timeout', msg: 'Request timeout', cause: error });
  }
  return new HttpError({ kind: 'network', msg: 'Network request failed', cause: error });
}
