import { delay, http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';

import { forbidden } from '../access';
import { users } from '../fixtures/users';
import { endpoint, failure, success } from '../response';
import { requestUser } from '../session';

export const usersHandlers = [
  http.get(endpoint('/users/:id'), async ({ params, request }) => {
    await delay(180);
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
  }),
];
