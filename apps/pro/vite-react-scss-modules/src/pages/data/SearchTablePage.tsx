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
import type { TFunction } from 'i18next';
import { type Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { usePaginationLabels } from '@/pages/shared/use-pagination-labels';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './SearchTablePage.module.scss';

function getColumnInfo(t: TFunction) {
  return [
    {
      key: 'title',
      label: t('data.task'),
      description: t('data.stableIdAndTaskTitleOpenARecordTo'),
    },
    {
      key: 'status',
      label: t('data.status'),
      description: t('data.currentDeliveryStageInTheSharedTaskWorkflow'),
    },
    {
      key: 'priority',
      label: t('data.priority'),
      description: t('data.urgentHighMediumOrLowPriorityIsIndependentOf'),
    },
    {
      key: 'project',
      label: t('data.project'),
      description: t('data.theFocusAreaOwningThisTaskOpenTheProject'),
    },
    {
      key: 'assignee',
      label: t('data.assignee'),
      description: t('data.theTeamMemberResponsibleForTheNextStep'),
    },
    {
      key: 'estimateHours',
      label: t('data.estimateH'),
      description: t('data.wholeHourEstimate0MeansUnestimatedThisIsNot'),
      sort: 'estimateHours',
    },
    {
      key: 'createdAt',
      label: t('data.createdAt'),
      description: t('data.recordCreationDateShownInUtcFiltersIncludeBoth'),
      sort: 'createdAt',
    },
    {
      key: 'dueDate',
      label: t('data.dueDate'),
      description: t('data.dueDateOverdueIsMeasuredAgainstValueUndatedTasks', {
        v0: taskReferenceDate,
      }),
      sort: 'dueDate',
    },
  ] as const;
}
type ColumnKey = ReturnType<typeof getColumnInfo>[number]['key'];

function QueryForm({ query, onApply }: { query: DataQuery; onApply: (query: DataQuery) => void }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(query);
  const [error, setError] = useState<ReturnType<typeof queryError>>('');
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
        aria-label={t('data.searchTaskRegister')}
        placeholder={t('data.taskTitleIdDescriptionOrPerson')}
        prefix={<SearchIcon />}
        value={draft.search}
        clearable
        onChange={(event) => update('search', event.target.value)}
      />
      <div className={styles.queryGrid}>
        <FilterSelect
          label={t('data.project')}
          value={draft.project}
          onChange={(value) => update('project', value)}
          options={[
            { value: 'all', label: t('data.allProjects') },
            ...taskProjects.map((value) => ({ value, label: value })),
          ]}
        />
        <FilterSelect
          label={t('data.status')}
          value={draft.status}
          onChange={(value) => {
            if (value === 'all' || isTaskStatus(value)) update('status', value);
          }}
          options={[
            { value: 'all', label: t('data.allStatuses') },
            ...taskStatuses.map((value) => ({ value, label: getTaskStatusLabel(t, value) })),
          ]}
        />
        <FilterSelect
          label={t('data.priority')}
          value={draft.priority}
          onChange={(value) => {
            if (value === 'all' || isTaskPriority(value)) update('priority', value);
          }}
          options={[
            { value: 'all', label: t('data.allPriorities') },
            ...taskPriorities.map((value) => ({ value, label: getTaskPriorityLabel(t, value) })),
          ]}
        />
        <FilterSelect
          label={t('data.assignee')}
          value={draft.assignee}
          onChange={(value) => update('assignee', value)}
          options={[
            { value: 'all', label: t('data.allPeople') },
            ...taskAssignees.map((member) => ({ value: member.id, label: member.name })),
          ]}
        />
        <Field>
          <Field.Label className={shared.filterLabel}>{t('data.createdFromUtc')}</Field.Label>
          <Input
            size="small"
            type="date"
            value={draft.createdFrom}
            onChange={(event) => update('createdFrom', event.target.value)}
          />
        </Field>
        <Field>
          <Field.Label className={shared.filterLabel}>{t('data.createdThroughUtc')}</Field.Label>
          <Input
            size="small"
            type="date"
            value={draft.createdTo}
            onChange={(event) => update('createdTo', event.target.value)}
          />
        </Field>
        <FilterSelect
          label={t('data.dueCondition')}
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
            { value: 'all', label: t('data.anyDueDate') },
            { value: 'overdue', label: t('data.overdueOpenTasks') },
            { value: 'week', label: t('data.next7DaysOpenTasks') },
            { value: 'unscheduled', label: t('data.unscheduled') },
          ]}
        />
        <Field>
          <Field.Label className={shared.filterLabel}>{t('data.minimumEstimate')}</Field.Label>
          <Input
            size="small"
            type="number"
            min={0}
            max={999}
            step={1}
            suffix={t('data.h')}
            value={draft.minimumHours}
            onChange={(event) => update('minimumHours', event.target.value)}
          />
        </Field>
      </div>
      {error ? (
        <Alert intent="error">
          <Alert.Title>{t('data.checkYourQuery')}</Alert.Title>
          <Alert.Description>{t(`data.validation.${error}`)}</Alert.Description>
        </Alert>
      ) : null}
      <div className={styles.queryActions}>
        <span className={shared.caption}>
          {t('data.allConditionsAreCombinedCreationDatesAreInclusive')}
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
          {t('data.resetQuery')}
        </Button>
        <Button size="small" type="submit" leadingIcon={<SearchIcon />}>
          {t('data.applyQuery')}
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
  const { t, i18n } = useTranslation();
  const paginationLabels = usePaginationLabels();
  const columnInfo = getColumnInfo(t);
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
  const [feedback, setFeedback] = useState<{
    kind: 'markedDone' | 'exportedSelected' | 'exportedMatching';
    count: number;
  } | null>(null);
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
    setFeedback(null);
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
              <h2 id="query-conditions-title">{t('data.queryConditions')}</h2>
              <p>{t('data.combineOwnershipDeliveryStageDatesAndEffort')}</p>
            </div>
          </div>
          <QueryForm key={queryKey} query={query} onApply={apply} />
        </section>
        <section aria-labelledby="query-results-title" className={styles.resultsSection}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="query-results-title">{t('data.queryResults')}</h2>
              <p>
                {t('data.valueMatchingRecordsValueInTheSharedRegister', {
                  v0: matching.length,
                  v1: state.tasks.length,
                })}
              </p>
            </div>
            <Popover>
              <Popover.Trigger size="small" variant="outline">
                {t('data.columnsValue', { v0: columns.length })}
              </Popover.Trigger>
              <Popover.Content
                placement="bottomEnd"
                className={styles.columnPanel}
                arrow={showOverlayArrows}
              >
                <strong>{t('data.visibleColumns')}</strong>
                <p>{t('data.taskIdentityStaysVisible')}</p>
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
            <div className={styles.chips} aria-label={t('data.appliedConditions')}>
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
                ? t('data.selectionSummary', { count: selected.length })
                : t('data.selectRecordsForABulkOperation')}
            </span>
            <div className={shared.actions}>
              {selected.length ? (
                <>
                  <Button size="small" variant="text" onClick={() => setSelection([])}>
                    {t('data.clearSelection')}
                  </Button>
                  <Button
                    size="small"
                    variant="outline"
                    disabled={selected.every((task) => task.status === 'Done')}
                    onClick={() => {
                      selected.forEach((task) =>
                        dispatch({ type: 'status', id: task.id, status: 'Done' }),
                      );
                      setFeedback({ kind: 'markedDone', count: selected.length });
                      setSelection([]);
                    }}
                  >
                    {t('data.markDone')}
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
                  setFeedback({
                    kind: selected.length ? 'exportedSelected' : 'exportedMatching',
                    count: rows.length,
                  });
                }}
              >
                {selected.length ? t('data.exportSelected') : t('data.exportResults')}
              </Button>
            </div>
          </div>
          <Table.Viewport aria-label={t('data.taskQueryResults')} className={styles.viewport}>
            <Table density="compact" border="separators" hoverable className={styles.table}>
              <Table.Caption className={shared.srOnly}>
                {t('data.filteredTaskRegisterSelectRowsForBulkCompletionOr')}
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head>
                    <Checkbox
                      aria-label={t('data.selectCurrentPage')}
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
                              aria-label={t('data.aboutValue', { v0: column.label })}
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
                        aria-label={t('data.selectValue', { v0: task.id })}
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
                            {getTaskStatusLabel(t, task.status)}
                          </Tag>
                        ) : column.key === 'priority' ? (
                          <Tag
                            size="sm"
                            variant="outline"
                            intent={taskPriorityIntent[task.priority]}
                          >
                            {getTaskPriorityLabel(t, task.priority)}
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
                            {formatDueDate(task.createdAt.slice(0, 10), i18n.language)}
                          </time>
                        ) : (
                          <span
                            className={styles.due}
                            data-overdue={isOverdue(task, taskReferenceDate)}
                          >
                            {task.dueDate ? (
                              <time dateTime={task.dueDate}>
                                {formatDueDate(task.dueDate, i18n.language)}
                              </time>
                            ) : (
                              t('data.unscheduled')
                            )}
                            {isOverdue(task, taskReferenceDate) ? (
                              <small>{t('data.overdue2')}</small>
                            ) : null}
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
              title={t('data.noRecordsMatchThisQuery')}
              onReset={() => apply({ ...emptyDataQuery })}
            />
          ) : null}
          <div className={shared.footer}>
            <span aria-live="polite">
              {t('data.showingValueValueOfValueRecords', {
                v0: view.range[0],
                v1: view.range[1],
                v2: matching.length,
              })}
            </span>
            <Pagination
              labels={paginationLabels}
              aria-label={t('data.queryResultPages')}
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
            {(feedback && t(`data.${feedback.kind}`, { count: feedback.count })) ||
              editor.feedback ||
              t('data.bulkChangesUpdateTheSharedTaskRegisterSelectionIs')}
          </div>
        </section>
      </Surface>
      {editor.editor}
    </div>
  );
}
