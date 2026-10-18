import type { WorkflowReceiptDto as WorkflowReceipt } from '@/api/workflows/types';

import { demoDate } from './dates';
import { initialTaskState } from './tasks';
import { users } from './team';

const requester = users.find((user) => user.id === 'ava')!.name;

const receivedTask = initialTaskState.tasks.find(
  (task) => task.project === 'support-desk' && task.status === 'done',
)!;

export function createWorkflowSamples(reference = demoDate()) {
  const success: WorkflowReceipt = {
    outcome: 'success',
    kind: 'handoff',
    reference: 'HOF-099',
    message: 'handoff',
    projectId: 'support-desk',
    taskIds: [receivedTask.id],
    recordedAt: `${demoDate(-2, reference)}T09:00:00+08:00`,
    requester,
    audience: 'team',
    handoffTitle: 'Support release handoff',
    schedule: `${demoDate(4, reference)}T10:00:00+08:00`,
    notes: 'Review delivered support workflows with the team.',
  };

  const error: WorkflowReceipt = {
    outcome: 'error',
    kind: 'handoff',
    reference: 'HOF-100',
    message: 'externalHandoff',
    projectId: 'online-store',
    taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
    recordedAt: `${demoDate(-2, reference)}T10:00:00+08:00`,
    requester,
    audience: 'external',
    handoffTitle: 'Release handoff',
    schedule: `${demoDate(1, reference)}T10:00:00+08:00`,
    notes: 'Review product, order and payment delivery before the online store release.',
  };

  return { success, error };
}

export const { success: sampleSuccess, error: sampleError } = createWorkflowSamples();
