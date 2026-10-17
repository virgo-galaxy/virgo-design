import { http } from 'msw';

import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import { resolveApiBaseUrl } from '@/lib/http';
import { isRecord } from '@/lib/validation/is-record';

import { createSession, requestUser, revokeSession } from '../../auth/session';
import { demoAccounts, demoPassword } from '../../fixtures/accounts';
import { endpoint, failure, success } from '../../http/response';

export { resetSession } from '../../auth/session';

export function endDemoSession() {
  revokeSession();
}

export const authHandlers = [
  http.get(endpoint('/auth/demo-accounts'), () =>
    success({ accounts: demoAccounts, password: demoPassword }),
  ),
  http.post(endpoint('/auth/login'), async ({ request }) => {
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
  }),
  http.get(endpoint('/auth/session'), ({ request }) => {
    const user = requestUser(request);

    return success(user ? { authenticated: true, user } : { authenticated: false });
  }),
  http.post(endpoint('/auth/logout'), ({ request }) => {
    revokeSession(request);

    return success({ authenticated: false });
  }),
  http.all(`${resolveApiBaseUrl() === '/' ? '' : resolveApiBaseUrl()}/*`, ({ request }) => {
    if (new URL(request.url).pathname.includes('/avatars/')) return undefined;
    if (!requestUser(request))
      return failure({
        status: 401,
        code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
        detail: 'Please sign in to continue',
      });

    return undefined;
  }),
];
