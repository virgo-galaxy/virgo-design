import { http } from '@/lib/http';

import type { HandoffRequest, WorkflowHistoryDto, WorkflowReceiptDto } from './contract';
export function getWorkflowHistory(signal?: AbortSignal): Promise<WorkflowHistoryDto> {
  return http.get('/workflows/latest', signal ? { signal } : undefined);
}
export function prepareHandoff(request: HandoffRequest): Promise<WorkflowReceiptDto> {
  return http.post('/workflows/handoffs', request);
}
