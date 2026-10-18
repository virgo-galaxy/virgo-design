import { EditIcon, FileTextIcon } from '@virgo-design/icons';
import { Avatar, Button, Checkbox, Table, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { CopyableText } from '@/components/display/copyable-text';
import { useCurrentUser } from '@/features/auth';
import { moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { canEditTask } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import {
  type TaskColumnKey,
  taskPinnedCells,
  type TaskTableSettings,
  visibleColumns,
} from '../../model/table-settings';
import { isOverdue, type Task } from '../../model/task';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../../presentation/task-presentation';
import { TaskAssigneeCard } from '../TaskAssigneeCard/TaskAssigneeCard';

export interface TaskTableBodyProps {
  presentation?: 'table' | 'column-preview';
  settings: TaskTableSettings;
  selection: readonly string[];
  selectionDisabled?: boolean;
  onSelectionChange: (values: string[]) => void;
  tasks: Task[];
  page: number;
  pageSize: number;
  onOpen: (task: Task, opener: HTMLButtonElement) => void;
  onEdit: (task: Task, opener: HTMLButtonElement) => void;
}

export function TaskTableBody({
  presentation = 'table',
  settings,
  selection,
  selectionDisabled = false,
  onSelectionChange,
  tasks,
  page,
  pageSize,
  onOpen,
  onEdit,
}: TaskTableBodyProps) {
  const { metadata, projects } = useTaskCatalog();
  const { members: taskAssignees, referenceDate: taskReferenceDate } = metadata;
  const { t, i18n } = useTranslation();
  const user = useCurrentUser();
  const columns = visibleColumns(settings);
  const pinnedCells = taskPinnedCells(settings);

  const createdAtFormatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });

  const compact = settings.size === 'small' || settings.size === 'mini';
  const tagSize = compact ? 'sm' : settings.size === 'large' ? 'lg' : 'md';

  const cellContent = (task: Task, key: TaskColumnKey, index: number): ReactNode => {
    const assignee = taskAssignees.find((member) => member.id === task.assignee);

    switch (key) {
      case 'selection':
        return (
          <Checkbox
            aria-label={t('tasks.selectTask', { id: task.id })}
            checked={selection.includes(task.id)}
            disabled={selectionDisabled}
            onChange={(event) =>
              onSelectionChange(
                event.target.checked
                  ? [...selection, task.id]
                  : selection.filter((id) => id !== task.id),
              )
            }
          />
        );
      case 'rowNumber':
        return <span className="tabular-nums">{(page - 1) * pageSize + index + 1}</span>;
      case 'title':
        return (
          <div className="grid gap-4">
            <CopyableText
              value={task.id}
              className="font-mono text-(length:--vd-font-size-10) text-text-tertiary"
            />
            <CopyableText
              value={businessLabel(task.title, i18n.language)}
              data-pro-task-title=""
              className="[max-width:340px] text-(length:--vd-font-size-12) wrap-anywhere"
            />
          </div>
        );
      case 'status':
        return (
          <Tag size={tagSize} intent={taskStatusIntent[task.status]}>
            {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
          </Tag>
        );
      case 'priority':
        return (
          <Tag size={tagSize} intent={taskPriorityIntent[task.priority]} variant="outline">
            {t(`tasks.priorityLabels.${task.priority}`)}
          </Tag>
        );
      case 'project':
        return (
          <span className="whitespace-nowrap text-text-secondary">
            {businessLabel(projectName(task.project, projects), i18n.language)}
          </span>
        );
      case 'module':
        return (
          <span className="whitespace-nowrap text-text-secondary">
            {businessLabel(moduleName(task.project, task.module, projects), i18n.language)}
          </span>
        );
      case 'assignee':
        return assignee && presentation === 'table' ? (
          <TaskAssigneeCard member={assignee} size={tagSize} />
        ) : (
          <div className="flex items-center gap-8 whitespace-nowrap text-text-secondary">
            <Avatar
              src={assignee?.avatarUrl ?? ''}
              size={tagSize}
              fallback={assignee?.initials ?? '?'}
              className="font-mono"
            />
            <span>{assignee?.name ?? t('tasks.unknownMember')}</span>
          </div>
        );
      case 'estimateHours':
        return <span className="tabular-nums">{task.estimateHours}</span>;
      case 'completedAt':
        return task.completedAt ? (
          <time
            className="whitespace-nowrap tabular-nums text-text-secondary [font-size:var(--vd-font-size-11)]"
            dateTime={task.completedAt}
          >
            {createdAtFormatter.format(new Date(task.completedAt))}
          </time>
        ) : (
          <span>—</span>
        );
      case 'createdAt':
        return (
          <time
            className="whitespace-nowrap tabular-nums text-text-secondary [font-size:var(--vd-font-size-11)]"
            dateTime={task.createdAt}
          >
            {createdAtFormatter.format(new Date(task.createdAt))}
          </time>
        );
      case 'dueDate':
        return (
          <div
            className="data-[overdue=true]:text-status-danger-text grid gap-4 whitespace-nowrap [font-size:var(--vd-font-size-11)] text-text-secondary"
            data-overdue={isOverdue(task, taskReferenceDate)}
          >
            {task.dueDate ? (
              <time dateTime={task.dueDate}>{formatDueDate(task.dueDate, i18n.language)}</time>
            ) : (
              <span>{t('tasks.noDueDate')}</span>
            )}
            {isOverdue(task, taskReferenceDate) ? (
              <span className="[font-size:var(--vd-font-size-10)]">{t('tasks.overdue')}</span>
            ) : null}
          </div>
        );
      case 'actions':
        return (
          <Button.Group
            layout="custom"
            className={[
              'inline-flex items-center whitespace-nowrap gap-4',
              "[&_>_button[data-variant='text']]:px-8 [.pro-task-table-table_[data-column-key='actions']_&]:flex-wrap",
              "[.pro-task-table-table_[data-column-key='actions']_&]:whitespace-normal",
            ].join(' ')}
          >
            {canEditTask(user, task) ? (
              <Button
                size={settings.size}
                variant="text"
                leadingIcon={<EditIcon />}
                onClick={(event) => onEdit(task, event.currentTarget)}
              >
                {t('tasks.edit')}
              </Button>
            ) : null}
            <Button
              size={settings.size}
              variant="text"
              leadingIcon={<FileTextIcon />}
              onClick={(event) => onOpen(task, event.currentTarget)}
            >
              {t('tasks.details')}
            </Button>
          </Button.Group>
        );
    }
  };

  return (
    <Table.Body>
      {tasks.map((task, index) => (
        <Table.Row
          key={task.id}
          data-task-id={task.id}
          selected={settings.selection && selection.includes(task.id)}
        >
          {columns.map((column) => (
            <Table.Cell
              key={column.key}
              data-column-key={column.key}
              align={column.align}
              {...pinnedCells.get(column.key)}
            >
              {cellContent(task, column.key, index)}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
}
