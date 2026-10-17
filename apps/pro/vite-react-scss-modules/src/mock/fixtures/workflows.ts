import type { WorkflowReceiptDto as WorkflowReceipt } from '@/contracts/workflows';

import { initialTaskState } from './tasks';
import { users } from './team';

const requester = users.find((user) => user.id === 'ava')!.name;

const receivedTask = initialTaskState.tasks.find(
  (task) => task.project === 'support-desk' && task.status === 'done',
)!;

export const sampleSuccess: WorkflowReceipt = {
  outcome: 'success',
  kind: 'handoff',
  reference: 'HOF-099',
  message: 'handoff',
  projectId: 'support-desk',
  taskIds: [receivedTask.id],
  recordedAt: '2026-10-03T09:00:00+08:00',
  requester,
  audience: 'team',
  handoffTitle: 'Support release handoff',
  schedule: '2026-10-09T10:00:00+08:00',
  notes: 'Review delivered support workflows with the team.',
};

export const sampleError: WorkflowReceipt = {
  outcome: 'error',
  kind: 'handoff',
  reference: 'HOF-100',
  message: 'externalHandoff',
  projectId: 'online-store',
  taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
  recordedAt: '2026-10-03T10:00:00+08:00',
  requester,
  audience: 'external',
  handoffTitle: 'October release handoff',
  schedule: '2026-10-06T10:00:00+08:00',
  notes: 'Review product, order and payment delivery before the online store release.',
};
