export interface WorkflowReceiptDto {
  outcome: 'success' | 'error';
  kind: 'task' | 'handoff';
  reference: string;
  message: 'keyboardAudit' | 'externalHandoff' | 'externalHandoffDraft' | 'handoff' | 'workRequest';
  projectId: string;
  taskIds: string[];
  recordedAt: string;
  requester: string;
  audience: 'team' | 'external';
  handoffTitle?: string;
  schedule?: string;
  notes?: string;
}
export interface WorkflowHistoryDto {
  success: WorkflowReceiptDto;
  error: WorkflowReceiptDto;
}
export interface HandoffRequest {
  title: string;
  projectId: string;
  date: string;
  time: string;
  taskIds: string[];
  audience: 'team' | 'external';
  notes: string;
  confirmed: boolean;
}
