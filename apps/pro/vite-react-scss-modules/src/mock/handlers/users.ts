import { delay, http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';

import { users } from '../fixtures/users';
import { endpoint, failure, success } from '../response';

export const usersHandlers = [
  http.get(endpoint('/users/:id'), async ({ params }) => {
    await delay(180);
    const user = users.find((entry) => entry.id === params.id);
    return user
      ? success(user)
      : failure({ status: 404, code: API_ERROR_CODES.USER_NOT_FOUND, detail: 'User not found' });
  }),
];
