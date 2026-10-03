import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';
import type { HandoffRequest, WorkflowReceiptDto } from '@/api/workflows';
import { isRecord } from '@/lib/http/protocol';

import { projects } from '../fixtures/projects';
import { sampleError, sampleSuccess } from '../fixtures/workflows';
import { endpoint, failure, success } from '../response';
import { getBackendProfile } from './profile';
import { getBackendTasks } from './tasks';
let sequence = 101;
export const workflowsHandlers = [
  http.get(endpoint('/workflows/latest'), () =>
    success({ success: sampleSuccess, error: sampleError }),
  ),
  http.post(endpoint('/workflows/handoffs'), async ({ request }) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid JSON',
      });
    }
    if (
      !isRecord(body) ||
      typeof body.title !== 'string' ||
      !body.title.trim() ||
      typeof body.projectId !== 'string' ||
      !projects.some((project) => project.id === body.projectId) ||
      typeof body.date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(body.date) ||
      typeof body.time !== 'string' ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time) ||
      typeof body.notes !== 'string' ||
      body.notes.length > 1500 ||
      body.confirmed !== true ||
      !['team', 'external'].includes(String(body.audience)) ||
      !Array.isArray(body.taskIds) ||
      !body.taskIds.length
    )
      return failure({
        status: 422,
        code: API_ERROR_CODES.HANDOFF_VALIDATION_FAILED,
        detail: 'Invalid handoff',
      });
    const draft = body as unknown as HandoffRequest;
    const tasks = getBackendTasks();
    const project = projects.find((p) => p.id === draft.projectId)!;
    if (draft.taskIds.some((id) => !tasks.some((t) => t.id === id && t.project === project.name)))
      return failure({
        status: 422,
        code: API_ERROR_CODES.HANDOFF_SCOPE_INVALID,
        detail: 'Invalid handoff scope',
        fields: { taskIds: ['Select tasks in this project'] },
      });
    const restricted = draft.projectId === 'workspace' && draft.audience === 'external';
    const receipt: WorkflowReceiptDto = {
      outcome: restricted ? 'error' : 'success',
      kind: 'handoff',
      reference: `HOF-${sequence++}`,
      message: restricted ? 'externalHandoffDraft' : 'handoff',
      projectId: draft.projectId,
      taskIds: draft.taskIds,
      recordedAt: new Date().toISOString(),
      requester: getBackendProfile().name,
      audience: draft.audience,
      handoffTitle: draft.title.trim(),
      schedule: `${draft.date}T${draft.time}:00+08:00`,
      notes: draft.notes.trim(),
    };
    return success(receipt);
  }),
];
