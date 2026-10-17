import { http } from '@/lib/http';

import type {
  TaskDeleteRequest,
  TaskDeleteResult,
  TaskDto,
  TaskHistoryEntry,
  TaskListDto,
  TaskListQuery,
  TaskMetadataDto,
  TaskRequest,
  TaskStatusDto,
  TaskSummaryDto,
} from './types';

export function getTasks(query: TaskListQuery = {}, signal?: AbortSignal): Promise<TaskListDto> {
  return http.get('/tasks', {
    params: query,
    paramsSerializer: { indexes: null },
    ...(signal ? { signal } : {}),
  });
}

export function getTask(id: string, signal?: AbortSignal): Promise<TaskDto> {
  return http.get(`/tasks/${encodeURIComponent(id)}`, signal ? { signal } : undefined);
}

export function createTask(request: TaskRequest): Promise<TaskDto> {
  return http.post<TaskDto>('/tasks', request);
}

export function updateTask(id: string, request: Partial<TaskRequest>): Promise<TaskDto> {
  return http.patch<TaskDto>(`/tasks/${encodeURIComponent(id)}`, request);
}

export function updateTaskStatus(id: string, status: TaskStatusDto): Promise<TaskDto> {
  return updateTask(id, { status });
}

export function getTaskMetadata(signal?: AbortSignal): Promise<TaskMetadataDto> {
  return http.get('/tasks/metadata', signal ? { signal } : undefined);
}

export function deleteTasks(request: TaskDeleteRequest): Promise<TaskDeleteResult> {
  return http.post<TaskDeleteResult>('/tasks/batch-delete', request);
}

export function getTaskHistory(id: string, signal?: AbortSignal): Promise<TaskHistoryEntry[]> {
  return http.get(`/tasks/${encodeURIComponent(id)}/history`, signal ? { signal } : undefined);
}

export function getTaskSummary(signal?: AbortSignal): Promise<TaskSummaryDto> {
  return http.get('/tasks/summary', signal ? { signal } : undefined);
}
