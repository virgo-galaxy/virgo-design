import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';
import { isRecord } from '@/lib/validation/is-record';

import { createSession, requestUser, revokeSession } from '../../auth/session';
import { demoAccounts, demoPassword } from '../../fixtures/accounts';
import { failure, success } from '../../http/response';
import type { DemoHandler } from '../../route';

export function endDemoSession() {
  revokeSession();
}

export const getAuthDemoAccounts: DemoHandler = () =>
  success({ accounts: demoAccounts, password: demoPassword });

export const postAuthLogin: DemoHandler = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return failure({
      status: 400,
      code: API_ERROR_CODES.INVALID_REQUEST,
      detail: 'Invalid JSON',
    });
  }

  const account =
    isRecord(body) && typeof body.account === 'string' ? body.account.trim().toLowerCase() : '';
  const user =
    isRecord(body) && typeof body.account === 'string'
      ? demoAccounts.find((user) => user.account === account)
      : undefined;

  if (!user || !isRecord(body) || body.password !== demoPassword)
    return failure({
      status: 401,
      code: API_ERROR_CODES.INVALID_CREDENTIALS,
      detail: 'Incorrect account or password',
    });

  return success(createSession(user));
};

export const getAuthSession: DemoHandler = ({ request }) => {
  const user = requestUser(request);

  return success(user ? { authenticated: true, user } : { authenticated: false });
};

export const postAuthLogout: DemoHandler = ({ request }) => {
  revokeSession(request);

  return success({ authenticated: false });
};
