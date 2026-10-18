import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';
import type { HandoffRequest, WorkflowReceiptDto } from '@/api/workflows/types';
import { canManageProject } from '@/lib/auth/permissions';
import { isRecord } from '@/lib/validation/is-record';

import { forbidden } from '../../auth/access';
import { requestUser } from '../../auth/session';
import { getDemoState, updateDemoState } from '../../data/store';
import { createProjects } from '../../fixtures/projects';
import { failure, success } from '../../http/response';
import type { DemoHandler } from '../../route';

export const getWorkflowsLatest: DemoHandler = ({ request }) => {
  const outcome = new URL(request.url).searchParams.get('outcome');

  if (outcome !== 'success' && outcome !== 'error')
    return failure({
      status: 400,
      code: API_ERROR_CODES.INVALID_QUERY,
      detail: 'Choose a workflow outcome',
    });

  const user = requestUser(request)!;
  const receipt = getDemoState().workflows[outcome];

  if (user.role !== 'admin' && !user.projects.includes(receipt.projectId)) return forbidden();

  return success(receipt);
};

export const postWorkflowsHandoffs: DemoHandler = async ({ request }) => {
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
    body.title.trim().length > 100 ||
    typeof body.projectId !== 'string' ||
    !createProjects().some((project) => project.id === body.projectId) ||
    typeof body.date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.date) ||
    typeof body.time !== 'string' ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time) ||
    typeof body.notes !== 'string' ||
    body.notes.length > 1500 ||
    body.confirmed !== true ||
    !['team', 'external'].includes(String(body.audience)) ||
    !Array.isArray(body.taskIds) ||
    !body.taskIds.length ||
    !body.taskIds.every((id) => typeof id === 'string') ||
    new Set(body.taskIds).size !== body.taskIds.length
  )
    return failure({
      status: 422,
      code: API_ERROR_CODES.HANDOFF_VALIDATION_FAILED,
      detail: 'Invalid handoff',
    });

  const draft = body as unknown as HandoffRequest;
  const tasks = getDemoState().tasks;
  const project = createProjects().find((p) => p.id === draft.projectId)!;
  const date = new Date(`${draft.date}T00:00:00Z`);

  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== draft.date ||
    draft.date < project.start
  )
    return failure({
      status: 422,
      code: API_ERROR_CODES.HANDOFF_VALIDATION_FAILED,
      detail: 'Invalid handoff date',
    });

  if (draft.taskIds.some((id) => !tasks.some((t) => t.id === id && t.project === project.id)))
    return failure({
      status: 422,
      code: API_ERROR_CODES.HANDOFF_SCOPE_INVALID,
      detail: 'Invalid handoff scope',
      fields: { taskIds: ['Select tasks in this project'] },
    });

  if (!canManageProject(requestUser(request), project.id)) return forbidden();

  const restricted = draft.projectId === 'online-store' && draft.audience === 'external';
  const receipt: WorkflowReceiptDto = {
    outcome: restricted ? 'error' : 'success',
    kind: 'handoff',
    reference: `HOF-${getDemoState().sequence}`,
    message: restricted ? 'externalHandoffDraft' : 'handoff',
    projectId: draft.projectId,
    taskIds: draft.taskIds,
    recordedAt: new Date().toISOString(),
    requester: requestUser(request)?.name ?? getDemoState().profile.name,
    audience: draft.audience,
    handoffTitle: draft.title.trim(),
    schedule: `${draft.date}T${draft.time}:00+08:00`,
    notes: draft.notes.trim(),
  };

  updateDemoState((previous) => ({
    ...previous,
    sequence: previous.sequence + 1,
    workflows: { ...previous.workflows, [receipt.outcome]: receipt },
  }));

  return success(receipt);
};
