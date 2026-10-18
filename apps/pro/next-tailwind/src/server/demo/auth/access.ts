import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';

import { failure } from '../http/response';

export function forbidden() {
  return failure({
    status: 403,
    code: API_ERROR_CODES.PERMISSION_DENIED,
    detail: 'You do not have permission for this action',
  });
}
