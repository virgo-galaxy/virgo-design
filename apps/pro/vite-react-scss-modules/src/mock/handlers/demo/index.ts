import { http } from 'msw';

import { isAdmin } from '@/lib/auth/permissions';
import { clearDemoStorage } from '@/lib/demo/reset';

import { forbidden } from '../../auth/access';
import { requestUser } from '../../auth/session';
import { resetDemoState } from '../../data/store';
import { endpoint, success } from '../../http/response';
import { endDemoSession } from '../auth';

export const demoHandlers = [
  http.post(endpoint('/demo/reset'), ({ request }) => {
    if (!isAdmin(requestUser(request))) return forbidden();

    clearDemoStorage();
    resetDemoState();
    endDemoSession();

    return success({ authenticated: false });
  }),
];
