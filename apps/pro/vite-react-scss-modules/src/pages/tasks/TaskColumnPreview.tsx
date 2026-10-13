import { useState } from 'react';

import type { Task, TaskSort } from '@/features/tasks';

import type { TaskColumnSettings, TaskDataColumn, TaskTableSettings } from './table-settings';
import { TaskTable } from './TaskTable';

const noop = () => {};

export function TaskColumnPreview({
  column,
  settings,
  onWidthChange,
  tasks,
}: {
  column: TaskColumnSettings;
  settings: TaskTableSettings;
  onWidthChange: (width: number) => void;
  tasks: readonly Task[];
}) {
  const [sort, setSort] = useState<TaskSort | null>(null);
  const [filters, setFilters] = useState<Partial<Record<TaskDataColumn, string[]>>>({});
  const [search, setSearch] = useState<Partial<Record<TaskDataColumn, string>>>({});
  const [selection, setSelection] = useState<readonly string[]>([]);
  const currentSort =
    !column.controls.sort.enabled ||
    (column.controls.sort.mode !== 'both' && sort?.direction !== column.controls.sort.mode)
      ? null
      : sort;
  return (
    <TaskTable
      presentation="column-preview"
      settings={{
        ...settings,
        columns: [{ ...column, visible: true }],
        selection: column.key === 'selection' || settings.selection,
        showId: column.key === 'rowNumber' || settings.showId,
        pagination: false,
        pinnedColumns: { start: null, end: null },
        reorderColumns: false,
        stickyHeader: false,
      }}
      onSettingsChange={(next) => onWidthChange(next.columns[0]!.width)}
      columnFilters={filters}
      onColumnFilterChange={(key, values) =>
        setFilters((current) => ({ ...current, [key]: values }))
      }
      columnSearch={search}
      onColumnSearchChange={(key, value) => setSearch((current) => ({ ...current, [key]: value }))}
      selection={selection}
      onSelectionChange={setSelection}
      assigneeFilter={filters.assignee ?? []}
      onAssigneeFilterChange={(values) =>
        setFilters((current) => ({ ...current, assignee: [...values] }))
      }
      sort={currentSort}
      onSortChange={setSort}
      tasks={(column.key === 'completedAt'
        ? [tasks.find((task) => task.completedAt) ?? tasks[0]].filter(
            (task): task is NonNullable<typeof task> => Boolean(task),
          )
        : tasks
      ).slice(0, 1)}
      matchingTotal={1}
      page={1}
      pageSize={1}
      onPageChange={noop}
      filtered={false}
      onOpen={noop}
      onEdit={noop}
      onReset={noop}
      onCreate={noop}
    />
  );
}
