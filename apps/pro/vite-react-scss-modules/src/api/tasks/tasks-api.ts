import { http } from '@/lib/http';

import type {
  TaskDto,
  TaskListDto,
  TaskListQuery,
  TaskMetadataDto,
  TaskRequest,
  TaskStatusDto,
} from './contract';
export function getTasks(query: TaskListQuery = {}, signal?: AbortSignal): Promise<TaskListDto> {
  return http.get('/tasks', { params: query, ...(signal ? { signal } : {}) });
}
export function getTask(id: string, signal?: AbortSignal): Promise<TaskDto> {
  return http.get(`/tasks/${encodeURIComponent(id)}`, signal ? { signal } : undefined);
}
export function createTask(request: TaskRequest): Promise<TaskDto> {
  return http.post('/tasks', request);
}
export function updateTask(id: string, request: Partial<TaskRequest>): Promise<TaskDto> {
  return http.patch(`/tasks/${encodeURIComponent(id)}`, request);
}
export function updateTaskStatus(id: string, status: TaskStatusDto): Promise<TaskDto> {
  return updateTask(id, { status });
}
export function getTaskMetadata(signal?: AbortSignal): Promise<TaskMetadataDto> {
  return http.get('/tasks/metadata', signal ? { signal } : undefined);
}
