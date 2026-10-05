import { getTasks, type TaskDto, type TaskListDto, type TaskListQuery } from '@/api/tasks';
export async function getTaskCollection(
  query: TaskListQuery = {},
  signal?: AbortSignal,
): Promise<TaskListDto> {
  const first = await getTasks({ ...query, pageNum: 1, pageSize: 100 }, signal);
  const pages = await Promise.all(
    Array.from({ length: Math.max(0, Math.ceil(first.total / 100) - 1) }, (_, index) =>
      getTasks({ ...query, pageNum: index + 2, pageSize: 100 }, signal),
    ),
  );
  const items = [...first.items, ...pages.flatMap((page) => page.items)];
  return { ...first, items, pageNum: 1, pageSize: Math.max(1, items.length) };
}
export async function getAllTasks(
  query: TaskListQuery = {},
  signal?: AbortSignal,
): Promise<TaskDto[]> {
  return (await getTaskCollection(query, signal)).items;
}
export function taskPageView(data: {
  items: TaskDto[];
  pageNum: number;
  pageSize: number;
  total: number;
}) {
  return {
    tasks: data.items,
    page: data.pageNum,
    range: [
      data.total ? (data.pageNum - 1) * data.pageSize + 1 : 0,
      data.total ? Math.min(data.pageNum * data.pageSize, data.total) : 0,
    ] as [number, number],
  };
}
