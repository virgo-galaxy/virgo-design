import { getTasks } from '@/api/tasks';
import type { TaskDto, TaskListDto, TaskListQuery } from '@/api/tasks/types';

export async function getTaskCollection(
  query: TaskListQuery = {},
  signal?: AbortSignal,
): Promise<TaskListDto> {
  const first = await getTasks({ ...query, snapshot: 'create', pageNum: 1, pageSize: 100 }, signal);

  if (!first.snapshotId)
    throw new Error('Collection requests require a consistent server snapshot');

  const snapshotId = first.snapshotId;
  const pageCount = Math.ceil(first.total / 100);
  const pages: TaskListDto[] = [];
  let nextPage = 2;

  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);

  if (signal?.aborted) abort();
  signal?.addEventListener('abort', abort, { once: true });

  try {
    await Promise.all(
      Array.from({ length: Math.min(3, Math.max(0, pageCount - 1)) }, async () => {
        while (nextPage <= pageCount) {
          controller.signal.throwIfAborted();

          const page = nextPage++;
          pages[page - 2] = await getTasks(
            { ...query, snapshot: snapshotId, pageNum: page, pageSize: 100 },
            controller.signal,
          );
        }
      }),
    );
  } catch (error) {
    controller.abort();
    throw error;
  } finally {
    signal?.removeEventListener('abort', abort);
  }

  const items = [...first.items, ...pages.flatMap((page) => page.items)];

  if (new Set(items.map((item) => item.id)).size !== first.total || items.length !== first.total)
    throw new Error('Incomplete task snapshot');

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
