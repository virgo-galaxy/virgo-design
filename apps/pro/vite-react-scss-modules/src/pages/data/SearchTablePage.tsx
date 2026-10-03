import { DownloadIcon, SearchIcon } from '@virgo-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  Field,
  Form,
  Input,
  Pagination,
  Popover,
  Surface,
  Table,
  Tag,
  Tooltip,
} from '@virgo-design/ui';
import { type Dispatch, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router';

import type { ProSettings } from '@/components/global-settings/settings';
import {
  type DataQuery,
  emptyDataQuery,
  matchesDataQuery,
  queryError,
  queryFromParams,
  queryParams,
} from '@/data/data-query';
import { projectDetailPath, projects } from '@/data/projects';
import {
  isOverdue,
  isTaskPriority,
  isTaskStatus,
  paginateTasks,
  type TaskAction,
  taskPriorities,
  type TaskState,
  taskStatuses,
} from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { taskAssignees, taskProjects, taskReferenceDate } from '@/data/tasks.seed';
import { sortTasks, type TaskSort, type TaskSortColumn } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';
import { downloadCsv } from '@/pages/shared/download';
import { FilterSelect, NoResults, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './SearchTablePage.module.scss';

const columnInfo = [
  {
    key: 'title',
    label: 'Task',
    description: 'Stable ID and task title. Open a record to edit its details.',
  },
  {
    key: 'status',
    label: 'Status',
    description: 'Current delivery stage in the shared task workflow.',
  },
  {
    key: 'priority',
    label: 'Priority',
    description: 'Urgent, High, Medium or Low. Priority is independent of due date.',
  },
  {
    key: 'project',
    label: 'Project',
    description: 'The focus area owning this task. Open the project record for context.',
  },
  {
    key: 'assignee',
    label: 'Assignee',
    description: 'The team member responsible for the next step.',
  },
  {
    key: 'estimateHours',
    label: 'Estimate (h)',
    description: 'Whole-hour estimate; 0 means unestimated. This is not time logged.',
    sort: 'estimateHours',
  },
  {
    key: 'createdAt',
    label: 'Created at',
    description: 'Record creation date, shown in UTC. Filters include both date boundaries.',
    sort: 'createdAt',
  },
  {
    key: 'dueDate',
    label: 'Due date',
    description: `Due date. Overdue is measured against ${taskReferenceDate}. Undated tasks sort last.`,
    sort: 'dueDate',
  },
] as const;
type ColumnKey = (typeof columnInfo)[number]['key'];

function QueryForm({ query, onApply }: { query: DataQuery; onApply: (query: DataQuery) => void }) {
  const [draft, setDraft] = useState(query);
  const [error, setError] = useState('');
  const update = <Key extends keyof DataQuery>(key: Key, value: DataQuery[Key]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setError('');
  };
  return (
    <Form
      size="small"
      className={styles.queryForm}
      onSubmit={(event) => {
        event.preventDefault();
        const invalid = queryError(draft);
        setError(invalid);
        if (!invalid) onApply(draft);
      }}
    >
      <Input
        size="small"
        aria-label="Search task register"
        placeholder="Task title, ID, description or person…"
        prefix={<SearchIcon />}
        value={draft.search}
        clearable
        onChange={(event) => update('search', event.target.value)}
      />
      <div className={styles.queryGrid}>
        <FilterSelect
          label="Project"
          value={draft.project}
          onChange={(value) => update('project', value)}
          options={[
            { value: 'all', label: 'All projects' },
            ...taskProjects.map((value) => ({ value, label: value })),
          ]}
        />
        <FilterSelect
          label="Status"
          value={draft.status}
          onChange={(value) => {
            if (value === 'all' || isTaskStatus(value)) update('status', value);
          }}
          options={[
            { value: 'all', label: 'All statuses' },
            ...taskStatuses.map((value) => ({ value, label: value })),
          ]}
        />
        <FilterSelect
          label="Priority"
          value={draft.priority}
          onChange={(value) => {
            if (value === 'all' || isTaskPriority(value)) update('priority', value);
          }}
          options={[
            { value: 'all', label: 'All priorities' },
            ...taskPriorities.map((value) => ({ value, label: value })),
          ]}
        />
        <FilterSelect
          label="Assignee"
          value={draft.assignee}
          onChange={(value) => update('assignee', value)}
          options={[
            { value: 'all', label: 'All people' },
            ...taskAssignees.map((member) => ({ value: member.id, label: member.name })),
          ]}
        />
        <Field>
          <Field.Label className={shared.filterLabel}>Created from (UTC)</Field.Label>
          <Input
            size="small"
            type="date"
            value={draft.createdFrom}
            onChange={(event) => update('createdFrom', event.target.value)}
          />
        </Field>
        <Field>
          <Field.Label className={shared.filterLabel}>Created through (UTC)</Field.Label>
          <Input
            size="small"
            type="date"
            value={draft.createdTo}
            onChange={(event) => update('createdTo', event.target.value)}
          />
        </Field>
        <FilterSelect
          label="Due condition"
          value={draft.due}
          onChange={(value) => {
            if (
              value === 'all' ||
              value === 'overdue' ||
              value === 'week' ||
              value === 'unscheduled'
            )
              update('due', value);
          }}
          options={[
            { value: 'all', label: 'Any due date' },
            { value: 'overdue', label: 'Overdue · open tasks' },
            { value: 'week', label: 'Next 7 days · open tasks' },
            { value: 'unscheduled', label: 'Unscheduled' },
          ]}
        />
        <Field>
          <Field.Label className={shared.filterLabel}>Minimum estimate</Field.Label>
          <Input
            size="small"
            type="number"
            min={0}
            max={999}
            step={1}
            suffix="h"
            value={draft.minimumHours}
            onChange={(event) => update('minimumHours', event.target.value)}
          />
        </Field>
      </div>
      {error ? (
        <Alert intent="error">
          <Alert.Title>Check your query</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert>
      ) : null}
      <div className={styles.queryActions}>
        <span className={shared.caption}>
          All conditions are combined · creation dates are inclusive
        </span>
        <Button
          size="small"
          variant="text"
          type="button"
          onClick={() => {
            setDraft({ ...emptyDataQuery });
            setError('');
            onApply({ ...emptyDataQuery });
          }}
        >
          Reset query
        </Button>
        <Button size="small" type="submit" leadingIcon={<SearchIcon />}>
          Apply query
        </Button>
      </div>
    </Form>
  );
}

export function SearchTablePage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
  const { showOverlayArrows } = useOutletContext<Pick<ProSettings, 'showOverlayArrows'>>();
  const [params, setParams] = useSearchParams();
  const query = queryFromParams(params);
  const queryKey = params.toString();
  const [lastQuery, setLastQuery] = useState(queryKey);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<TaskSort | null>({
    column: 'createdAt',
    direction: 'descending',
  });
  const [selection, setSelection] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnKey[]>(columnInfo.map((column) => column.key));
  const [feedback, setFeedback] = useState('');
  if (lastQuery !== queryKey) {
    setLastQuery(queryKey);
    setPage(1);
    setSelection([]);
  }
  const matches = (task: TaskState['tasks'][number]) => matchesDataQuery(task, query);
  const matching = sortTasks(state.tasks.filter(matches), sort);
  const view = paginateTasks(matching, page, pageSize);
  if (page !== view.page) setPage(view.page);
  const editor = useTaskEditor(state, dispatch, matches);
  const selected = matching.filter((task) => selection.includes(task.id));
  const allSelected =
    view.tasks.length > 0 && view.tasks.every((task) => selection.includes(task.id));
  const someSelected = view.tasks.some((task) => selection.includes(task.id));
  const apply = (next: DataQuery) => {
    setParams(queryParams(next));
    setPage(1);
    setSelection([]);
    setFeedback('');
    requestAnimationFrame(() => document.getElementById('pro-main')?.focus());
  };
  const chips = (Object.keys(query) as Array<keyof DataQuery>).filter(
    (key) => query[key] !== emptyDataQuery[key],
  );
  const labels: Record<keyof DataQuery, string> = {
    search: 'Search',
    status: 'Status',
    priority: 'Priority',
    project: 'Project',
    assignee: 'Assignee',
    createdFrom: 'Created from',
    createdTo: 'Created through',
    due: 'Due',
    minimumHours: 'Min hours',
  };
  const visibleColumns = columnInfo.filter((column) => columns.includes(column.key));
  return (
    <div className={shared.page}>
      <Surface radius={8} className={styles.contentSurface}>
        <section aria-labelledby="query-conditions-title">
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="query-conditions-title">Query conditions</h2>
              <p>Combine ownership, delivery stage, dates and effort</p>
            </div>
          </div>
          <QueryForm key={queryKey} query={query} onApply={apply} />
        </section>
        <section aria-labelledby="query-results-title" className={styles.resultsSection}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="query-results-title">Query results</h2>
              <p>
                {matching.length} matching records · {state.tasks.length} in the shared register
              </p>
            </div>
            <Popover>
              <Popover.Trigger size="small" variant="outline">
                Columns · {columns.length}
              </Popover.Trigger>
              <Popover.Content
                placement="bottomEnd"
                className={styles.columnPanel}
                arrow={showOverlayArrows}
              >
                <strong>Visible columns</strong>
                <p>Task identity stays visible.</p>
                {columnInfo.map((column) => (
                  <Checkbox
                    key={column.key}
                    checked={columns.includes(column.key)}
                    disabled={column.key === 'title'}
                    onChange={(event) =>
                      setColumns((previous) =>
                        event.target.checked
                          ? [...previous, column.key]
                          : previous.filter((key) => key !== column.key),
                      )
                    }
                  >
                    {column.label}
                  </Checkbox>
                ))}
              </Popover.Content>
            </Popover>
          </div>
          {chips.length ? (
            <div className={styles.chips} aria-label="Applied conditions">
              {chips.map((key) => (
                <Tag key={key} size="sm" variant="outline">
                  {labels[key]}:{' '}
                  {key === 'assignee'
                    ? (taskAssignees.find((person) => person.id === query[key])?.name ?? query[key])
                    : query[key]}
                </Tag>
              ))}
            </div>
          ) : null}
          <div className={styles.resultActions}>
            <span aria-live="polite">
              {selected.length
                ? `${selected.length} selected across matching results`
                : 'Select records for a bulk operation'}
            </span>
            <div className={shared.actions}>
              {selected.length ? (
                <>
                  <Button size="small" variant="text" onClick={() => setSelection([])}>
                    Clear selection
                  </Button>
                  <Button
                    size="small"
                    variant="outline"
                    disabled={selected.every((task) => task.status === 'Done')}
                    onClick={() => {
                      selected.forEach((task) =>
                        dispatch({ type: 'status', id: task.id, status: 'Done' }),
                      );
                      setFeedback(
                        `${selected.length} tasks marked Done. Updated across the workspace.`,
                      );
                      setSelection([]);
                    }}
                  >
                    Mark Done
                  </Button>
                </>
              ) : null}
              <Button
                size="small"
                variant="outline"
                leadingIcon={<DownloadIcon />}
                disabled={matching.length === 0}
                onClick={() => {
                  const rows = selected.length ? selected : matching;
                  downloadCsv(
                    createTasksCsv(rows),
                    selected.length ? 'virgo-selected-tasks.csv' : 'virgo-query-results.csv',
                  );
                  setFeedback(
                    `Exported ${rows.length} ${selected.length ? 'selected' : 'matching'} records in the current sort order.`,
                  );
                }}
              >
                {selected.length ? 'Export selected' : 'Export results'}
              </Button>
            </div>
          </div>
          <Table.Viewport aria-label="Task query results" className={styles.viewport}>
            <Table density="compact" border="separators" hoverable className={styles.table}>
              <Table.Caption className={shared.srOnly}>
                Filtered task register. Select rows for bulk completion or export. Column
                descriptions are available in the header.
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head>
                    <Checkbox
                      aria-label="Select current page"
                      checked={allSelected}
                      indeterminate={someSelected && !allSelected}
                      disabled={!view.tasks.length}
                      onChange={(event) => {
                        const ids = view.tasks.map((task) => task.id);
                        setSelection((previous) =>
                          event.target.checked
                            ? [...new Set([...previous, ...ids])]
                            : previous.filter((id) => !ids.includes(id)),
                        );
                      }}
                    />
                  </Table.Head>
                  {visibleColumns.map((column) => {
                    const sortColumn: TaskSortColumn | undefined =
                      'sort' in column ? column.sort : undefined;
                    return (
                      <Table.Head
                        key={column.key}
                        align={column.key === 'estimateHours' ? 'end' : 'start'}
                        sortDirection={
                          sortColumn
                            ? sort?.column === sortColumn
                              ? sort.direction
                              : 'none'
                            : undefined
                        }
                      >
                        <span className={styles.columnHeading}>
                          {sortColumn ? (
                            <Table.SortButton
                              direction={sort?.column === sortColumn ? sort.direction : 'none'}
                              onDirectionChange={(direction) => {
                                setSort(
                                  direction === 'none' ? null : { column: sortColumn, direction },
                                );
                                setPage(1);
                              }}
                            >
                              {column.label}
                            </Table.SortButton>
                          ) : (
                            column.label
                          )}
                          <Tooltip>
                            <Tooltip.Trigger
                              size="small"
                              variant="text"
                              aria-label={`About ${column.label}`}
                              className={styles.infoButton}
                            >
                              ?
                            </Tooltip.Trigger>
                            <Tooltip.Content>{column.description}</Tooltip.Content>
                          </Tooltip>
                        </span>
                      </Table.Head>
                    );
                  })}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {view.tasks.map((task) => (
                  <Table.Row key={task.id} selected={selection.includes(task.id)}>
                    <Table.Cell>
                      <Checkbox
                        aria-label={`Select ${task.id}`}
                        checked={selection.includes(task.id)}
                        onChange={(event) =>
                          setSelection((previous) =>
                            event.target.checked
                              ? [...previous, task.id]
                              : previous.filter((id) => id !== task.id),
                          )
                        }
                      />
                    </Table.Cell>
                    {visibleColumns.map((column) => (
                      <Table.Cell
                        key={column.key}
                        align={column.key === 'estimateHours' ? 'end' : 'start'}
                      >
                        {column.key === 'title' ? (
                          <div className={styles.identity}>
                            <span className={shared.mono}>{task.id}</span>
                            <Button
                              size="small"
                              variant="text"
                              className={styles.taskLink}
                              onClick={(event) => editor.open(task, event.currentTarget)}
                            >
                              {task.title}
                            </Button>
                          </div>
                        ) : column.key === 'status' ? (
                          <Tag size="sm" intent={taskStatusIntent[task.status]}>
                            {task.status}
                          </Tag>
                        ) : column.key === 'priority' ? (
                          <Tag
                            size="sm"
                            variant="outline"
                            intent={taskPriorityIntent[task.priority]}
                          >
                            {task.priority}
                          </Tag>
                        ) : column.key === 'project' ? (
                          <Link
                            className={shared.link}
                            to={projectDetailPath(
                              projects.find((project) => project.name === task.project)!,
                            )}
                          >
                            {task.project}
                          </Link>
                        ) : column.key === 'assignee' ? (
                          <Person id={task.assignee} />
                        ) : column.key === 'estimateHours' ? (
                          <span className={styles.numeric}>{task.estimateHours}</span>
                        ) : column.key === 'createdAt' ? (
                          <time dateTime={task.createdAt}>
                            {formatDueDate(task.createdAt.slice(0, 10))}, 2026
                          </time>
                        ) : (
                          <span
                            className={styles.due}
                            data-overdue={isOverdue(task, taskReferenceDate)}
                          >
                            {task.dueDate ? (
                              <time dateTime={task.dueDate}>{formatDueDate(task.dueDate)}</time>
                            ) : (
                              'Unscheduled'
                            )}
                            {isOverdue(task, taskReferenceDate) ? <small>Overdue</small> : null}
                          </span>
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Table.Viewport>
          {!matching.length ? (
            <NoResults
              title="No records match this query"
              onReset={() => apply({ ...emptyDataQuery })}
            />
          ) : null}
          <div className={shared.footer}>
            <span aria-live="polite">
              Showing {view.range[0]}–{view.range[1]} of {matching.length} records
            </span>
            <Pagination
              aria-label="Query result pages"
              total={matching.length}
              page={view.page}
              pageSize={pageSize}
              onChange={(next, size) => {
                setPage(next);
                setPageSize(size);
              }}
              showSizeChanger
              pageSizeOptions={[5, 10, 20]}
              align="right"
              className={styles.pagination}
            />
          </div>
          <div className={styles.feedback} role="status">
            {feedback ||
              editor.feedback ||
              'Bulk changes update the shared task register. Selection is cleared when conditions change.'}
          </div>
        </section>
      </Surface>
      {editor.editor}
    </div>
  );
}
