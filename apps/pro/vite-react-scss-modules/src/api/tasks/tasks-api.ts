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
} from '../../contracts/tasks';
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
export async function createTask(request: TaskRequest): Promise<TaskDto> {
  const task = await http.post<TaskDto>('/tasks', request);
  return task;
}
export async function updateTask(id: string, request: Partial<TaskRequest>): Promise<TaskDto> {
  const task = await http.patch<TaskDto>(`/tasks/${encodeURIComponent(id)}`, request);
  return task;
}
export function updateTaskStatus(id: string, status: TaskStatusDto): Promise<TaskDto> {
  return updateTask(id, { status });
}
export function getTaskMetadata(signal?: AbortSignal): Promise<TaskMetadataDto> {
  return http.get('/tasks/metadata', signal ? { signal } : undefined);
}

export async function deleteTasks(request: TaskDeleteRequest): Promise<TaskDeleteResult> {
  const result = await http.post<TaskDeleteResult>('/tasks/batch-delete', request);
  return result;
}

export function getTaskHistory(id: string, signal?: AbortSignal): Promise<TaskHistoryEntry[]> {
  return http.get(`/tasks/${encodeURIComponent(id)}/history`, signal ? { signal } : undefined);
}
