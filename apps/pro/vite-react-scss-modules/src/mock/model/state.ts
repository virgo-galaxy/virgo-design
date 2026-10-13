import type { TaskRecordDto } from '@/api/analytics';
import type { NotificationDto } from '@/api/notifications';
import type { ProfileDto } from '@/api/profile';
import type { TaskDto } from '@/api/tasks';
import type { WorkflowReceiptDto } from '@/api/workflows';
export type StoredNotification = Omit<NotificationDto, 'available' | 'projectName'>;
export interface DemoState {
  tasks: TaskDto[];
  nextId: number;
  profile: ProfileDto;
  profiles?: Record<string, ProfileDto>;
  workflows: { success: WorkflowReceiptDto; error: WorkflowReceiptDto };
  sequence: number;
  records: TaskRecordDto[];
  notifications: StoredNotification[];
}
