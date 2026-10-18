import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';

import { forbidden } from '../../auth/access';
import { requestUser } from '../../auth/session';
import { users } from '../../fixtures/users';
import { failure, success } from '../../http/response';
import type { DemoHandler } from '../../route';

export const getUsersId: DemoHandler = async ({ params, request }) => {
  await new Promise((resolve) => setTimeout(resolve, 180));

  const user = users.find((entry) => entry.id === params.id);
  const current = requestUser(request)!;

  if (
    user &&
    current.role !== 'admin' &&
    !user.projects.some((project) => current.projects.includes(project))
  )
    return forbidden();

  return user
    ? success(user)
    : failure({ status: 404, code: API_ERROR_CODES.USER_NOT_FOUND, detail: 'User not found' });
};
