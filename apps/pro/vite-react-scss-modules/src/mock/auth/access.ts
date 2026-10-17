import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';

import { failure } from '../http/response';

export function forbidden() {
  return failure({
    status: 403,
    code: API_ERROR_CODES.PERMISSION_DENIED,
    detail: 'You do not have permission for this action',
  });
}
