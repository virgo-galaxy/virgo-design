import type { TaskRecordDto } from '@/contracts/analytics';
import type { NotificationDto } from '@/contracts/notifications';
import type { ProfileIdentityDto, ProfilePreferencesDto } from '@/contracts/profile';
import type { TaskDto } from '@/contracts/tasks';
import type { WorkflowReceiptDto } from '@/contracts/workflows';

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
