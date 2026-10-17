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

export type HandoffValidationCode =
  | 'acceptanceRequired'
  | 'titleInvalid'
  | 'projectInvalid'
  | 'dateInvalid'
  | 'timeInvalid'
  | 'scopeRequired'
  | 'notesTooLong'
  | 'audienceInvalid'
  | 'confirmationRequired';
