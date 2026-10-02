import { SearchIcon } from '@virgo-design/icons';
import { Button, Field, Input, Select } from '@virgo-design/ui';

import {
  hasTaskFilters,
  isTaskPriority,
  isTaskStatus,
  type TaskFilters as Filters,
  taskPriorities,
  taskStatuses,
} from '@/data/tasks';
import { taskAssignees, taskProjects } from '@/data/tasks.seed';

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
  return (
    <div className={styles.filterToolbar}>
      <div className={styles.searchRow}>
        <Input
          size="small"
          aria-label="Search tasks"
          placeholder="Search tasks, IDs, descriptions or people…"
          prefix={<SearchIcon />}
          value={filters.search}
          clearable
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          rootClassName={styles.search!}
        />
        <span className={styles.resultCount} aria-live="polite">
          {count} {count === 1 ? 'task' : 'tasks'} match
        </span>
        <Button size="small" variant="text" onClick={onReset} disabled={!hasTaskFilters(filters)}>
          Reset filters
        </Button>
      </div>
      <div className={styles.filterGrid}>
        <Field>
          <Field.Label className={styles.filterLabel}>Status</Field.Label>
          <Select
            size="small"
            value={filters.status}
            onValueChange={(value) => {
              if (value === 'all' || isTaskStatus(value)) onChange({ ...filters, status: value });
            }}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">All statuses</Select.Option>
              {taskStatuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>Priority</Field.Label>
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
              <Select.Option value="all">All priorities</Select.Option>
              {taskPriorities.map((priority) => (
                <Select.Option key={priority} value={priority}>
                  {priority}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>Project</Field.Label>
          <Select
            size="small"
            value={filters.project}
            onValueChange={(project) => onChange({ ...filters, project })}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">All projects</Select.Option>
              {taskProjects.map((project) => (
                <Select.Option key={project} value={project}>
                  {project}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>Assignee</Field.Label>
          <Select
            size="small"
            value={filters.assignee}
            onValueChange={(assignee) => onChange({ ...filters, assignee })}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Option value="all">Anyone</Select.Option>
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
