import 'server-only';

import { isAdmin } from '@/lib/auth/permissions';

import { forbidden } from '../../auth/access';
import { requestUser } from '../../auth/session';
import { resetDemoState } from '../../data/store';
import { success } from '../../http/response';
import type { DemoHandler } from '../../route';
import { endDemoSession } from '../auth';

export const postDemoReset: DemoHandler = ({ request }) => {
  if (!isAdmin(requestUser(request))) return forbidden();

  resetDemoState();
  endDemoSession();

  return success({ authenticated: false });
};
