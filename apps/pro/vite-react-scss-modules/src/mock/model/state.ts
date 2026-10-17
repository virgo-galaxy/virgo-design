import type { TaskRecordDto } from '@/api/analytics/types';
import type { NotificationDto } from '@/api/notifications/types';
import type { ProfileIdentityDto, ProfilePreferencesDto } from '@/api/profile/types';
import type { TaskDto } from '@/api/tasks/types';
import type { WorkflowReceiptDto } from '@/api/workflows/types';

export type ProfileRecord = ProfileIdentityDto & ProfilePreferencesDto;
export type StoredNotification = Omit<NotificationDto, 'available' | 'projectName'>;

export interface DemoState {
  tasks: TaskDto[];
  nextId: number;
  profile: ProfileRecord;
  profiles: Record<string, ProfileRecord>;
  workflows: { success: WorkflowReceiptDto; error: WorkflowReceiptDto };
  sequence: number;
  records: TaskRecordDto[];
  notifications: StoredNotification[];
}
