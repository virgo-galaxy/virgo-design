import { http } from 'msw';

import { isAdmin } from '@/lib/auth/permissions';
import { clearDemoStorage } from '@/lib/demo/reset';

import { forbidden } from '../access';
import { endpoint, success } from '../response';
import { requestUser } from '../session';
import { resetDemoState } from '../store';
import { endDemoSession } from './auth';

export const demoHandlers = [
  http.post(endpoint('/demo/reset'), ({ request }) => {
    if (!isAdmin(requestUser(request))) return forbidden();
    clearDemoStorage();
    resetDemoState();
    endDemoSession();
    return success({ authenticated: false });
  }),
];
