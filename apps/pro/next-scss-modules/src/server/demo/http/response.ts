import 'server-only';

import type { ApiErrorCode } from '@/api/gateway/types';
import {
  API_SUCCESS_CODE,
  API_SUCCESS_MSG,
  type ApiErrorData,
  type ApiResponse,
} from '@/lib/http/model/protocol';

export const endpoint = (path: string) => `/api/v1${path}`;

function headers() {
  return {
    'x-request-id': crypto.randomUUID(),
    traceparent: `00-${crypto.randomUUID().replaceAll('-', '')}-${crypto.randomUUID().replaceAll('-', '').slice(0, 16)}-01`,
  };
}

export function success<T>(data: T, status = 200): Response {
  return Response.json(
    { code: API_SUCCESS_CODE, msg: API_SUCCESS_MSG, data } satisfies ApiResponse<T>,
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
  return Response.json(
    {
      code,
      msg: detail,
      data: { detail, timestamp: new Date().toISOString(), ...(fields ? { fields } : {}) },
    } satisfies ApiResponse<ApiErrorData>,
    { status, headers: headers() },
  );
}
