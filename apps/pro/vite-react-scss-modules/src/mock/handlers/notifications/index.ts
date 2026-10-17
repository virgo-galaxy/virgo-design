import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/gateway/constants';

import { forbidden } from '../../auth/access';
import { requestUser } from '../../auth/session';
import { getDemoState, updateDemoState } from '../../data/store';
import { endpoint, failure, success } from '../../http/response';
import { currentInbox } from '../../model/task-records';

export const notificationHandlers = [
  http.get(endpoint('/notifications'), ({ request }) =>
    success(currentInbox(getDemoState(), requestUser(request)!)),
  ),
  http.post(endpoint('/notifications/read-all'), ({ request }) => {
    const user = requestUser(request)!;
    const now = new Date().toISOString();
    const state = updateDemoState((state) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.recipientId === user.id && !item.readAt ? { ...item, readAt: now } : item,
      ),
    }));

    return success(currentInbox(state, user));
  }),
  http.patch(endpoint('/notifications/:id/read'), ({ request, params }) => {
    const user = requestUser(request)!;
    const item = getDemoState().notifications.find((item) => item.id === params.id);

    if (!item)
      return failure({
        status: 404,
        code: API_ERROR_CODES.NOTIFICATION_NOT_FOUND,
        detail: 'Notification not found',
      });

    if (item.recipientId !== user.id) return forbidden();

    const read = { ...item, readAt: item.readAt ?? new Date().toISOString() };
    const state = updateDemoState((state) => ({
      ...state,
      notifications: state.notifications.map((item) => (item.id === read.id ? read : item)),
    }));

    return success(currentInbox(state, user).items.find((item) => item.id === read.id)!);
  }),
];
