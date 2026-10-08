import { API_ERROR_CODES } from '@/api/error-codes';

import { failure } from './response';
export function forbidden() {
  return failure({
    status: 403,
    code: API_ERROR_CODES.PERMISSION_DENIED,
    detail: 'You do not have permission for this action',
  });
}
