import type { WorkflowReceiptDto as WorkflowReceipt } from '@/api/workflows';

import { initialTaskState } from './tasks';

const receivedTask = initialTaskState.tasks.find(
  (task) => task.project === 'Support Desk' && task.status === 'todo',
)!;

export const sampleSuccess: WorkflowReceipt = {
  outcome: 'success',
  kind: 'task',
  reference: 'RCP-125',
  message: 'workRequest',
  projectId: 'support-desk',
  taskIds: [receivedTask.id],
  recordedAt: receivedTask.createdAt,
  requester: 'Ava Brooks',
  audience: 'team',
};
export const sampleError: WorkflowReceipt = {
  outcome: 'error',
  kind: 'handoff',
  reference: 'HOF-100',
  message: 'externalHandoff',
  projectId: 'online-store',
  taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
  recordedAt: '2026-10-03T10:00:00+08:00',
  requester: 'Mystic',
  audience: 'external',
  handoffTitle: 'October release handoff',
  schedule: '2026-10-06T10:00:00+08:00',
  notes: 'Review product, order and payment delivery before the online store release.',
};
