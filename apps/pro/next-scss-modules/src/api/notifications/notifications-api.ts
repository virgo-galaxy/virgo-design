import { http } from '@/lib/http';

import type { NotificationDto, NotificationInboxDto } from './types';

export const getNotifications = (signal?: AbortSignal) =>
  http.get<NotificationInboxDto>('/notifications', signal ? { signal } : undefined);

export const readNotification = (id: string) =>
  http.patch<NotificationDto>(`/notifications/${encodeURIComponent(id)}/read`, {});

export const readAllNotifications = () =>
  http.post<NotificationInboxDto>('/notifications/read-all');
