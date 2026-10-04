import type { WorkflowReceiptDto as WorkflowReceipt } from '@/api/workflows';
export const sampleSuccess: WorkflowReceipt = {
  outcome: 'success',
  kind: 'task',
  reference: 'RCP-125',
  message: 'keyboardAudit',
  projectId: 'design-system',
  taskIds: ['41166b6d-6421'],
  recordedAt: '2026-10-01T09:36:00+08:00',
  requester: 'Eli Morgan',
  audience: 'team',
};
export const sampleError: WorkflowReceipt = {
  outcome: 'error',
  kind: 'handoff',
  reference: 'HOF-100',
  message: 'externalHandoff',
  projectId: 'workspace',
  taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
  recordedAt: '2026-10-03T10:00:00+08:00',
  requester: 'Mystic',
  audience: 'external',
  handoffTitle: 'October release handoff',
  schedule: '2026-10-06T10:00:00+08:00',
  notes:
    'Review workspace navigation and resolve export permission states before the October checkpoint.',
};
