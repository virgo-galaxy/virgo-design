import { http } from '@/lib/http';

import type { HandoffRequest, WorkflowReceiptDto } from '../../contracts/workflows';
export function getLatestWorkflow(
  outcome: 'success' | 'error',
  signal?: AbortSignal,
): Promise<WorkflowReceiptDto> {
  return http.get('/workflows/latest', { params: { outcome }, ...(signal ? { signal } : {}) });
}
export function prepareHandoff(request: HandoffRequest): Promise<WorkflowReceiptDto> {
  return http.post('/workflows/handoffs', request);
}
