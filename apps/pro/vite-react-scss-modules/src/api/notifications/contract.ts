import type { TaskRecordKind } from '../analytics/contract';
export type NotificationKind = TaskRecordKind | 'ready' | 'welcome';
export interface NotificationDto {
  id: string;
  recipientId: string;
  actorId: string;
  kind: NotificationKind;
  taskId: string | null;
  taskTitle: string;
  project: string;
  createdAt: string;
  readAt: string | null;
  available: boolean;
}
export interface NotificationInboxDto {
  items: NotificationDto[];
  unreadCount: number;
}
