import { HttpResponse } from 'msw';

import type { ApiErrorCode } from '@/contracts/gateway/error-codes';
import {
  API_SUCCESS_CODE,
  API_SUCCESS_MSG,
  type ApiErrorData,
  type ApiResponse,
  resolveApiBaseUrl,
} from '@/lib/http';
export function endpoint(path: string): string {
  return `${resolveApiBaseUrl() === '/' ? '' : resolveApiBaseUrl()}${path}`;
}
function headers() {
  return {
    'x-request-id': crypto.randomUUID(),
    traceparent: `00-${crypto.randomUUID().replaceAll('-', '')}-${crypto.randomUUID().replaceAll('-', '').slice(0, 16)}-01`,
  };
}
export function success<T>(data: T, status = 200): Response {
  return HttpResponse.json<ApiResponse<T>>(
    { code: API_SUCCESS_CODE, msg: API_SUCCESS_MSG, data },
    { status, headers: headers() },
  );
}
export function failure({
  status,
  code,
  detail,
  fields,
}: {
  status: number;
  code: ApiErrorCode;
  detail: string;
  fields?: Record<string, string[]>;
}): Response {
  return HttpResponse.json<ApiResponse<ApiErrorData>>(
    {
      code,
      msg: detail,
      data: { detail, timestamp: new Date().toISOString(), ...(fields ? { fields } : {}) },
    },
    { status, headers: headers() },
  );
}
