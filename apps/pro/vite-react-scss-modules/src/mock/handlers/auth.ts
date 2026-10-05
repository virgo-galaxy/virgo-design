import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';
import { resolveApiBaseUrl } from '@/lib/http';

import { endpoint, failure, success } from '../response';

const storageKey = 'virgo-pro.mock-session.signed-out';
let authenticated = true;

function isAuthenticated() {
  try {
    return sessionStorage.getItem(storageKey) !== 'true';
  } catch {
    return authenticated;
  }
}

function setAuthenticated(value: boolean) {
  authenticated = value;
  try {
    if (value) sessionStorage.removeItem(storageKey);
    else sessionStorage.setItem(storageKey, 'true');
  } catch {
    // Keep mock sessions working in memory when browser storage is unavailable.
  }
}

export function resetSession() {
  setAuthenticated(true);
}

export const authHandlers = [
  http.get(endpoint('/auth/session'), () => success({ authenticated: isAuthenticated() })),
  http.post(endpoint('/auth/logout'), () => {
    setAuthenticated(false);
    return success({ authenticated: false });
  }),
  http.post(endpoint('/auth/demo-login'), () => {
    setAuthenticated(true);
    return success({ authenticated: true });
  }),
  http.all(`${resolveApiBaseUrl() === '/' ? '' : resolveApiBaseUrl()}/*`, () => {
    if (!isAuthenticated())
      return failure({
        status: 401,
        code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
        detail: 'Please sign in to continue',
      });
    // Let the resource handler respond to authenticated requests.
    return undefined;
  }),
];
