import { getTasks, type TaskDto, type TaskListQuery } from '@/api/tasks';
export async function getAllTasks(
  query: TaskListQuery = {},
  signal?: AbortSignal,
): Promise<TaskDto[]> {
  const first = await getTasks({ ...query, page: 1, pageSize: 100 }, signal);
  const pages = await Promise.all(
    Array.from({ length: Math.max(0, Math.ceil(first.total / 100) - 1) }, (_, index) =>
      getTasks({ ...query, page: index + 2, pageSize: 100 }, signal),
    ),
  );
  return [...first.items, ...pages.flatMap((page) => page.items)];
}
export function taskPageView(data: {
  items: TaskDto[];
  page: number;
  pageSize: number;
  total: number;
}) {
  return {
    tasks: data.items,
    page: data.page,
    range: [
      data.total ? (data.page - 1) * data.pageSize + 1 : 0,
      data.total ? Math.min(data.page * data.pageSize, data.total) : 0,
    ] as [number, number],
  };
}
