import { SearchIcon } from '@virgo-design/icons';
import { Button, Field, Input, Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import {
  hasTaskFilters,
  isTaskPriority,
  isTaskStatus,
  type TaskFilters as Filters,
  taskPriorities,
  taskStatuses,
} from '@/data/tasks';
import { taskAssignees, taskProjects } from '@/data/tasks.seed';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import styles from './TasksPage.module.scss';

export function TaskFilters({
  filters,
  onChange,
  onReset,
  count,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  count: number;
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.filterToolbar}>
      <div className={styles.searchRow}>
        <Input
          size="small"
          aria-label={t('tasks.searchTasks')}
          placeholder={t('tasks.searchTasksIdsDescriptionsOrPeople')}
          prefix={<SearchIcon />}
          value={filters.search}
          clearable
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          rootClassName={styles.search!}
        />
        <span className={styles.resultCount} aria-live="polite">
          {t('tasks.matchedCount', { count })}
        </span>
        <Button size="small" variant="text" onClick={onReset} disabled={!hasTaskFilters(filters)}>
          {t('tasks.resetFilters')}
        </Button>
      </div>
      <div className={styles.filterGrid}>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.status')}</Field.Label>
          <Select
            size="small"
            value={filters.status}
            onValueChange={(value) => {
              if (value === 'all' || isTaskStatus(value)) onChange({ ...filters, status: value });
            }}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">{t('tasks.allStatuses')}</Select.Option>
              {taskStatuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {getTaskStatusLabel(t, status)}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.priority')}</Field.Label>
          <Select
            size="small"
            value={filters.priority}
            onValueChange={(value) => {
              if (value === 'all' || isTaskPriority(value))
                onChange({ ...filters, priority: value });
            }}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">{t('tasks.allPriorities')}</Select.Option>
              {taskPriorities.map((priority) => (
                <Select.Option key={priority} value={priority}>
                  {getTaskPriorityLabel(t, priority)}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.project')}</Field.Label>
          <Select
            size="small"
            value={filters.project}
            onValueChange={(project) => onChange({ ...filters, project })}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">{t('tasks.allProjects')}</Select.Option>
              {taskProjects.map((project) => (
                <Select.Option key={project} value={project}>
                  {project}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.assignee')}</Field.Label>
          <Select
            size="small"
            value={filters.assignee}
            onValueChange={(assignee) => onChange({ ...filters, assignee })}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">{t('tasks.anyone')}</Select.Option>
              {taskAssignees.map((member) => (
                <Select.Option key={member.id} value={member.id}>
                  {member.name}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
      </div>
    </div>
  );
}
